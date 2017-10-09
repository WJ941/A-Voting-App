const path = require('path')
const fs = require('fs')
const Sequelize = require('Sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
)
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return file !== 'index.js'
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })
Object.keys(db).forEach(function (modelname) {
  if ('associate' in db[modelname]) {
    db[modelname].associate(db)
  }
})
db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db
