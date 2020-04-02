import { combineReducers } from 'redux'
import { user } from './user/user_redux'
import { mail } from './mail/mail_redux'


export default combineReducers({
  user, mail
})
