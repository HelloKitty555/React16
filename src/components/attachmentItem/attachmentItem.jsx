import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getExtName } from 'utils/attachment'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '200px',
    padding: '8px 12px',
    backgroundColor: 'rgb(239,239,239)',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowarp',
  },
  fileType: {
    textTransform: 'uppercase'
  },
  fileInfo: {
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  fileName: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  fileSize: {
    color: '#605e5c'
  }
}))

export default function AttachmentItem(props) {
  const { attachment } = props
  const classes = useStyles()
  const extName = getExtName(attachment.filename)
  const fileName = attachment.filename
  return (
    <div className={classes.container}>
      <div className={classes.fileType}>{extName}</div>
      <div className={classes.fileInfo}>
        <div className={classes.fileName}>{fileName}</div>
        <div className={classes.fileSize}>测试</div>
      </div>
    </div>
  )
}
