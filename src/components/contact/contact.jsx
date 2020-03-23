import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  text: {
  }
}))

export default function Contact(props) {
  const { contactInfo } = props
  const classes = useStyles()
  return (
    <span className={classes.text}>{contactInfo.name || contactInfo.email}</span>
  )
}
