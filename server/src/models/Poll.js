module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    title: DataTypes.STRING
    // options: DataTypes.ENUM
  })
  return Poll
}
