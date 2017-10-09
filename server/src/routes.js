const PollController = require( './controllers/PollController')

module.exports  = (app) => {
  app.get('/polls',
    PollController.index
  ),
  app.get('/polls/:pollId',
    PollController.getPoll
  )
}