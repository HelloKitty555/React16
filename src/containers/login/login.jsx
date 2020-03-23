import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import intl from 'react-intl-universal'
import wmsvrApi from 'network/api'
import { userAttr } from '_redux/user/user_redux'
import Cookie from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import CustomIcon from 'components/customIcon/customIcon'
import logo from '../../assets/img/logo.png'

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  logo: {
    width: '240px',
  },
  form: {
    // padding: '0 2px'
  },
  login: {
    [theme.breakpoints.up('sm')]: {
      width: '480px',
      padding: '40px',
      borderRadius: '10px',
      background: '#fff'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: '0 12px'
    },
  },
  account: {
    marginBottom: '15px',
  },
  password: {
    marginBottom: '30px',
  },
  label: {
    fontSize: '20px',
    fontWeight: 'bolder',
    marginBottom: '8px',
    letterSpacing: '3px'
  },
  formItem: {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid grey',
    padding: '8px 0px 8px 12px',
    '& > input': {
      height: '100%',
      flex: '1',
      border: 'none',
      outline: 'none',
      fontSize: '16px'
    },
  },
  loginButton: {
    height: '50px',
    fontSize: '22px'
  }
}))

export default function Login(props) {
  const classes = useStyles()
  const { history } = props
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState(false)
  const dispatch = useDispatch()
  // 登录
  useEffect(() => {
    if (login) {
      const options = {
        uid,
        password,
        supportDynamicPwd: true,
        supportSms: true
      }
      wmsvrApi.login(options).then((data) => {
        if (data.code === 'S_OK') {
          Cookie.set('Coremail.sid', data.var.sid)
          history.push('/main/mail/1')
        }
      }, (error) => {
        setLogin(false)
        console.log(error)
      }).finally(() => {
        wmsvrApi.getAttrs({
          attrIds: ['email', 'primary_email', 'pref_quota', 'true_name', 'nick_name', 'time_zone', 'perm_func_netfolder'],
          optionalAttrIds: ['$ajc']
        }).then((data) => {
          localStorage.setItem('userAttr', JSON.stringify(data.var))
          dispatch(userAttr(data.var))
        }, (error) => {
          console.log(error)
        })
      })
    }
  }, [login])
  // 输入框change事件监听
  function handleInputChange(event) {
    switch (event.target.name) {
      case 'uid':
        setUid(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
        break
      default:
        break
    }
  }
  // 显示或隐藏密码
  function handleShowPassword() {
    setShowPassword(!showPassword)
  }
  // 清除输入内容
  function handleInputClear(type) {
    switch (type) {
      case 'uid':
        setUid('')
        break
      case 'password':
        setPassword('')
        break
      default:
        break
    }
  }
  // 登录
  function handleLogin() {
    console.log('hello world')
    setLogin(true)
  }
  return (
    <div className={classes.container}>
      <div className={classes.login}>
        <div className={classes.title}><img className={classes.logo} src={logo} alt="logo" /></div>
        <div className={classes.form}>
          <div className={classes.account}>
            <div className={classes.label}>{intl.get('LOGIN.ACCOUNT')}</div>
            <div className={classes.formItem}>
              <input name="uid" onChange={handleInputChange} value={uid} />
              {uid ? <IconButton size="small" onClick={() => handleInputClear('uid')}><CustomIcon iconName="icon-icon_del" size="36px" /></IconButton> : ''}
            </div>
          </div>
          <div className={classes.password}>
            <div className={classes.label}>{intl.get('LOGIN.PASSWORD')}</div>
            <div className={classes.formItem}>
              <input name="password" onChange={handleInputChange} type={showPassword ? 'text' : 'password'} value={password} />
              {password ? <IconButton size="small" onClick={() => handleInputClear('password')}><CustomIcon iconName="icon-icon_del" size="36px" /></IconButton> : ''}
              <IconButton size="small" onClick={handleShowPassword}><CustomIcon iconName={showPassword ? "icon-iconeye" : "icon-iconeyedisable"} size="36px" /></IconButton>
            </div>
          </div>
          <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleLogin} size="large" className={classes.loginButton}>{intl.get('LOGIN.LOGIN')}</Button>
        </div>
      </div>
    </div>
  )
}
