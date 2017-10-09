const express = require('express')
const app = express()
const config = require('./config/config' )
const { sequelize } = require( './models')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(morgan('combined'))
require('./routes')(app)

sequelize.sync()
.then(() => {
  app.listen(config.port)
  console.log(`You're listening port ${config.port}`)
})