import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://47.104.160.6:8090'
  })
}
