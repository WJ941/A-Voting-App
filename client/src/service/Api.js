import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'http://47.104.160.6:8090'
    baseURL: 'http://127.0.0.1:8090'
  })
}
