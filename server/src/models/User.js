module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nickname: DataTypes.STRING,
    avatar: DataTypes.STRING
  })
  User.associate = function (model) {
    User.hasMany(model.Poll)
    User.hasMany(model.UserOauth)
  }
  return User
}
