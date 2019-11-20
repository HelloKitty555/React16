import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { getRequestUrl, getSid } from 'network/utils'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: props => ({
    backgroundColor: props.avatarColor,
    textAlign: 'center',
    fontSize: '8px',
    width: props.size,
    height: props.size,
  })
})
export default function UserAvatar(props) {
  const { userInfo, size } = props
  const [src, setSrc] = useState('')
  const [avatarText, setAvatarText] = useState('')
  const [avatarColor, setAvatarColor] = useState('')
  const classes = useStyles({ avatarColor, size })
  const avatarUrl = getRequestUrl({
    query: {
      func: 'oab:getHeadImageData',
      sid: getSid(),
      uid: userInfo.uid
    }
  })
  const img = new Image()
  img.src = avatarUrl
  img.onload = () => {
    setSrc(avatarUrl)
  }
  img.onerror = () => {
    const avatarStyle = getAvatarColorAndText(userInfo.uid, userInfo.name)
    setAvatarColor(avatarStyle.color)
    setAvatarText(avatarStyle.text)
  }
  // 获取通用头像颜色和头像文字
  function getAvatarColorAndText(email, name) {
    const colorList = [
      '#319fd8',
      '#776d9c',
      '#ab6579',
      '#7185a3',
      '#b36d63',
      '#aa8278',
      '#c65961'
    ]
    let color = colorList[0]
    let text = ''
    const emailCharList = email && email.split('')
    if (emailCharList && emailCharList.length >= 2) {
      text = emailCharList[0] + emailCharList[1]
    }
    if (email) {
      color = getColorByEmail(email, colorList)
    }
    if (name) {
      const chinesePart = name.match(/[\u4e00-\u9fa5]+/ig)
      const otherLanguagePart = name.match(/\w+/ig)
      let temp = ''
      if (chinesePart) {
        temp = getTextByGeneralRuleMatch(chinesePart)
      } else if (otherLanguagePart) {
        temp = getTextByGeneralRuleMatch(otherLanguagePart)
      }
      if (temp) {
        text = temp
      }
    }
    // 根据email字符编码和得到唯一数字标识，通过取模获取唯一对应颜色值
    function getColorByEmail(email, colorList) {
      const emailCharList = email.split('')
      let charCodeNum = 0
      let colorIndex = 0
      emailCharList.forEach((item) => {
        charCodeNum += item.charCodeAt(0)
      })
      colorIndex = charCodeNum % 7
      return colorList[colorIndex]
    }
    // 通用规则配置，使用通用规则匹配获取文字
    function getTextByGeneralRuleMatch(strArr) {
      let result = null
      const nameCharList = strArr[0].split('')
      if (nameCharList.length >= 2) {
        result = nameCharList[nameCharList.length - 2] + nameCharList[nameCharList.length - 1]
      } else {
        result = nameCharList[nameCharList.length - 1]
      }
      return result
    }
    return { color, text }
  }
  return (
    <Avatar src={src} className={classes.root}>{avatarText}</Avatar>
  )
}
UserAvatar.propTypes = {
  userInfo: PropTypes.object.isRequired
}
