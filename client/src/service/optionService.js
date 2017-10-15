import Api from './Api'
export default {
  update (data) {
    return Api().put(`/polls/${data.pollId}/${data.optionId}`, data.option)
  }
}
