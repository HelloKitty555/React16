// 解析email
export function parse(data) {
  let result = []
  const matchName = [
    /^".+"/ig, // "test" <test@test.com>
    /^.+</ig // test <test@test.com>
  ]
  const matchEmail = /<.+>$/ig
  // 传入data为字符串
  if (typeof data === 'string') {
    let temp = data.split(',')
    temp = temp.map(item => {
      let name = ''
      let email = ''
      // 解析name
      for (let i = 0; i < matchName.length; i++) {
        const regxResult = item.trim().match(matchName[i])
        if (regxResult) {
          if (i === 0) {
            name = regxResult[0].slice(1, -1)
          }
          if (i === 1) {
            name = regxResult[0].slice(0, -1).trim()
          }
          break
        }
      }
      // 解析email
      // email = item.trim().match(matchEmail)[0].slice(1, -1)
      const parseEmailResult = item.trim().match(matchEmail)
      if (parseEmailResult) {
        email = parseEmailResult[0].slice(1, -1)
      } else {
        email = item
      }
      return {
        name,
        email
      }
    })
    result = temp
  }
  // 传入data为数组
  if (data instanceof Array) {
    const temp = data.map(item => {
      let name = ''
      let email = ''
      // 解析name
      for (let i = 0; i < matchName.length; i++) {
        const regxResult = item.trim().match(matchName[i])
        if (regxResult) {
          if (i === 0) {
            name = regxResult[0].slice(1, -1)
          }
          if (i === 1) {
            name = regxResult[0].slice(0, -1).trim()
          }
          break
        }
      }
      // 解析email
      const parseEmailResult = item.trim().match(matchEmail)
      if (parseEmailResult) {
        email = parseEmailResult[0].slice(1, -1)
      } else {
        email = item
      }
      return {
        name,
        email
      }
    })
    result = temp
  }
  return result
}
// email地址合法性验证
export function validate(email) {
  const emailRE = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/ //eslint-disable-line
  return emailRE.test(email)
}
