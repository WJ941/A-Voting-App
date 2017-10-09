import Api from './Api'
export default {
  getPoll (pollId) {
    return Api().get(`/polls/${pollId}`)
  },
  index (pollId) {
    return Api().get('/polls')
  }
}
