import React, { useState, useEffect, useCallback } from 'react'
import MessageList from 'components/messageList/messageList'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Read from 'components/read/read'
import Hidden from '@material-ui/core/Hidden'
import FolderList from 'components/folderList/folderList'
import { useDispatch } from 'react-redux'
import { activeReadMid } from '_redux/mail/mail_redux'
import { activeFolder } from '_redux/mail/mail_redux'
import { Switch, Route, useHistory, useParams, useLocation } from 'react-router-dom'
import Compose from 'components/compose/compose'
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group'
import { callbackify } from 'util'
import intl from 'react-intl-universal'
import Mailwork from 'assets/img/mail_work.svg'


const useStyles = makeStyles(theme => ({
  toolbar: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: '15px',
    paddingRight: '15px',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
  container: {
    display: 'flex',
    height: '100%'
  },
  mobile_messageList: {
    height: '100%',
    backgroundColor: theme.palette.background.paper
  },
  folderListCol: {
    width: '16%',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
  },
  newButtonWrapper: {
    padding: '0px 10px',
    height: '58px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  newButton: {
    borderRadius: '2px',
    fontSize: '13px',
  },
  folderListContainer: {
    height: 'calc(100% - 58px)',
    overflow: 'scroll'
  },
  messageListCol: {
    width: '28%',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    overflow: 'hidden',
    borderRight: '1px solid rgba(0,0,0,0.1)',
    borderLeft: '1px solid rgba(0,0,0,0.1)'
  },
  readCol: {
    width: '56%',
    height: '100%',
    backgroundColor: theme.palette.background.grey
  },
  noMatch: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  noMatchImg: {
    width: '50%'
  },
  noMatchText: {
    fontSize: '30px',
    color: '#605e5c',
    marginTop: '20px'
  },
  refreshButton: {
  },
  filterButton: {
    borderRadius: 0
  },
  preButton: {
    borderRadius: 0
  },
  nextButton: {
    borderRadius: 0
  },
  composeButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px'
  },
  emptyRead: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '40px'
  }
}))
export default function Mail() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { fid } = useParams()
  const location = useLocation()

  // 处理文件夹点击
  function handleFolderItemClick(fid) {
    // setFid(fid)
    history.push(`/main/mail/${fid}`)
    dispatch(activeFolder(fid))
  }
  // 新建邮件
  function handleCompose() {
    history.push(`/main/mail/${fid}/compose/new/null`)
  }
  const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back'
  }
  // 占位组件
  const noMatch = () => {
    return (
      <div className={classes.noMatch}>
        <img className={classes.noMatchImg} src={Mailwork} alt="no match" />
        <span className={classes.noMatchText}>未选择邮件</span>
      </div>
    )
  }
  return (
    <React.Fragment>
      <div className={classes.container}>
        {/* 文件夹列表 */}
        <div className={classes.folderListCol}>
          <div className={classes.newButtonWrapper}>
            <Button variant="contained" color="primary" size="large" fullWidth classes={{ root: classes.newButton }} onClick={handleCompose}>{intl.get('MAIN.MAIL.NEW_MAIL')}</Button>
          </div>
          <div className={classes.folderListContainer}>
            <FolderList handleFolderItemClick={handleFolderItemClick} />
          </div>
        </div>
        {/* 信件列表 */}
        <div className={classes.messageListCol}>
          <Route path="/main/mail/:fid" component={MessageList} />
        </div>
        {/* 写信读信区域 */}
        <div className={classes.readCol}>
          <Switch>
            <Route path="/main/mail/:fid/read/:mid" component={Read} />
            <Route path="/main/mail/:fid/compose/:action/:mid" component={Compose} />
            <Route component={noMatch} />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  )
}
