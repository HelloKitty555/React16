import React from 'react'
import Contact from 'components/contact/contact'
import { makeStyles } from '@material-ui/core/styles'
import intl from 'react-intl-universal'

const useStyles = makeStyles((theme) => ({
  value: {
    wordBreak: 'breakWord'
  },
  container: {

  },
  row: {
    display: 'flex',
    marginBottom: '3px'
  },
  contacts: {

  },
  label: {
    color: theme.palette.text.secondary,
    marginRight: '8px',
    wordBreak: 'keep-all'
  },
  contact: {
    marginRight: '10px',
    color: theme.palette.text.primary
  }
}))
export default function ReadHeaderContact(props) {
  const { from, to, cc } = props
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <span className={classes.label}>{intl.get('MAIN.MAIL.FROM')}</span>
        <div className={classes.contacts}>{from.map(item => <span key={item.email} className={classes.contact}><Contact contactInfo={item} /></span>)}</div>
      </div>
      <div className={classes.row}>
        <span className={classes.label}>{intl.get('MAIN.MAIL.TO')}</span>
        <div className={classes.contacts}>{to.map(item => <span key={item.email} className={classes.contact}><Contact contactInfo={item} /></span>)}</div>
      </div>
      <div className={classes.row}>
        <span className={classes.label}>{intl.get('MAIN.MAIL.CC')}</span>
        <div className={classes.contacts}>{cc.map(item => <span key={item.email} className={classes.contact}><Contact contactInfo={item} /></span>)}</div>
      </div>
    </div>
  )
}