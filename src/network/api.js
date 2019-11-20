import req from 'network/index'
// post方法
function post(func, payload) {
  return new Promise((resolve, reject) => {
    req.post('', payload, { params: { func: func } }).then(res => {
      resolve(res)
    }, error => {
      reject(error)
    })
  })
}


const wmsvrApi = {
  // 登录及安全
  login: payload => post('user:login', payload),
  // 邮箱模块
  getAllFolders: payload => post('mbox:getAllFolders', payload), // 获取所有文件夹
  listMessages: payload => post('mbox:listMessages', payload), // 列举邮件
  searchMessages: payload => post('mbox:searchMessages', payload), // 搜索邮件
  getMessageInfos: payload => post('mbox:getMessageInfos', payload), // 获取邮件内容
  readMessage: payload => post('mbox:readMessage', payload), // 读取邮件
  compose: payload => post('mbox:compose', payload), // 写信
  getSignatures: payload => post('user:getSignatures', payload), // 获取签名档
  getAliasWithSeed: payload => post('user:getAliasWithSeed', payload),
  getPOPAccounts: payload => post('user:getPOPAccounts', payload),
  listSharedAccessMbox: payload => post('mbox:listSharedAccessMbox', payload),
  // 组织通讯录
  // 个人通讯录
  // 日程功能
  // 其他
}
export default wmsvrApi
