import Api from './Api'
export default {
  index (params) {
    return Api().get('/polls', {
      params
    })
  },
  post (data) {
    return Api().post('/newpoll', data)
  }
}
