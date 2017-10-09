module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    text: DataTypes.STRING,
    value: DataTypes.INTEGER
  })
  return Option
}
