const {
  Option
} = require('../models')
module.exports = {
  async update (req, res) {
    try {
      console.log('optionid ', req.params.optionId)
      console.log('req.body ', req.body)
      let option = await Option.update(req.body, {
        where: {
          id: req.params.optionId
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
