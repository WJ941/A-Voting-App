const PollController = require( './controllers/PollController')
const OptionController = require( './controllers/OptionController')
const AuthenticationController = require( './controllers/AuthenticationController')
module.exports  = (app) => {
  app.get('/polls',
    PollController.index
  ),
  app.post('/poll/:pollId',
    OptionController.update
  ),
  app.get('/login_github',
    AuthenticationController.loginGithub
  ),
  app.get('/getuserinfo',
    AuthenticationController.getUserInfo
  ),
  app.post('/signingithub',
    AuthenticationController.signinGithub
  ),
  app.post('/newpoll',
    PollController.post
  ),
  app.delete('/poll/:pollId',
    PollController.delete
  )
}