const PollController = require( './controllers/PollController')
const OptionController = require( './controllers/OptionController')
module.exports  = (app) => {
  app.get('/polls',
    PollController.index
  ),
  app.get('/polls/:pollId',
    PollController.getPoll
  ),
  app.put('/polls/:pollId/:optionId',
    OptionController.update
  )
}