const {
  Poll,
  pollOption,
  Option,
  UserGithub
} = require('../models')
var Promise = require('bluebird')
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
  },
  async post (req, res) {
    var data = req.body
    console.log('userId: ', data.userId)
    try {
      var user = await UserGithub.findOne({
        where: {id: data.userId}
      })
    } catch (e) {
      res.status(200).end('Can not find the user in database')
    }
    try {
      var [poll, pollIsNew] = await Poll.findOrCreate({
        where: {
          title: data.title,
          UserGithubId: user.id
        }
      })
    } catch (e) {
      return res.status(400).send('Error ocoured in creating poll')
    }
    // ---------------save options------------
    var options = data.options
    var newOptions = await Promise.map(options, function (option) {
      return Option.findOrCreate({where: option})
    })
    newOptions = newOptions.map(x => x[0])
    var newPollOptions = await Promise.map(newOptions, function (option) {
      return pollOption.findOrCreate({
        where: {
          PollId: poll.id,
          OptionId: option.id
        }
      })
    })
    res.status(200).send({
      user: user,
      poll: poll,
      pollIsNew: pollIsNew,
      options: newOptions,
      PollOption: newPollOptions
    })
  }
}
