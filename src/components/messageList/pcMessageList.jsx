import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { activeReadMid } from '_redux/mail/mail_redux'
import List from '@material-ui/core/List'
import MessageItem from 'components/messageList/messageItem'
import ScrollView from 'components/scrollView/scrollView'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom'
import wmsvrApi from 'network/api'
import CustomIcon from 'components/customIcon/customIcon'
import IconButton from '@material-ui/core/IconButton'
import SkeletonLoading from 'components/messageList/SkeletonLoading'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import intl from 'react-intl-universal'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Button from '@material-ui/core/Button'
import { CSSTransition } from 'react-transition-group'
import Empty from 'assets/img/empty.svg'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    position: 'relative'
  },
  toolbar: {
    height: '43px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '15px',
    paddingRight: '5px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    position: 'relative'
  },
  filterPanel: {
    position: 'absolute',
    top: '43px',
    right: '0',
    zIndex: 2,
    width: '120px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px'
  },
  filterCheckIcon: {
    position: 'absolute',
    left: '11px'
  },
  actionButtons: {
  },
  messageListContainer: {
    height: 'calc(100% - 43px)',
    overflow: 'scroll',
    '&:-webkit-scrollbar-track': {
      webkitBoxShadow: 'inset006pxrgba(0,0,0,0.3)',
      borderRadius: '10px'
    }
  },
  list: {
    paddingBottom: '0',
    paddingTop: '0'
  },
  listWrapper: {
    padding: '0'
  },
  composeButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px'
  },
  formControl: {
  },
  select: {
    textAlign: 'right',
    fontSize: '13px'
  },
  menuItem: {
    fontSize: '13px'
  },
  emptyTips: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  emptyImg: {
    width: '60%'
  },
  emptyText: {
    fontSize: '13px',
    marginTop: '20px'
  }
}))
export default function PcMessageList() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { fid } = useParams() // 当前文件夹
  const limit = 20 // 每页展示的数目
  const [messageList, setMessageList] = useState([]) // 邮件列表
  const [pageNum, setPageNum] = useState(1) // 页码
  const [total, setTotal] = useState(0) //  邮件总数
  const [refresh, setRefresh] = useState(false) // 刷新
  const [isFetching, setIsFetching] = useState(false) // 是否加载中
  const [filter, setFilter] = useState('all') // 过滤
  const [showFilterPanel, setShowFilterPanel] = useState(false) // 显示过滤下拉选项
  // 切换文件夹或者列表过滤
  useEffect(() => {
    let filterFlags = {}
    switch (filter) {
      case 'unread':
        filterFlags = {
          read: false
        }
        break
      case 'flag':
        filterFlags = {
          flagged: true
        }
        break
      case 'urgent':
        filterFlags = {
          priority: 1
        }
        break
      case 'attachment':
        filterFlags = {
          attached: true
        }
        break
      default:
        filterFlags = {}
    }
    const params = {
      fid: parseInt(fid),
      start: 0,
      limit,
      order: 'date',
      desc: true,
      summaryWindowSize: 20,
      returnTotal: true,
      filterFlags
    }
    setIsFetching(true)
    wmsvrApi.listMessages(params).then((data) => {
      if (data.code === 'S_OK') {
        setMessageList(data.var)
        setTotal(data.total)
        setPageNum(1)
      }
    }, (error) => {
      console.log(error)
    }).finally(() => {
      setIsFetching(false)
    })
  }, [fid, filter])
  // 页数更改或者刷新
  useEffect(() => {
    let filterFlags = {}
    switch (filter) {
      case 'unread':
        filterFlags = {
          read: false
        }
        break
      case 'flag':
        filterFlags = {
          flagged: true
        }
        break
      case 'urgent':
        filterFlags = {
          priority: 1
        }
        break
      case 'attachment':
        filterFlags = {
          attached: true
        }
        break
      default:
        filterFlags = {}
    }
    const params = {
      fid: parseInt(fid),
      start: (pageNum - 1) * limit,
      limit,
      order: 'date',
      desc: true,
      summaryWindowSize: 20,
      returnTotal: true,
      filterFlags
    }
    setIsFetching(true)
    wmsvrApi.listMessages(params).then((data) => {
      if (data.code === 'S_OK') {
        setMessageList(data.var)
        setTotal(data.total)
      }
    }, (error) => {
      console.log(error)
    }).finally(() => {
      setIsFetching(false)
    })
  }, [pageNum, refresh])
  // 前一页
  function goPrePage() {
    setPageNum(v => v - 1)
  }
  // 下一页
  function goNextPage() {
    setPageNum(v => v + 1)
  }
  // 刷新当前页
  function refreshCurrentPage() {
    setRefresh(v => !v)
  }
  // 处理邮件点击
  function handleMessageClick(mid) {
    if (parseInt(fid) === 2) {
      history.push(`/main/mail/${fid}/compose/restoredraft/${mid}`)
      dispatch(activeReadMid(mid))
    } else {
      history.push(`/main/mail/${fid}/read/${mid}`)
      dispatch(activeReadMid(mid))
    }
  }
  // 写信
  function handleCompose() {
    history.push(`/main/mail/${fid}/compose`)
  }
  // function handleFilterChange(event) {
  //   setFilter(event.target.value)
  // }
  // 显示筛选选项列表
  function handleFilterButtonClick() {
    setShowFilterPanel(v => !v)
  }
  // 筛选列表他处点击收回
  function handleFilterPanelClickAway() {
    setShowFilterPanel(false)
  }
  // 过滤选项点击
  function handleFilterItemClick(filter) {
    setShowFilterPanel(false)
    setFilter(filter)
  }
  return (
    <div className={classes.container}>
      {/* 顶部操作栏 */}
      <div className={classes.toolbar}>
        {/* 左侧按钮 */}
        <div className={classes.actionButtons}>
          <IconButton size="small" className={classes.refreshButton} onClick={refreshCurrentPage}><CustomIcon iconName="icon-iconrefresh" size={26} /></IconButton>
          <IconButton size="small" className={classes.refreshButton} onClick={goPrePage} disabled={pageNum === 1}><CustomIcon iconName="icon-iconright" size={26} /></IconButton>
          <IconButton size="small" className={classes.refreshButton} onClick={goNextPage} disabled={pageNum * limit >= total}><CustomIcon iconName="icon-iconleft" size={26} /></IconButton>
        </div>
        {/* 筛选 */}
        <ClickAwayListener onClickAway={handleFilterPanelClickAway}>
          <div>
            <Button
              onClick={handleFilterButtonClick}
              endIcon={showFilterPanel ? <CustomIcon iconName="icon-icontop" /> : <CustomIcon iconName="icon-icondown" />}>筛选</Button>
            <CSSTransition in={showFilterPanel} timeout={200} classNames="fade-slide" unmountOnExit>
              <div className={classes.filterPanel}>
                <div><Button fullWidth onClick={() => handleFilterItemClick('all')}>{filter === 'all' ? <span className={classes.filterCheckIcon}><CustomIcon iconName="icon-icon_check" size={14} /></span> : ''}{intl.get('MAIN.MAIL.ALL')}</Button></div>
                <div><Button fullWidth onClick={() => handleFilterItemClick('unread')}>{filter === 'unread' ? <span className={classes.filterCheckIcon}><CustomIcon iconName="icon-icon_check" size={14} /></span> : ''}{intl.get('MAIN.MAIL.UNREAD')}</Button></div>
                <div><Button fullWidth onClick={() => handleFilterItemClick('flag')}>{filter === 'flag' ? <span className={classes.filterCheckIcon}><CustomIcon iconName="icon-icon_check" size={14} /></span> : ''}{intl.get('MAIN.MAIL.FLAG')}</Button></div>
                <div><Button fullWidth onClick={() => handleFilterItemClick('urgent')}>{filter === 'urgent' ? <span className={classes.filterCheckIcon}><CustomIcon iconName="icon-icon_check" size={14} /></span> : ''}{intl.get('MAIN.MAIL.URGENT')}</Button></div>
                <div><Button fullWidth onClick={() => handleFilterItemClick('attachment')}>{filter === 'attachment' ? <span className={classes.filterCheckIcon}><CustomIcon iconName="icon-icon_check" size={14} /></span> : ''}{intl.get('MAIN.MAIL.ATTACH')}</Button></div>
              </div>
            </CSSTransition>
          </div>
        </ClickAwayListener>
      </div>
      {/* 骨架屏加载 */}
      {isFetching ? <SkeletonLoading /> : ''}
      {/* 邮件列表 */}
      <div className={classes.messageListContainer}>
        <List className={classes.list}>
          {messageList.map((message) => <div key={message.id} onClick={() => handleMessageClick(message.id)} ><MessageItem message={message} /></div>)}
        </List>
        {messageList.length === 0 ? <div className={classes.emptyTips}>
          <img src={Empty} className={classes.emptyImg}/>
          <span className={classes.emptyText}>{intl.get('MAIN.MAIL.NO_MAIL')}</span>
          </div> : ''}
      </div>
      {/* <ScrollView svHeight="calc(100% - 56px)" data={messageList} disableBounce={true}>
        <List>
          {messageList.map((message) => <div key={message.id} onClick={() => handleMessageClick(message.id)} ><MessageItem message={message} /></div>)}
        </List>
        {messageList.length === 0 ? <div className={classes.emptyTips}>该文件夹下没有邮件</div> : ''}
      </ScrollView> */}
    </div>
  )
}
