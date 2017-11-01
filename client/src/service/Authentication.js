import Api from './Api'
export default {
  loginGithub () {
    return Api().get(`/login_github`)
  },
  getUserInfo (search) {
    return Api().get(`/getuserinfo${search}`)
  },
  signinGithub (cridientals) {
    return Api().post('/signinGithub', cridientals)
  }
}
