module.exports = (sequelize, DataTypes) => {
  const PollUser = sequelize.define('PollUser', {})
  PollUser.associate = function (model) {
    PollUser.belongsTo(model.User)
    PollUser.belongsTo(model.Poll)
  }
  return PollUser
}
