import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import ReadContent from 'components/read/readContent'
import wmsvrApi from 'network/api'
import ScrollView from 'components/scrollView/scrollView'
import { useParams } from 'react-router-dom'
import SkeletonLoading from 'components/read/skeletonLoading'
import ReadAttachment from 'components/read/readAttachment'
import UserAvatar from 'components/userAvatar/userAvatar'
import { parse } from 'utils/email'
import ReadHeaderContact from 'components/read/readHeaderContact'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import CustomIcon from 'components/customIcon/customIcon'
import intl from 'react-intl-universal'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0 12px',
    height: '100%',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    marginBottom: '10px'
  },
  bar: {
    height: '60px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  grow: {
    flex: 1
  },
  subject: {
    padding: '0px 0px 15px 0px',
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
export default function Read(props) {
  const classes = useStyles()
  const { mid } = useParams()
  const [mailInfo, setMailInfo] = useState(false)
  const [mailContent, setMailContent] = useState('')
  const [attachments, setAttachments] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    const params = {
      autoName: true,
      filterImages: false,
      filterLinks: false,
      filterStylesheets: false,
      id: mid,
      markRead: true,
      mode: 'html',
      part: '',
      returnAntispamInfo: true,
      returnHeaders: { Sender: 'A' }
    }
    setIsFetching(true)
    wmsvrApi.readMessage(params).then(data => {
      if (data.code === 'S_OK') {
        setMailInfo(data.var)
        if (data.var.html) {
          setMailContent(data.var.html.content)
        } else {
          setMailContent(data.var.text.html)
        }
        data.var.attachments && setAttachments(data.var.attachments)
      }
    }, error => {
      console.log(error)
    }).finally(() => {
      setIsFetching(false)
    })
  }, [mid])
  function handleExpandClick() {
    setExpanded(v => !v)
  }
  // 返回
  function goBack() {
    window.history.go(-1)
  }
  // 删除邮件
  function handleDelete() {
    console.log('删除邮件coremail')
  }
  return (
    <div className={classes.container}>
      {!mailInfo || isFetching ? <SkeletonLoading /> : (
        <React.Fragment>
          <div className={classes.header}>
            <div className={classes.bar}>
              <IconButton onClick={handleDelete}>
                <CustomIcon iconName="icon-icondelete" size="28px" />
              </IconButton>
              <IconButton>
                <CustomIcon iconName="icon-icon_more" size="28px" />
              </IconButton>
            </div>
            <div className={classes.subject}>{mailInfo.subject || intl.get('MAIN.MAIL.NO_SUBJECT')}</div>
            <div className={classes.info} onClick={handleExpandClick}>
              <div className={classes.avatar}><UserAvatar userInfo={{ uid: mailInfo ? parse(mailInfo.from)[0].email : '', name: mailInfo ? parse(mailInfo.from)[0].name : '' }} size="35px" /></div>
              <div className={classes.brief}>
                <div className={classes.briefName}>{parse(mailInfo.from)[0].name || parse(mailInfo.from)[0].email}</div>
                <div className={classes.briefAction}>{intl.get('MAIN.MAIL.SEND_TO_ME')}</div>
              </div>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <div className={classes.contact}><ReadHeaderContact from={parse(mailInfo.from)} to={parse(mailInfo.to)} cc={parse(mailInfo.cc)} /></div>
            </Collapse>
          </div>
          <ReadContent mailContent={mailContent} />
          {attachments.length !== 0 ? <ReadAttachment attachments={attachments} mid={mid} /> : ''}
        </React.Fragment>
      )}
    </div>
  )
}
