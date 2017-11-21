// const config = require('../config/config')
const {User, UserOauth} = require('../models')
// const jwt = require('jsonwebtoken')
const GithubOauth = require('./GithubOauth')
var options = {
  clientId: 'a3a201506e547487cd72',
  clientSecret: '8f6319222dc35ffd8c4f1ea3e20203e842930bf5',
  grantScope: 'user:email',
  authorizePath: 'https://github.com/login/oauth/authorize',
  resourcePath: 'https://github.com/login/oauth/access_token'
}
var githubOauth = new GithubOauth(options)

// function jwtSignUser (user) {
//   return jwt.sign(user, config.jwt.secret, {
//     expiresIn: config.jwt.expiresIn
//   })
// }
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
      var identityType = 'github'
      var identifier = data.email
      var credential = data.accessToken
      var nickname = data.login
      var avatar = data.avatar_url
      var responseData
      var oauthedUser = await UserOauth.findOne({
        where: {
          identityType: identityType,
          identifier: identifier
        }
      })
      // if user  hava oauth records, update access token
      if (oauthedUser) {
        await UserOauth.update(
          {
            credential: data.accessToken
          },
          {
            where: {
              id: oauthedUser.id
            }
          }
        )
        await User.update(
          {
            nickname: nickname,
            avatar: avatar
          },
          {
            where: {
              id: oauthedUser.UserId
            }
          }
        )
        var user = await User.findById(oauthedUser.UserId)
        oauthedUser = await UserOauth.findById(oauthedUser.id)
        responseData = {
          user: user,
          token: oauthedUser.credential
        }
      } else {
        // if user don't have oauth, and then create user in table User and UserOauth.
        var newUser = await User.create({
          nickname: nickname,
          avatar: avatar
        })
        // console.log('user dont have oauth record, new user id: ', newUser.id)
        var newUserOauth = await UserOauth.create({
          UserId: newUser.id,
          identityType: identityType,
          identifier: identifier,
          credential: credential
        })
        responseData = {
          user: newUser,
          token: newUserOauth.redential
        }
      }
      res.status(200).send(responseData)
    } catch (e) {
      res.status(500).send(e)
    }
  },
  async signinGithub (req, res) {}
}
