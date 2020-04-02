import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import UserAvatar from 'components/userAvatar/userAvatar'
import ListItem from '@material-ui/core/ListItem'
import { parse } from 'utils/email'
import { useSelector } from 'react-redux'
import Hidden from '@material-ui/core/Hidden'
import { useParams } from 'react-router-dom'
import CustomIcon from 'components/customIcon/customIcon'
import { useTheme } from '@material-ui/core/styles'
import { isSameDate, isYesterday, getTimeSimple, isTheDayBeforeYesterday, isSameYear, getTextWithoutYear, getTextSimple, getCurrentDate } from 'utils/date'
import intl from 'react-intl-universal'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px 15px 15px 15px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowarp'
    // borderBottom: '1px solid rgb(237,235,233)'
  },
  rootActive: {
    padding: '15px 15px 15px 15px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowarp',
    backgroundColor: theme.palette.primary.light
  },
  activeHighLightBar: {
    width: '4px',
    height: '100%',
    backgroundColor: theme.palette.primary
  },
  info: {
    flex: 1,
    marginLeft: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowarp'
  },
  sender_flags: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  sender: {
    fontSize: '13px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: '#212121',
    maxWidth: '50%',
    fontWeight: props => (props.read ? 'normal' : 'bolder')
  },
  flags: {
  },
  subject: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: '#858585',
    marginTop: '5px',
    fontWeight: props => (props.read ? 'normal' : 'bolder')
  },
  attachment: {
  },
  date: {
    fontSize: '13px',
    color: '#C2C2C2'
  }
}))

export default function MessageItem(props) {
  const { message } = props
  const theme = useTheme()
  const classes = useStyles({ read: message.flags.read })
  const fromParseResult = parse(message.from)
  const activeReadMid = useSelector(state => state.mail.activeReadMid)
  const { fid } = useParams()
  const sentDate = formatTime(message.sentDate)
  function formatTime(str) {
    // IOS中,safari不支持YYYY-MM-DD的格式,可以转成YYYY/MM/DD的格式
    const time = new Date(str.replace(/-/g, '/'))
    if (isSameDate(getCurrentDate(), time)) {
      return getTimeSimple(time)
    } else if (isYesterday(time, getCurrentDate())) {
      return '昨天'
    } else if (isTheDayBeforeYesterday(time, getCurrentDate())) {
      return '前天'
    } else if (isSameYear(getCurrentDate(), time)) {
      return getTextWithoutYear(time)
    } else {
      return getTextSimple(time)
    }
  }
  return (
    <ListItem button className={activeReadMid === message.id ? classes.rootActive : classes.root}>
      <div><UserAvatar userInfo={{ uid: fromParseResult[0].email, name: fromParseResult[0].name }} size="35px" /></div>
      <div className={classes.info}>
        <div className={classes.sender_flags}>
          <div className={classes.sender}>{fromParseResult[0].name || fromParseResult[0].email}</div>
          <div className={classes.flags}>
            {message.flags.calendar ? <CustomIcon iconName="icon-icon_schedule1" size="16px" /> : ''}
            {message.flags.flagged ? <CustomIcon iconName="icon-iconflagcolor" size="16px" color={theme.palette.error.main} /> : ''}
            {message.flags.attached || message.flags.linkAttached ? <span className={classes.attachment}><CustomIcon iconName="icon-iconaccessory" size="16px" /></span> : ''}
            <span className={classes.date}>{sentDate}</span>
          </div>
        </div>
        <div className={classes.subject}>{message.subject || intl.get('MAIN.MAIL.NO_SUBJECT')}</div>
      </div>
    </ListItem>
  )
}
