import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function Contact(props) {
  const { contactInfo } = props
  return (
    <Typography component="span" color="primary" variant="subtitle2">
      {contactInfo.name || contactInfo.email}
    </Typography>
  )
}
