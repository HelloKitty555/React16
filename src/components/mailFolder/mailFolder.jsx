import React, { useState, useEffect, useCallback } from 'react'
import wmsvrApi from 'network/api'
import MessageList from 'components/messageList/messageList'
import Pagination from 'components/pagination/pagination'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import MessageItem from 'components/messageList/messageItem'
import { makeStyles } from '@material-ui/core/styles'
import Read from 'components/read/read'
import Hidden from '@material-ui/core/Hidden'
import BScroll from 'better-scroll'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CircularProgress from '@material-ui/core/CircularProgress'
import ScrollView from 'components/scrollView/scrollView'
import FolderList from 'components/folderList/folderList'
import { useDispatch } from 'react-redux'
import { activeReadMid } from '_redux/mail/mail_redux'
import { activeFolder } from '_redux/mail/mail_redux'
import CustomIcon from 'components/customIcon/customIcon'
import IconButton from '@material-ui/core/IconButton'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Compose from 'components/compose/compose'

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
    backgroundColor: '#f1f3f4',
    padding: '15px 15px 15px 15px',
    height: 'calc(100vh - 64px)'
  },
  folderListCol: {
    width: '13%',
    backgroundColor: theme.palette.background.paper,
    padding: '10px 10px'
  },
  messageListCol: {
    width: '22%',
    margin: '0px 15px',
    backgroundColor: theme.palette.background.paper
  },
  readCol: {
    width: '65%',
    backgroundColor: theme.palette.background.paper,
    padding: '10px'
  },
  newButton: {
    borderRadius: 0
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
  emptyRead: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '40px'
  }
}))
export default function MailFolder() {
  const classes = useStyles()
  const [messageList, setMessageList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loadMore, setLoadMore] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [openFolderList, setOpenFolderList] = useState(false)
  const [mid, setMid] = useState('')
  const [fid, setFid] = useState(1)
  const smUpMatch = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const dispatch = useDispatch()

  // 初始化列表数据
  // useEffect(() => {
  //   const params = {
  //     fid: fid,
  //     start: 0,
  //     limit: 20,
  //     order: 'date',
  //     desc: true,
  //     summaryWindowSize: 20,
  //     returnTotal: true
  //   }
  //   wmsvrApi.listMessages(params).then((data) => {
  //     setMessageList(data.var)
  //   }, (error) => {
  //     console.log(error)
  //   })
  // }, [smUpMatch, fid])
  useEffect(() => {
    const params = {
      fid: fid,
      start: (currentPage - 1) * 20,
      limit: 20,
      order: 'date',
      desc: true,
      summaryWindowSize: 20,
      returnTotal: true
    }
    wmsvrApi.listMessages(params).then((data) => {
      setMessageList(data.var)
    }, (error) => {
      console.log(error)
    })
  }, [currentPage, fid])
  // 加载更多
  useEffect(() => {
    if (loadMore) {
      setIsFetchingMore(true)
      const params = {
        fid: 1,
        start: messageList.length,
        limit: 20,
        order: 'date',
        desc: true,
        summaryWindowSize: 20,
        returnTotal: true
      }
      wmsvrApi.listMessages(params).then((data) => {
        const temp = messageList.concat(data.var)
        setIsFetchingMore(false)
        setMessageList(temp)
      }, (error) => {
        console.log(error)
      }).finally(() => {
        setLoadMore(false)
      })
    }
  }, [loadMore])
  // 刷新
  useEffect(() => {
    if (refresh) {
      const params = {
        fid: 1,
        start: (currentPage - 1) * 20,
        limit: 20,
        order: 'date',
        desc: true,
        summaryWindowSize: 20,
        returnTotal: true
      }
      wmsvrApi.listMessages(params).then((data) => {
        const temp = data.var
        setMessageList(temp)
      }, (error) => {
        console.log(error)
      }).finally(() => {
        setRefresh(false)
      })
    }
  }, [refresh])
  // 下拉刷新
  const onPullDownRefresh = function () {
    setRefresh(true)
  }
  // 加载更多
  const onLoadMore = function () {
    setLoadMore(true)
  }
  // 处理邮件点击
  function handleMessageClick(mid) {
    setMid(mid)
    dispatch(activeReadMid(mid))
  }
  // 展开文件夹列表
  function handleFolderIitleClick() {
    setOpenFolderList(!openFolderList)
  }
  // 处理文件夹点击
  function handleFolderItemClick(fid) {
    setFid(fid)
    dispatch(activeFolder(fid))
  }
  // 处理刷新
  function handleRefresh() {
    setRefresh(true)
  }
  // 前一页
  function goPrePage() {
    setCurrentPage(v => v - 1)
  }
  // 下一页
  function goNextPage() {
    setCurrentPage(v => v + 1)
  }
  // 刷新当前页
  function refreshCurrentPage() {
    setRefresh(true)
  }
  return (
    <React.Fragment>
      <Hidden smUp>
        <ScrollView svHeight="calc(100vh - 56px)" onPullDownRefresh={onPullDownRefresh} data={messageList} onPullUpLoad={onLoadMore}>
          <List>
            {messageList.map((message) => <div key={message.id} onClick={() => handleMessageClick(message.id)}><MessageItem message={message} /></div>)}
          </List>
          {isFetchingMore ? <div style={{ textAlign: 'center' }}><CircularProgress /></div> : ''}
        </ScrollView>
      </Hidden>
      <Hidden xsDown>
        <div className={classes.container}>
          <div className={classes.folderListCol}>
            <div><Button variant="contained" color="primary" size="large" fullWidth={true} classes={{ root: classes.newButton }}>新建邮件</Button></div>
            <FolderList handleFolderItemClick={handleFolderItemClick} />
          </div>
          <div className={classes.messageListCol}>
            <div className={classes.toolbar}>
              <IconButton size="small" className={classes.refreshButton} aria-label="refresh" onClick={refreshCurrentPage}><CustomIcon iconName="icon-iconrefresh" /></IconButton>
              <IconButton size="small" className={classes.refreshButton} aria-label="refresh" onClick={goPrePage}><CustomIcon iconName="icon-iconright" /></IconButton>
              <IconButton size="small" className={classes.refreshButton} aria-label="refresh" onClick={goNextPage}><CustomIcon iconName="icon-iconleft" /></IconButton>
              <Button className={classes.filterButton}>筛选<CustomIcon iconName="icon-icondown" /></Button>
            </div>
            <ScrollView svHeight="calc(100vh - 160px)" data={messageList}>
              <List>
                {messageList.map((message) => <div key={message.id} onClick={() => handleMessageClick(message.id)}><MessageItem message={message} /></div>)}
              </List>
              {isFetchingMore ? <div style={{ textAlign: 'center' }}><CircularProgress /></div> : ''}
            </ScrollView>
          </div>
          <div className={classes.readCol}>
            {/* {mid ? <ScrollView svHeight="calc(100vh - 104px)"><Read mid={mid} /></ScrollView> : <div className={classes.emptyRead}><span>未选择阅读内容</span></div>} */}
            <Compose />
          </div>
        </div>
      </Hidden>
    </React.Fragment>
  )
}
