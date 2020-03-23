import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import UserAvatar from 'components/userAvatar/userAvatar'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  },
  avatar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '10px'
  },
  name: {
  },
  email: {

  }

}))

export default function AutoMatchContactItem(props) {
  const { contactInfo } = props
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.avatar}><UserAvatar userInfo={{ uid: contactInfo.email, name: contactInfo.true_name }} size="35px" /></div>
      <div className={classes.info}>
        <div className={classes.name}>{contactInfo.true_name}</div>
        <div className={classes.email}>{contactInfo.email}</div>
      </div>
    </div>
  )
}
