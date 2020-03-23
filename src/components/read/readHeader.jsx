import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import UserAvatar from 'components/userAvatar/userAvatar'
import { parse } from 'utils/email'
import ReadHeaderContact from 'components/read/readHeaderContact'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import CustomIcon from 'components/customIcon/customIcon'
import Hidden from '@material-ui/core/Hidden'
import intl from 'react-intl-universal'

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '10px'
  },
  bar: {
    height: '60px',
    display: 'flex'
  },
  grow: {
    flex: 1
  },
  subject: {
    padding: '26px 0',
    fontWeight: 'bolder',
    fontSize: '24px'
  },
  info: {
    display: 'flex',
  },
  brief: {
    marginLeft: '12px'
  },
  avatar: {

  },
  contact: {
    marginTop: '10px'
  },
  briefName: {
    color: theme.palette.text.primary
  },
  briefAction: {
    color: theme.palette.text.secondary
  }
}))
export default function ReadHeader(props) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const { headerInfo } = props
  let fromName = ''
  let fromEmail = ''
  let fromParseResult = []
  let toParseResult = []
  let ccParseResult = []
  if (headerInfo.from) {
    fromParseResult = parse(headerInfo.from)
    toParseResult = parse(headerInfo.to)
    ccParseResult = parse(headerInfo.cc)
    fromName = fromParseResult[0].name
    fromEmail = fromParseResult[0].email
  }

  function handleExpandClick() {
    setExpanded(v => !v)
  }
  // 返回
  function goBack() {
    window.history.go(-1)
  }
  return (
    <div className={classes.container}>
      {/* <div className={classes.bar}>
        <Hidden smUp>
          <IconButton color="inherit" aria-label="menu" onClick={goBack}>
            <CustomIcon iconName="icon-iconbacka" size="28px" />
          </IconButton>
        </Hidden>
        <div className={classes.grow} />
        <IconButton color="inherit" aria-label="delete">
          <CustomIcon iconName="icon-icondelete" size="28px" />
        </IconButton>
        <IconButton color="inherit" aria-label="more">
          <CustomIcon iconName="icon-icon_more" size="28px" />
        </IconButton>
      </div> */}
      <div className={classes.subject}>{headerInfo.subject || intl.get('MAIN.MAIL.NO_SUBJECT')}</div>
      <div className={classes.info} onClick={handleExpandClick}>
        <div className={classes.avatar}><UserAvatar userInfo={{ uid: fromEmail, name: fromName }} size="35px" /></div>
        <div className={classes.brief}>
          <div className={classes.briefName}>{fromName || fromEmail}</div>
          <div className={classes.briefAction}>{intl.get('MAIN.MAIL.SEND_TO_ME')}</div>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.contact}><ReadHeaderContact from={fromParseResult} to={toParseResult} cc={ccParseResult} /></div>
      </Collapse>
    </div>
  )
}
