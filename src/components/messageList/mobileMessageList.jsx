import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeReadMid, saveMessage } from '_redux/mail/mail_redux'
import List from '@material-ui/core/List'
import MessageItem from 'components/messageList/messageItem'
import ScrollView from 'components/scrollView/scrollView'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom'
import wmsvrApi from 'network/api'
import SkeletonLoading from 'components/messageList/SkeletonLoading'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    position: 'relative'
  },
  toolbar: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: '15px',
    paddingRight: '15px',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
  listWrapper: {
    padding: '0'
  },
  composeButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px'
  }
}))
export default function MobileMessageList() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { fid } = useParams()
  const reduxMessageList = useSelector(state => state.mail.messageListMap[fid]) || []
  const limit = 20
  const [messageList, setMessageList] = useState([])
  const [loadMore, setLoadMore] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  // 获取邮件列表
  useEffect(() => {
    if (reduxMessageList.length === 0) {
      const params = {
        fid: parseInt(fid),
        start: 0,
        limit,
        order: 'date',
        desc: true,
        summaryWindowSize: 20,
        returnTotal: true
      }
      setIsFetching(true)
      wmsvrApi.listMessages(params).then((data) => {
        if (data.code === 'S_OK') {
          dispatch(saveMessage(fid, data.var))
        }
      }, (error) => {
        console.log(error)
      }).finally(() => {
        setIsFetching(false)
      })
    }
  }, [fid])
  // 更新视图
  useEffect(() => {
    setMessageList(reduxMessageList)
  }, [reduxMessageList])
  // 加载更多
  useEffect(() => {
    if (loadMore) {
      setIsFetchingMore(true)
      const params = {
        fid: parseInt(fid),
        start: messageList.length,
        limit,
        order: 'date',
        desc: true,
        summaryWindowSize: 20,
        returnTotal: true
      }
      wmsvrApi.listMessages(params).then((data) => {
        if (data.code === 'S_OK') {
          dispatch(saveMessage(fid, messageList.concat(data.var)))
        }
      }, (error) => {
        console.log(error)
      }).finally(() => {
        setIsFetchingMore(false)
        setLoadMore(false)
      })
    }
  }, [loadMore])
  // 刷新
  useEffect(() => {
    if (refresh) {
      const params = {
        fid: 1,
        start: 0,
        limit: messageList.length,
        order: 'date',
        desc: true,
        summaryWindowSize: 20,
        returnTotal: true
      }
      wmsvrApi.listMessages(params).then((data) => {
        if (data.code === 'S_OK') {
          dispatch(saveMessage(fid, data.var))
        }
      }, (error) => {
        console.log(error)
      }).finally(() => {
        setRefresh(false)
      })
    }
  }, [refresh])
  // 下拉刷新
  function onPullDownRefresh() {
    setRefresh(true)
  }
  // 加载更多
  function onLoadMore() {
    setLoadMore(true)
  }
  // 处理邮件点击
  function handleMessageClick(mid) {
    history.push(`/main/mail/${fid}/read/${mid}`)
    dispatch(activeReadMid(mid))
  }
  // 写信
  function handleCompose() {
    history.push(`/main/mail/${fid}/compose`)
  }
  return (
    <div className={classes.container}>
      {isFetching ? <SkeletonLoading /> : ''}
      <ScrollView svHeight="100%" onPullDownRefresh={onPullDownRefresh} data={messageList} onPullUpLoad={onLoadMore}>
        <List>
          {messageList.map((message) => <div key={message.id} onClick={() => handleMessageClick(message.id)} ><MessageItem message={message} /></div>)}
        </List>
        <div style={{ textAlign: 'center' }}><CircularProgress /></div>
      </ScrollView>
      <Fab color="primary" className={classes.composeButton} onClick={handleCompose}>
        <AddIcon />
      </Fab>
    </div>
  )
}