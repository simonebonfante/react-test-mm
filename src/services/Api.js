import axios from 'axios'
import config from '../config'

export default () => {
  return axios.create({
    baseURL: config.api_url,
    headers: {
      'Access-Control-Allow-Origin':  '*'
    }
  })
}
