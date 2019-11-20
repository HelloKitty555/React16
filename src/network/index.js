import axios from 'axios'
import { getBaseUrl, getHeaders } from 'network/utils'
import { request, response, reject } from 'network/interceptor'

const req = axios.create({
  baseURL: getBaseUrl(),
  headers: getHeaders(),
  validateStatus(status) {
    return (status >= 200 && status < 300) || (status >= 400 && status < 410)
  }
})

req.interceptors.request.use(request, reject)
req.interceptors.response.use(response, reject)

export default req
