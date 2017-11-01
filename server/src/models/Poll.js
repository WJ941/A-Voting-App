module.exports = (sequelize, DataTypes) => {
  var Poll = sequelize.define('Poll', {
    title: DataTypes.STRING
  })
  return Poll
}
