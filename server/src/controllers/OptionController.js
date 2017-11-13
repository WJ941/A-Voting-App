const {
  Option
} = require('../models')
module.exports = {
  async update (req, res) {
    try {
      let oldOption = await Option.findOne({
        where: {
          text: req.body.text
        }
      })
      console.log('oldOption ', oldOption)
      let option = await Option.update(req.body, {
        where: {
          id: oldOption.id
        }
      })
      res.status(200).send(option)
    } catch (error) {
      res.status(500).send({
        error: error,
        Message: 'an error occurred trying to update the option'
      })
    }
  }
}
