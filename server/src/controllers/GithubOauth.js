const https = require('https')
var gitHubOauth = function (options) {
  // if user signin succeed, Authoriztion server return a callback url with the request code
  this.getAuthorizeAdress = function () {
    let path = options.authorizePath
    path += '?client_id=' + options.clientId
    path += '&scope=' + options.grantScope
    return path
  }
  this.getUserInfo = function (requestToken) {
    return new Promise((resolve, reject) => {
      getAccessToken(requestToken)
        .then((accessToken) => {
          return getdata(accessToken)
        })
        .then((parsedData) => {
          resolve(parsedData)
        })
        .catch(e => reject(e))
    })
  }
  // if user get request code, then can get the resource access token
  var getAccessToken = function (requestCode) {
    let path = options.resourcePath
    path += '?client_id=' + options.clientId
    path += '&client_secret=' + options.clientSecret
    path += '&code=' + requestCode
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
  // if user get access token , then can get user infomation from resource owner
  var getdata = function (accessToken) {
    let options = {
      host: 'api.github.com',
      path: 'https://api.github.com/user?access_token=' + accessToken + '&scope=user',
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
}
// var options = {
//   clientId: null,
//   clientSecret: null,
//   grantScope: 'user:email',
//   authorizePath: 'https://github.com/login/oauth/authorize',
//   resourcePath: 'https://github.com/login/oauth/access_token'
// }
// var oauth = new Oauth(options)
// var path = oauth.getAuthoriateAdress()
module.exports = gitHubOauth
