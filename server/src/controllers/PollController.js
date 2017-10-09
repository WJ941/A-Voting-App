const {
  Poll,
  pollOption,
  Option
} = require('../models')
module.exports = {
  async index (req, res) {
    try {
      let polls = await Poll.findAll({
        limit: 10
      })
      res.status(200).send(polls)
    } catch (error) {
      res.status(500).send({
        error: error,
        Message: 'an error occurred trying to fetch the polls'
      })
    }
  },
  async getPoll (req, res) {
    try {
      const pollId = req.params.pollId
      console.log(pollId)
      let options = await pollOption.findAll({
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
      res.status(200).send(options)
    } catch (error) {
      res.status(500).send({
        error: error,
        Message: 'an error occurred trying to fetch the option'
      })
    }
  }
}
