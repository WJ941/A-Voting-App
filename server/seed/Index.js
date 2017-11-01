const {
  Poll,
  Option,
  pollOption,
  UserGithub,
  sequelize
} = require ('../src/models')

const Promise = require('bluebird')
const polls = require('./Polls.json')
const options = require('./Options.json')
const polls_options = require('./Polls_Options.json')
const usersgithub = require('./UsersGithub.json')
sequelize.sync({force:true})
.then(async function() {
  await Promise.all(
    usersgithub.map( x => {
      UserGithub.create( x )
    })
  )
  await Promise.all(
    polls.map( x => {
      Poll.create( x )
    })
  )
  await Promise.all(
    options.map( x => {
      Option.create( x )
    })
  )
  await Promise.all(
    polls_options.map( x => {
      pollOption.create( x )
    })
  )
});
