import Api from './Api'
export default {
  update (data) {
    return Api().post(`/poll/${data.pollId}`, data.option)
  }
}
