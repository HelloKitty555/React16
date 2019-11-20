import errorCode from './errorCode'
import Cookie from 'js-cookie'

const DEV_BASE_URL = 'http://localhost:8989/coremail/s/'
const PROD_BASE_URL = '/coremail/s'

export function getBaseUrl() {
  return  DEV_BASE_URL
}
export function getHeaders() {
  const header = {
    'Accept': 'text/x-json',
    'Content-Type': 'text/x-json;charset=UTF-8'
  }
  return header
}
export function getSid() {
  return Cookie.get('Coremail.sid')
}
export function handleReqError(res, query) {
  const code = res['code']
  const error = errorCode[code]
  if (error) {
    console.log('出现错误')
    return true
  } else {
    console.log('出现错误')
    return false
  }
}
export function getServerUrlPrefix() {
  return `${window.location.origin}/coremail/s`
}
export function getRequestUrl(options) {
  let url = getServerUrlPrefix() + (options.query ? '/?' : '')
  if (options.query) {
    const queryParamList = Object.keys(options.query).map(key => `${key}=${options.query[key]}`)
    const queryStr = queryParamList.join('&')
    url += queryStr
  }
  return url
}
