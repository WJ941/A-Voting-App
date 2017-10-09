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
  }
}
