const {
  Poll,
  pollOption,
  PollUser,
  Option,
  User
} = require('../models')
var Promise = require('bluebird')
module.exports = {
  async index (req, res) {
    var polls
    var userPolls
    try {
      const userId = req.query.userId
      const pollId = req.query.pollId
      // if query certain user's polls
      if (userId) {
        userPolls = await PollUser.findAll({
          where: {
            UserId: userId
          },
          include: [
            {model: Poll}
          ]
        })
        polls = userPolls.map((x) => x.Poll)
      } else if (pollId) {
        // if query certain poll with pollId
        var options = await pollOption.findAll({
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
        var user = await PollUser.findAll({
          where: {
            pollId: pollId
          },
          include: [
            {
              model: Poll
            },
            {
              model: User
            }
          ]
        })
        polls = {options: options, user: user}
      } else {
        // if don't have querys, return all polls
        polls = await Poll.findAll({
          // limit: 10
        })
      }
      res.status(200).send(polls)
    } catch (error) {
      res.status(500).send({
        error: error,
        Message: 'an error occurred trying to fetch the polls'
      })
    }
  },
  // create new poll
  async post (req, res) {
    var data = req.body
    var {userId, title, options} = data
    // verify the necessary data
    if (!userId || !title || !options) {
      res.status(200).end('Missing Data')
    }
    // find the user, user should exist
    try {
      // should verify user's token
      var user = await User.findById(userId)
      if (!user) { res.status(200).end('Can not find the user in database') }
    } catch (e) {
      res.status(500).end('error occurs in find the user')
    }
    // create the poll(maybe have same title)
    try {
      var [poll] = await Poll.findOrCreate({
        where: {
          title: title
        }
      })
      var [pollUser] = await PollUser.findOrCreate({
        where: {
          PollId: poll.id,
          UserId: user.id
        }
      })
    } catch (e) {
      return res.status(400).send('Error ocoured in creating poll')
    }
    // ---------------save options------------
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
    newPollOptions = newPollOptions.map(x => x[0])
    res.status(200).send({
      user: user,
      poll: poll,
      pollUser: pollUser,
      options: newOptions,
      PollOption: newPollOptions
    })
  },
  async delete (req, res) {
    const pollId = req.params.pollId
    try {
      var deletedPoll = await Poll.destroy({
        where: {
          id: pollId
        },
        force: true
      })
      res.status(200).send({msg: 'delete succeed', deletedPoll: deletedPoll})
    } catch (e) {
      res.status(500).send({msg: 'delete succeed', error: e})
    }
  }
}
