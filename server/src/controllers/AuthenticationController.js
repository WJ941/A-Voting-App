const config = require('../config/config')
const {UserGithub} = require('../models')
const jwt = require('jsonwebtoken')
const GithubOauth = require('./GithubOauth')
var options = {
  clientId: 'a3a201506e547487cd72',
  clientSecret: '8f6319222dc35ffd8c4f1ea3e20203e842930bf5',
  grantScope: 'user:email',
  authorizePath: 'https://github.com/login/oauth/authorize',
  resourcePath: 'https://github.com/login/oauth/access_token'
}
var githubOauth = new GithubOauth(options)

function jwtSignUser (user) {
  return jwt.sign(user, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  })
}
module.exports = {
  async loginGithub (req, res) {
    var redirectUrl = githubOauth.getAuthorizeAdress()
    // res.redirect(redirectUrl)
    res.end(redirectUrl)
  },
  async getUserInfo (req, res) {
    var requestToken = req.query.code
    try {
      var data = await githubOauth.getUserInfo(requestToken)
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send(e)
    }
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
