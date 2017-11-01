module.exports = (sequelize, DataTypes) => {
  var UserGithub = sequelize.define('UserGithub', {
    email: DataTypes.STRING,
    username: DataTypes.STRING
  })
  UserGithub.associate = function (model) {
    UserGithub.hasMany(model.Poll)
  }
  return UserGithub
}
