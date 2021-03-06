import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import wmsvrApi from 'network/api'
import { validate, parse } from 'utils/email'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import intl from 'react-intl-universal'
import { useSnackbar } from 'notistack'
import { useConfirm } from 'material-ui-confirm'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { CSSTransition } from 'react-transition-group'
import CustomIcon from 'components/customIcon/customIcon'
import AutoMatchContactItem from 'components/compose/autoMatchContactItem'
import Loading from 'assets/img/loading.gif'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import IconButton from '@material-ui/core/IconButton'
import ComposeAttachmentItem from 'components/compose/composeAttachmentItem'
import Cookie from 'js-cookie'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    padding: '0 12px',
    backgroundColor: theme.palette.background.paper
  },
  labelButton: {
    marginRight: '4px'
  },
  from: {
    height: '50px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  accountComp: {
    display: 'inline-block',
    marginLeft: '6px',
    position: 'relative'
  },
  accountPanel: {
    zIndex: 2,
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px'
  },
  accountItem: {
    padding: '10px 20px'
  },
  autoMatchPanel: {
    position: 'absolute',
    zIndex: 2,
    top: '100%',
    maxHeight: '50vh',
    overflow: 'scroll',
    width: '300px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px'
  },
  autoMatchContactItem: {
    padding: '8px 17px'
  },
  autoMatchFetching: {
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: '50px'
  },
  noResultFound: {
    height: '50px',
    textAlign: 'center',
    lineHeight: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  to: {
    padding: '5px 0',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'flex-start',
  },
  cc: {
    padding: '5px 0',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'flex-start',
  },
  bcc: {
    padding: '5px 0',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'flex-start',
  },
  rightSide: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative'
  },
  subject: {
    height: '50px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  showCcbutton: {
    minWidth: '50px'
  },
  showBccButton: {
    minWidth: '50px'
  },
  input: {
    border: 'none',
    flex: 1,
    height: '35px',
    paddingLeft: '6px',
    outline: 'none',
  },
  chip: {
    margin: '2px',
    display: 'inline-block'
  },
  chip_right: {
    fontSize: '13px',
  },
  chip_error: {
    backgroundColor: '#ef5350',
    fontSize: '13px',
  },
  composeEdit: {
    height: '90%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  attachments: {
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
  actionBar: {
    paddingBottom: '8px',
    paddingTop: '8px',
  },
  attachmentItem: {
    margin: '0 20px 15px 0',
    display: 'inline-block',
  },
  composeAction: {
    borderTop: '1px solid rgba(0,0,0,0.1)',
    padding: '12px 0'
  },
  contactContainer: {
  },
  editorContainer: {
    flex: 1
  },
  editArea: {
    paddingTop: '20px',
    outline: 'none',
    flex: 1
  },
  sendButton: {
    marginRight: '12px'
  },
  editor: {
    display: 'flex',
    flexDirection: 'column'
  },
  editorControlBar: {
    fontSize: theme.typography.htmlFontSize
  },
  editorContent: {
    flex: 1,
    overflow: 'scroll'
  },
  fileInput: {
    display: 'none'
  }
}))
export default function Compose(props) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const confirm = useConfirm()
  const { action, mid, fid } = useParams()
  const [send, setSend] = useState(false) // 是否发信
  const [composeId, setComposeId] = useState('') // 写信id
  const [account, setAccount] = useState('') // 发信人
  const [accountList, setAccountList] = useState([]) // 发信人列表
  const [to, setTo] = useState([]) // 收件人
  const [cc, setCc] = useState([]) // 抄送
  const [bcc, setBcc] = useState([]) // 密送
  const [subject, setSubject] = useState('') // 主题
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null)) // 富文本编辑器内容
  const [attachments, setAttachments] = useState([]) // 附件
  const [files, setFiles] = useState('') // input file
  const [showCc, setShowCc] = useState(false) // 显示抄送栏
  const [showBcc, setShowBcc] = useState(false) // 显示密送栏
  const [showAccountPanel, setShowAccountPanel] = useState(false) // 显示发信人选择列表
  const [autoMatchList, setAutoMatchList] = useState([]) // 联系人自动匹配列表
  const [showToAutoMatchPanel, setShowToAutoMatchPanel] = useState(false) // 显示收件人自动匹配列表
  const [showCcAutoMatchPanel, setShowCcAutoMatchPanel] = useState(false) // 显示抄送人自动匹配列表
  const [showBccAutoMatchPanel, setShowBccAutoMatchPanel] = useState(false) // 显示密送人自动匹配列表
  const [autoMatchKeyword, setAutoMatchKeyword] = useState('') // 自动匹配关键词
  const [autoMatchTimer, setAutoMatchTimer] = useState('') // 自动匹配延时器，用于自动匹配防抖动
  const [isAutoMatchFetching, setIsAutoMatchFetching] = useState(false) // 自动匹配查询中
  const [noResultFound, setNoResultFound] = useState(false) // 未找到任何结果
  const userAttr = JSON.parse(localStorage.getItem('userAttr')) // 用户属性
  const toInput = useRef(null)
  const ccInput = useRef(null)
  const bccInput = useRef(null)
  const editArea = useRef(null)
  // 富文本编辑器工具栏功能列表
  const controls = [
    'undo',
    'redo',
    'font-size',
    'bold', 'italic',
    'underline',
    'strike-through',
    'text-color',
    'text-align',
    'text-indent',
    'list-ul',
    'list-ol',
    'blockquote',
    'code',
    'hr',
    'media',
    'clear',
    'emoji'
  ]
  // 富文本编辑器字号列表
  const fontSizes = [
    8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72
  ]
  // 初始化写信
  useEffect(() => {
    setSubject('')
    setSubject('')
    setTo([])
    setCc([])
    setBcc([])
    switch (action) {
      case 'new':
        const options = {
          returnInfo: true,
          attrs: {
            to: [''],
            cc: null,
            bcc: null,
            content: '',
            isHtml: true
          }
        }
        wmsvrApi.compose(options).then((data) => {
          if (data.code === 'S_OK') {
            setComposeId(data.var.id)
          }
        }, (error) => {
          console.log(error)
        })
        break
      case 'restoredraft':
        wmsvrApi.restoreDraft({ id: mid }).then((data) => {
          if (data.code === 'S_OK') {
            setComposeId(data.var.id)
            setSubject(data.var.subject)
            setQuoteContent(data.var.content)
            setEditorState(BraftEditor.createEditorState(data.var.content))
            if (data.var.to) {
              let result = ''
              const toList = []
              data.var.to.forEach((item) => {
                result = parse(item)[0]
                toList.push({ name: result.name, email: result.email, valid: validate(result.email) })
              })
              setTo(toList)
            }
            if (data.var.cc) {
              let result = ''
              const ccList = []
              data.var.cc.forEach((item) => {
                result = parse(item)[0]
                ccList.push({ name: result.name, email: result.email, valid: validate(result.email) })
              })
              setCc(ccList)
            }
            if (data.var.bcc) {
              let result = ''
              const bccList = []
              data.var.bcc.forEach((item) => {
                result = parse(item)[0]
                bccList.push({ name: result.name, email: result.email, valid: validate(result.email) })
              })
              setBcc(bccList)
            }
          }
        }, (error) => {
          console.log(error)
        })
        break
      default:
        break
    }
    // 获取发信账号列表
    setAccount(userAttr.email)
    let tempAccountList = [userAttr.primary_email]
    wmsvrApi.getAliasWithSeed().then((data) => {
      if (data.code === 'S_OK') {
        tempAccountList = tempAccountList.concat(data.var[0].aliases.map((alias) => alias.id))
        wmsvrApi.getPOPAccounts().then((data) => {
          if (data.code === 'S_OK') {
            tempAccountList = tempAccountList.concat(data.var.map((pop) => pop.email))
            wmsvrApi.listSharedAccessMbox().then((data) => {
              if (data.code === 'S_OK') {
                tempAccountList = tempAccountList.concat(data.var.map((share) => share.email))
                setAccountList(tempAccountList)
              }
            }, (error) => {
              console.log(error)
            })
          }
        }, (error) => {
          console.log(error)
        })
      }
    }, (error) => {
      console.log(error)
    })
  }, [action, mid])
  // 发信
  useEffect(() => {
    if (send) {
      // 因为braftEditor生成的HTML某些组件只会生成结构而不会带上样式，如代码块，引用块，所以这里要带上blockquote，code的内置样式，在此处处理不太好，后续优化（todo）
      let contentHtml = editorState.toHTML().replace(/<blockquote>/g, '<blocquote style="display: block;margin: 0 0 10px;padding: 15px 20px;background-color: #f1f2f3;border-left:5px solid #ccc;color:#666;font-style: italic">').
        replace(/<pre><code>/g, '<pre style="font-weight:400;line-height:16px;word-wrap:break-word;white-space:pre-wrap;max-width:100%;max-height:100%;margin:10px 0;padding:15px;overflow:auto;background-color:#f1f2f3;border-radius:3px;color:#666;font-family:monospace;font-size: 14px;"><code>')
      // 带上code的内置样式
      const validTo = []
      const validCc = []
      const validBcc = []
      to.forEach((item) => { item.valid && validTo.push(item.email) })
      cc.forEach((item) => { item.valid && validCc.push(item.email) })
      bcc.forEach((item) => { item.valid && validBcc.push(item.email) })
      const attachmentsList = attachments.map((item) => {
        return {
          id: item.id,
          type: item.type,
          name: item.name,
          size: item.size
        }
      })
      const options = {
        attrs: {
          scheduleDate: null,
          account,
          to: validTo,
          cc: validCc,
          bcc: validBcc,
          showOneRcpt: false,
          smimeSign: false,
          smimeEncrypt: false,
          smimeEnvelopId: '',
          saveSentCopy: true,
          requestReadReceipt: false,
          forbidDownload: false,
          subject,
          isHtml: true,
          content: contentHtml,
          attachments: attachmentsList
        },
        action: 'deliver',
        id: composeId,
        returnInfo: true,
        autosaveHitCounter: true,
      }
      wmsvrApi.compose(options).then((data) => {
        if (data.code === 'S_OK') {
          enqueueSnackbar(intl.get("MAIN.MAIL.MESSAGE_SUCCESS"), { variant: 'success' })
          history.push(`/main/mail/${fid}`)
        }
      }, (error) => {
        enqueueSnackbar(intl.get("MAIN.MAIL.MESSAGE_FAIL"), { variant: 'error' })
        console.log(error)
      }).finally(() => {
        setSend(false)
      })
    }
  }, [send])
  // 自动匹配联系人
  useEffect(() => {
    if (autoMatchKeyword) {
      setAutoMatchList([])
      setIsAutoMatchFetching(true)
      setNoResultFound(false)
      const options = {
        limit: 20,
        keyword: autoMatchKeyword,
        attrIds: ['m', 'location'],
        enableNickNameAC: true,
        enableVirtualUserAC: true,
        enableAliasAC: true,
      }
      wmsvrApi.autoMatch(options).then((data) => {
        if (data.code === 'S_OK' && data.var.length !== 0) {
          setAutoMatchList(data.var)
        } else {
          setNoResultFound(true)
        }
      }, (error) => {
        console.log(error)
      }).finally(() => {
        setIsAutoMatchFetching(false)
      })
    } else {
      setAutoMatchList([])
    }
  }, [autoMatchKeyword])
  // 发送
  function handleSend() {
    if (to.length === 0) {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(intl.get("MAIN.MAIL.NO_RECEVIER"), { variant: 'warning' })
    } else if (!subject) {
      confirm({
        title: intl.get('MAIN.MAIL.LACK_OF_SUBJECT'),
        description: intl.get('MAIN.MAIL.SEND_WITHOUT_SUBJECT'),
        confirmationText: intl.get('COMMON.CONFIRM'),
        cancellationText: intl.get('COMMON.CANCEL')
      }).then(() => {
        setSend(true)
      }, () => {
      })
    } else {
      setSend(true)
    }
  }
  // 附件上传准备（分两步，先准备，再上传，上传过程目前在附件组件中进行，可能这样写不是最佳实践，后续可以进行优化）
  useEffect(() => {
    for (let i = 0; i < files.length; i++) {
      prepareUpload(files[i])
    }
    function prepareUpload(file) {
      const data = {
        inlined: false,
        size: file.size,
        fileName: file.name,
        attachmentId: -1,
        composeId
      }
      wmsvrApi.uploadPrepare(data).then((data) => {
        if (data.code === 'S_OK') {
          const attachment = {
            id: data.var.attachmentId,
            name: data.var.fileName,
            type: 'upload',
            size: data.var.size,
            file // file文件对象 该值非接口字段，发信时可去除
          }
          console.log(attachments)
          setAttachments([...attachments, attachment])
        }
      }, (error) => {
        console.log(error)
      })
    }
  }, [files])
  // 发信人改变处理
  function handleAccountChange(event) {
    setAccount(event.target.value)
  }
  // 输入框 blur 监听
  function handleInputBlur(event) {
    const value = event.target.value.trim()
    if (value) {
      switch (event.target.name) {
        case 'to':
          toInput.current.value = ''
          !isExist(to, value) && setTo([...to, { email: value, valid: validate(value) }])
          break
        case 'cc':
          ccInput.current.value = ''
          !isExist(cc, value) && setCc([...cc, { email: value, valid: validate(value) }])
          break
        case 'bcc':
          bccInput.current.value = ''
          !isExist(bcc, value) && setBcc([...bcc, { email: value, valid: validate(value) }])
          break
        default:
          break
      }
    }
  }
  // 输入框键盘事件keyDown监听(Backspace回删响应)
  function handleContactKeyDown(event) {
    if (event.keyCode === 8 && !event.target.value) {
      switch (event.target.name) {
        case 'to':
          setTo(to.slice(0, to.length - 1))
          break
        case 'cc':
          setCc(cc.slice(0, cc.length - 1))
          break
        case 'bcc':
          setBcc(bcc.slice(0, bcc.length - 1))
          break
        default:
          break
      }
    }
  }
  // 输入聚焦
  function handleInputFocus() {
    // setShowAutoMatchPanel(true)
  }
  // input change监听
  function handleInputChange(event) {
    const name = event.target.name
    const value = event.target.value
    if (autoMatchTimer) {
      clearTimeout(autoMatchTimer)
    }
    const timer = setTimeout(() => {
      switch (name) {
        case 'to':
          if (value) {
            setShowToAutoMatchPanel(true)
          } else {
            setShowToAutoMatchPanel(false)
          }
          break
        case 'cc':
          if (value) {
            setShowCcAutoMatchPanel(true)
          } else {
            setShowCcAutoMatchPanel(false)
          }
          break
        case 'bcc':
          if (value) {
            setShowBccAutoMatchPanel(true)
          } else {
            setShowBccAutoMatchPanel(false)
          }
          break
        default:
          break
      }
      setAutoMatchKeyword(value)
    }, 400)
    setAutoMatchTimer(timer)
  }

  // 判断联系人是否已经存在
  function isExist(list, email) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].email === email) {
        return true
      }
    }
    return false
  }
  // 主题失焦处理
  function handleSujecttBlur(event) {
    setSubject(event.target.value)
  }
  // 移除联系人
  function handleContactDelete(type, email) {
    switch (type) {
      case 'to':
        setTo(to.filter((toItem) => toItem.email !== email))
        break
      case 'cc':
        setCc(cc.filter((ccItem) => ccItem.email !== email))
        break
      case 'bcc':
        setBcc(bcc.filter((bccItem) => bccItem.email !== email))
        break
      default:
        break
    }
  }
  // 正文区输入处理
  function handleContentInput() {
    setContent(editArea.current.innerHTML)
  }
  // 取消写信
  function handleCancel() {
    history.push(`/main/mail/${fid}`)
  }
  // 显示密送栏
  function handleShowBcc() {
    setShowBcc(true)
  }
  // 显示抄送栏
  function handleShowCc() {
    setShowCc(true)
  }
  // 发信人选择他处点击处理
  function handleAccountPanelClickAway() {
    setShowAccountPanel(false)
  }
  // 自动匹配他处点击处理
  function handleAutoMatchPanelClickAway() {
    setShowToAutoMatchPanel(false)
    setShowCcAutoMatchPanel(false)
    setShowBccAutoMatchPanel(false)
  }
  // 自动匹配结果点击
  function handleAutoMatchItemClick(info, type) {
    switch (type) {
      case 'to':
        toInput.current.value = ''
        setShowToAutoMatchPanel(false)
        setTo([...to, { name: info.true_name, email: info.email, valid: true }])
        break
      case 'cc':
        ccInput.current.value = ''
        setShowCcAutoMatchPanel(false)
        setCc([...cc, { name: info.true_name, email: info.email, valid: true }])
        break
      case 'bcc':
        bccInput.current.value = ''
        setShowBccAutoMatchPanel(false)
        setBcc([...bcc, { name: info.true_name, email: info.email, valid: true }])
        break
      default:
        break
    }
    setAutoMatchList([])
    setAutoMatchKeyword('')
  }
  // 选择发信人
  function handleAccountItemClick(value) {
    setAccount(value)
    setShowAccountPanel(false)
  }
  // 点击发信人选择按钮
  function handleAccountButtonClick() {
    setShowAccountPanel(!showAccountPanel)
  }
  // 编辑区状态改变
  function handleEditorChange(state) {
    setEditorState(state)
  }
  // 处理附件Input的Change事件
  function handleFileInputChange(event) {
    if (event.target.files.length !== 0) {
      setFiles(event.target.files)
    }
  }
  // 删除附件
  function deleteAttachment(id) {
    const temp = []
    attachments.forEach((item) => {
      if (item.id !== id) {
        temp.push(item)
      }
    })
    setAttachments(temp)
  }
  return (
    <div className={classes.container}>
      <div className={classes.composeEdit}>
        <div className={classes.contactContainer}>
          {/* 发信人 */}
          <div className={classes.from}>
            <div>
              <Button variant="contained" color="primary" className={classes.labelButton} disableElevation>{intl.get('MAIN.MAIL.FROM')}</Button>
              <ClickAwayListener onClickAway={handleAccountPanelClickAway}>
                <div className={classes.accountComp}>
                  <Button onClick={handleAccountButtonClick} endIcon={showAccountPanel ? <CustomIcon iconName="icon-icontop" /> : <CustomIcon iconName="icon-icondown" />}>{account}</Button>
                  <CSSTransition in={showAccountPanel} timeout={200} classNames="fade-slide" unmountOnExit>
                    <div className={classes.accountPanel}>
                      {accountList.map((item => <Button key={item} className={classes.accountItem} fullWidth onClick={() => handleAccountItemClick(item)}>{item}</Button>))}
                    </div>
                  </CSSTransition>
                </div>
              </ClickAwayListener>
            </div>
            <div>
              {!showCc ? (
                <Button color="primary" className={classes.showCcbutton} onClick={handleShowCc}>
                  {intl.get('MAIN.MAIL.CC')}
                </Button>
              ) : ''}
              {!showBcc ? (
                <Button color="primary" className={classes.showBccButton} onClick={handleShowBcc}>
                  {intl.get('MAIN.MAIL.BCC')}
                </Button>
              ) : ''}
            </div>
          </div>
          {/* 收件人 */}
          <div className={classes.to}>
            <Button variant="contained" color="primary" className={classes.labelButton} disableElevation>{intl.get('MAIN.MAIL.TO')}</Button>
            <ClickAwayListener onClickAway={handleAutoMatchPanelClickAway}>
              <div className={classes.rightSide}>
                {to.map((contact) => <span className={classes.chip} key={contact.email}><Chip className={contact.valid ? classes.chip_right : classes.chip_error} size="medium" label={contact.name || contact.email} color="primary" onDelete={() => { handleContactDelete('to', contact.email) }} /></span>)}
                <input type="text" name="to" className={classes.input} onFocus={handleInputFocus} onBlur={handleInputBlur} ref={toInput} onKeyDown={handleContactKeyDown} onChange={handleInputChange} />
                <CSSTransition in={showToAutoMatchPanel} timeout={200} classNames="fade-slide" unmountOnExit>
                  <div className={classes.autoMatchPanel}>
                    {autoMatchList.map((item => <Button className={classes.autoMatchContactItem} key={item.email} fullWidth onMouseDown={() => handleAutoMatchItemClick(item, 'to')}><AutoMatchContactItem contactInfo={item} /></Button>))}
                    {isAutoMatchFetching ? <div className={classes.autoMatchFetching}><img src={Loading} alt="Loading" /><span>{intl.get('MAIN.MAIL.SEARCHING')}</span></div> : ''}
                    {noResultFound ? <div className={classes.noResultFound}><span>{intl.get('MAIN.MAIL.NO_RESULT_FOUND')}</span></div> : ''}
                  </div>
                </CSSTransition>
              </div>
            </ClickAwayListener>
          </div>
          {/* 抄送 */}
          {showCc ? (
            <div className={classes.cc}>
              <Button variant="contained" color="primary" className={classes.labelButton} disableElevation>{intl.get('MAIN.MAIL.CC')}</Button>
              <ClickAwayListener onClickAway={handleAutoMatchPanelClickAway}>
                <div className={classes.rightSide}>
                  {cc.map((contact) => <span className={classes.chip} key={contact.email}><Chip className={contact.valid ? classes.chip_right : classes.chip_error} size="medium" label={contact.name || contact.email} color="primary" onDelete={() => { handleContactDelete('cc', contact.email) }} /></span>)}
                  <input type="text" name="cc" className={classes.input} onBlur={handleInputBlur} ref={ccInput} onKeyDown={handleContactKeyDown} onChange={handleInputChange} />
                  <CSSTransition in={showCcAutoMatchPanel} timeout={200} classNames="fade-slide" unmountOnExit>
                    <div className={classes.autoMatchPanel}>
                      {autoMatchList.map((item => <Button key={item.email} className={classes.autoMatchContactItem} fullWidth onMouseDown={() => handleAutoMatchItemClick(item, 'cc')}><AutoMatchContactItem contactInfo={item} /></Button>))}
                      {isAutoMatchFetching ? <div className={classes.autoMatchFetching}><img src={Loading} alt="Loading" /><span>{intl.get('MAIN.MAIL.SEARCHING')}</span></div> : ''}
                      {noResultFound ? <div className={classes.noResultFound}><span>{intl.get('MAIN.MAIL.NO_RESULT_FOUND')}</span></div> : ''}
                    </div>
                  </CSSTransition>
                </div>
              </ClickAwayListener>
            </div>
          ) : ''}
          {/* 密送 */}
          {showBcc ? (
            <div className={classes.bcc}>
              <Button variant="contained" color="primary" className={classes.labelButton} disableElevation>{intl.get('MAIN.MAIL.BCC')}</Button>
              <ClickAwayListener onClickAway={handleAutoMatchPanelClickAway}>
                <div className={classes.rightSide}>
                  {bcc.map((contact) => <span className={classes.chip} key={contact.email}><Chip className={contact.valid ? classes.chip_right : classes.chip_error} size="medium" label={contact.name || contact.email} color="primary" onDelete={() => { handleContactDelete('bcc', contact.email) }} /></span>)}
                  <input type="text" name="bcc" className={classes.input} onBlur={handleInputBlur} ref={bccInput} onKeyDown={handleContactKeyDown} onChange={handleInputChange} />
                  <CSSTransition in={showBccAutoMatchPanel} timeout={200} classNames="fade-slide" unmountOnExit>
                    <div className={classes.autoMatchPanel}>
                      {autoMatchList.map((item => <Button key={item.email} className={classes.autoMatchContactItem} fullWidth onMouseDown={() => handleAutoMatchItemClick(item, 'bcc')}><AutoMatchContactItem contactInfo={item} /></Button>))}
                      {isAutoMatchFetching ? <div className={classes.autoMatchFetching}><img src={Loading} alt="Loading" /><span>{intl.get('MAIN.MAIL.SEARCHING')}</span></div> : ''}
                      {noResultFound ? <div className={classes.noResultFound}><span>{intl.get('MAIN.MAIL.NO_RESULT_FOUND')}</span></div> : ''}
                    </div>
                  </CSSTransition>
                </div>
              </ClickAwayListener>
            </div>
          ) : ''}
          {/* 主题 */}
          <div className={classes.subject}>
            <Button variant="contained" color="primary" className={classes.labelButton} disableElevation>{intl.get('MAIN.MAIL.SUBJECT')}</Button>
            <input type="text" className={classes.input} onBlur={handleSujecttBlur} defaultValue={subject} />
          </div>
          {/* 已上传附件 */}
          {attachments.length !== 0 && <div className={classes.attachments}>
            <div className={classes.actionBar}>
              {intl.get('MAIN.MAIL.ATTACHMENT_NUMBER', { count: attachments.length })}
            </div>
            {attachments.map((item) => <div className={classes.attachmentItem} key={item.id}><ComposeAttachmentItem attachment={item} composeId={composeId} deleteAttachment={deleteAttachment} /></div>)}
          </div>}
        </div>
        {/* draft-js编辑器 */}
        {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
        {/* braft-editor编辑器 */}
        <div className={classes.editorContainer}>
          <BraftEditor value={editorState} onChange={handleEditorChange} controls={controls} fontSizes={fontSizes} className={classes.editor} controlBarClassName={classes.editorControlBar} contentClassName={classes.editorContent} />
        </div>
        {/* 正文编辑区 */}
        {/* <div className={classes.editArea} contentEditable ref={editArea} onInput={handleContentInput} suppressContentEditableWarning={true}>
          {quoteContent ? <div dangerouslySetInnerHTML={{ __html: quoteContent }} />
            : <div><br /><br /><br /></div>}
        </div> */}
      </div>
      {/* 发信按钮区 */}
      <div className={classes.composeAction}>
        {/* 发送 */}
        <Button variant="contained" color="primary" classes={{ root: classes.sendButton }} onClick={handleSend} disableElevation>{intl.get('MAIN.MAIL.SEND')}</Button>
        {/* 取消 */}
        <Button color="primary" classes={{ root: classes.cancelButton }} onClick={handleCancel}>{intl.get('MAIN.MAIL.CANCEL')}</Button>
        {/* 附件上传 */}
        <input className={classes.fileInput} id="icon-button-file" type="file" onChange={handleFileInputChange} multiple="multiple" />
        <label htmlFor="icon-button-file">
          <IconButton size="small" component="span">
            <CustomIcon iconName="icon-iconaccessorysmall1" size={28} />
          </IconButton>
        </label>
      </div>
    </div>
  )
}
