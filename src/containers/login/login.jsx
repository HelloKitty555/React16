import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import wmsvrApi from 'network/api'
import { authSuccess } from '_redux/user/user_redux'
import './login.css'
import Cookie from 'js-cookie'

@connect(
  state => state.user,
  { authSuccess }
)
class Login extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      uid: '',
      password: '',
      showPassword: false
    }
    this.onChange = this.onChange.bind(this)
    this.hanldeLogin = this.hanldeLogin.bind(this)
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
  }
  componentDidMount() {
  }
  // 输入框change事件监听
  onChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  // 密码显示隐藏点击操作
  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }
  // 处理点击登录
  hanldeLogin() {
    const self = this
    const loginParams = {
      uid: this.state.uid,
      password: this.state.password
    }
    wmsvrApi.login(loginParams).then(function(data) {
      if (data && data.code === 'S_OK') {
        Cookie.set('Coremail.sid', data.var.sid)
        self.props.history.push('/main')
      }
    }, function() {
      
    })
  }

  render() {
    return (
      <div className='login'>
        <div className='logo'>HXPHONE</div>
        <div className='login-form'>
        <TextField
          id="loginInput"
          name='uid'
          label={intl.get('LOGIN.ACCOUNT')}
          fullWidth
          onChange={this.onChange}
          margin="dense"
          className='login-input'
          type='text'
        />
        <TextField
          id="passwordInput"
          name='password'
          label={intl.get('LOGIN.PASSWORD')}
          fullWidth
          onChange={this.onChange}
          margin="dense"
          className='login-password'
          type={this.state.showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" onClick={this.hanldeLogin}>{intl.get('LOGIN.LOGIN')}</Button>
        </div>
      </div>
    )
  }
}

export default Login
