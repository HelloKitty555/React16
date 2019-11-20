
// request拦截器
import { getSid } from 'network/utils'

export function request(config) {
  if (getSid()) {
    const params = config.params || {}
    config.params = {
      ...params,
      sid: getSid()
    }
  }
  return config
}
// response拦截器
export function response(res) {
  if (res.status === 0 || res.status === -1) {
    console.log('网络差，请稍后重试')
    return Promise.reject(res.data)
  }
  if (res.status === 500) {
    console.log('后端出错')
    return Promise.reject(res.data)
  }
  if (res.status === 200) {
    return Promise.resolve(res.data)
  }
}
export function reject(error) {
  return Promise.reject(error)
}