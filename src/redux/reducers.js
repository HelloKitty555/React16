import { combineReducers } from 'redux'
import { user } from './user/user_redux'
import { mail } from './mail/mail_redux'
import { addressBook } from './addressBook/addressBook_redux'
import { fileCenter } from './fileCenter/fileCenter_redux'


export default combineReducers({
  user, mail, addressBook, fileCenter
})
