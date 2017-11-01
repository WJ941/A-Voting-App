const path = require('path')
module.exports = {
  port: process.env.PORT || 8090,
  db: {
    database: process.env.DB_NAME || 'polls',
    username: process.env.DB_USER || 'polls',
    password: process.env.DB_PASS || 'polls',
    options: {
      host: process.env.HOST || 'localhost',
      dialect: process.env.DB_DIALECT || 'sqlite',
      storage: path.resolve(__dirname, '../../a-voting-app.sqlite')
    }
  },
  OAuthConfig: {
    GITHUB_CLIENT_ID: 'a3a201506e547487cd72',
    GITHUB_CLIENT_SECRET: '8f6319222dc35ffd8c4f1ea3e20203e842930bf5',
    CODE: '',
    GITHUB_CLIENT_SCOPE: 'user:email',
    GITHUB_AUTHORIZE_PATH: 'https://github.com/login/oauth/authorize',
    GITHUB_ACCESS_TOKEN_PAHT: 'https://github.com/login/oauth/access_token'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRESIN || '7d'
  }
}
