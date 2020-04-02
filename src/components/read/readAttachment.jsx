import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import intl from 'react-intl-universal'
import AttachmentItem from 'components/AttachmentItem/attachmentItem'

const useStyles = makeStyles(theme => ({
  attachments: {
    marginTop: '30px',
    paddingTop: '15px',
    borderTop: '1px solid rgb(237,235,233)'
  },
  actionBar: {
    paddingBottom: '10px'
  },
  attachmentItem: {
    margin: '0 20px 15px 0',
    display: 'inline-block',
  }
}))
export default function ReadAttachment(props) {
  const classes = useStyles()
  const { attachments, mid } = props
  return (
    <div className={classes.attachments}>
      <div className={classes.actionBar}>
        {intl.get('MAIN.MAIL.ATTACHMENT_NUMBER', { count: attachments.length })}
      </div>
      {attachments.map((item) => <div className={classes.attachmentItem} key={item.id}><AttachmentItem attachment={item} mid={mid} /></div>)}
    </div>
  )
}