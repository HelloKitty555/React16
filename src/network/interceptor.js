
// request拦截器
import { getSid } from 'network/utils'
import { useHistory } from 'react-router-dom'

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
    console.log('服务器出错')
    return Promise.reject(res.data)
  }
  if (res.status === 200) {
    return Promise.resolve(res.data)
  }
  if (res.data.code === 'FA_INVALID_SESSION') {
    console.log('会话过期，请重新登录')
    return Promise.reject(res.data)
  }
  if (res.data.code === 'FA_UNAUTHORIZED') {
    history.href="login"
    return Promise.reject(res.data)
  }
}
export function reject(error) {
  return Promise.reject(error)
}