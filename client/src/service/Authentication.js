import Api from './Api'
export default {
  loginGithub () {
    return Api().get(`/login_github`)
  },
  getUserInfo (query) {
    return Api().get(`/getuserinfo${query}`)
  },
  signinGithub (cridientals) {
    return Api().post('/signinGithub', cridientals)
  }
}
