import React, { useState, useEffect, useRef } from 'react'
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
    maxHeight: '500px',
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
  editSection: {
    height: '90%',
    overflow: 'scroll',
  },
  contactArea: {
  },
  editArea: {
    paddingTop: '20px',
    outline: 'none'
  },
  toolArea: {
    borderTop: '1px solid rgba(0,0,0,0.1)',
    padding: '12px 0'
  },
  sendButton: {
    marginRight: '12px'
  },
}))
export default function Compose(props) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const confirm = useConfirm()
  const { action, mid, fid } = useParams()
  const [send, setSend] = useState(false) // 是否发信
  const [composeId, setComposeId] = useState('') // 写信id
  const [inputValue, setInputValue] = useState('') // 输入值
  const [account, setAccount] = useState('') // 发信人
  const [accountList, setAccountList] = useState([]) // 发信人列表
  const [to, setTo] = useState([]) // 收件人
  const [cc, setCc] = useState([]) // 抄送
  const [bcc, setBcc] = useState([]) // 密送
  const [subject, setSubject] = useState('') // 主题
  const [content, setContent] = useState('') // 内容
  const [quoteContent, setQuoteContent] = useState('') // 引用内容
  const [attachments, setAttachments] = useState([]) // 附件
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
  let initContent = '<br/><br/><br/>'
  const toInput = useRef(null)
  const ccInput = useRef(null)
  const bccInput = useRef(null)
  const editArea = useRef(null)
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
      const validTo = []
      const validCc = []
      const validBcc = []
      to.forEach((item) => { item.valid && validTo.push(item.email) })
      cc.forEach((item) => { item.valid && validCc.push(item.email) })
      bcc.forEach((item) => { item.valid && validBcc.push(item.email) })
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
          content,
          attachments
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
    const editContent = editArea.current.innerHTML
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
      // setOpenSubjectDialog(true)
    } else {
      setContent(editContent)
      setSend(true)
    }
  }
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
  return (
    <div className={classes.container}>
      <div className={classes.editSection}>
        <div className={classes.contactArea}>
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
        </div>
        {/* 正文编辑区 */}
        <div className={classes.editArea} contentEditable ref={editArea} onInput={handleContentInput} suppressContentEditableWarning={true}>
          {quoteContent ? <div dangerouslySetInnerHTML={{ __html: quoteContent }} />
            : <div><br /><br /><br /></div>}
        </div>
      </div>
      {/* 发信按钮区 */}
      <div className={classes.toolArea}>
        <Button variant="contained" color="primary" classes={{ root: classes.sendButton }} onClick={handleSend} disableElevation>{intl.get('MAIN.MAIL.SEND')}</Button>
        <Button color="primary" classes={{ root: classes.cancelButton }} onClick={handleCancel}>{intl.get('MAIN.MAIL.CANCEL')}</Button>
      </div>
    </div>
  )
}
