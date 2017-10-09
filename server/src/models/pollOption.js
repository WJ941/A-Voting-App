module.exports = (sequelize, DataTypes) => {
  const pollOption = sequelize.define('pollOption', {})
  pollOption.associate = function (model) {
    pollOption.belongsTo(model.Option)
    pollOption.belongsTo(model.Poll)
  }
  return pollOption
}
