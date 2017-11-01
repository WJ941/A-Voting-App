const config = require('../config/config')
const https = require('https')
const {UserGithub} = require('../models')
const jwt = require('jsonwebtoken')
let OAuthConfig = config.OAuthConfig

function getRequestToken (code) {
  OAuthConfig.CODE = code
  let path = OAuthConfig.GITHUB_ACCESS_TOKEN_PAHT
  path += '?client_id=' + OAuthConfig.GITHUB_CLIENT_ID
  path += '&client_secret=' + OAuthConfig.GITHUB_CLIENT_SECRET
  path += '&code=' + OAuthConfig.CODE
  return new Promise((resolve, reject) => {
    https.get(path, (res) => {
      res.setEncoding('utf8')
      res.on('data', (d) => {
        let args = d.split('&')
        let tokenInfo = args[0].split('=')
        let token = tokenInfo[1]
        resolve(token)
      })
    })
  })
}
// 取得access token后就可以取得用户信息
function getdata (token) {
  let options = {
    host: 'api.github.com',
    path: 'https://api.github.com/user?access_token=' + token + '&scope=user',
    method: 'GET',
    headers: {'user-agent': 'Avotingapp'}
  }
  return new Promise((resolve, reject) => {
    https.get(options, function (res) {
      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', function (userInfo) {
        rawData += userInfo
      })
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData)
          resolve(parsedData)
        } catch (e) {
          throw e
        }
      })
    }).on('error', (e) => {
      throw e
    })
  })
}
function jwtSignUser (user) {
  return jwt.sign(user, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  })
}
module.exports = {
  async loginGithub (req, res) {
    let path = OAuthConfig.GITHUB_AUTHORIZE_PATH
    path += '?client_id=' + OAuthConfig.GITHUB_CLIENT_ID
    path += '&scope=' + OAuthConfig.GITHUB_CLIENT_SCOPE
    res.end(path)
  },
  async getUserInfo (req, res) {
    getRequestToken(req.query.code)
      .then((token) => {
        return getdata(token)
      })
      .then((parsedData) => {
        res.status(200).json(parsedData)
      })
      .catch(e => res.status(400).send(e))
  },
  async signinGithub (req, res) {
    try {
      const {email, username} = req.body
      let githubUser = await UserGithub.findOrCreate({
        where: {
          email: email
        },
        defaults: {
          username: username
        }
      })
      let userJSON = githubUser[0].toJSON()
      res.status(200).send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      })
    } catch (e) {
      res.status(400).send(e)
    }
  }
}
