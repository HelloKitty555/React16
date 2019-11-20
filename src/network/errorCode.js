export default {
  FA_INVALID_SESSION: { message: '会话超时，请重新登录', path: 'app-logout' },
  FA_SECURITY: { message: 'Session 未通过系统的安全检查', path: 'app-logout' },
  FS_API_ERR: { message: 'API调用失败,请稍后再尝试!', warn: true },
  FA_EMPTY_PARAM: { message: '请求的参数不能为空', warn: true },
  FA_INVALID_PARAMETER: { message: '请求的参数错误', warn: true },
  FS_UNKNOWN: { message: '系统遇到未知的错误', warn: true },
  FS_MS_SERVER_UNAVAILABLE: { message: 'MS服务器暂时不可用', warn: true }
}
