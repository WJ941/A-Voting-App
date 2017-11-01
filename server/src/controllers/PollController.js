const {
  Poll,
  pollOption,
  Option
} = require('../models')
module.exports = {
  async index (req, res) {
    let polls = null
    try {
      const userId = req.query.userId
      const pollId = req.query.pollId
      console.log(userId)
      if (userId) {
        polls = await Poll.findAll({
          where: {
            UserGitHubId: userId
          }
        })
      } else if (pollId) {
        polls = await pollOption.findAll({
          where: {
            pollId: pollId
          },
          include: [
            {
              model: Option
            },
            {
              model: Poll
            }
          ]
        })
      } else {
        polls = await Poll.findAll({
          limit: 10
        })
      }
      console.log(pollId, req.query)
      res.status(200).send(polls)
    } catch (error) {
      res.status(500).send({
        error: error,
        Message: 'an error occurred trying to fetch the polls'
      })
    }
  }
}
