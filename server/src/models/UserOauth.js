module.exports = (sequelize, DataTypes) => {
  const UserOauth = sequelize.define('UserOauth', {
    identityType: DataTypes.STRING,
    identifier: DataTypes.STRING,
    credential: DataTypes.STRING
  })
  return UserOauth
}
// user_id
// identity_type 登录类型（手机号 邮箱 用户名）或第三方应用名称（微信 微博等）
// identifier 标识（手机号 邮箱 用户名或第三方应用的唯一标识）
// credential 密码凭证（站内的保存密码，站外的不保存或保存token）
