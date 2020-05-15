import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import 'braft-editor/dist/index.css'

const useStyles = makeStyles(theme => ({
  content: {
    '& table': {
      width: 'auto!important'
    },
    '& img':{
      maxWidth: '100%'
    }
  }
}))
export default function ReadContent(props) {
  const classes = useStyles()
  const contentRef = useRef(null)
  const { mailContent } = props
  useEffect(() => {
    const baseNodeList = contentRef.current.getElementsByTagName('base')
    if (baseNodeList.length !== 0) {
      for (let i = 0; i < baseNodeList.length; i++) {
        baseNodeList[i].remove()
      }
    }
  }, [])
  return (
    <div className={classes.content} ref={contentRef} dangerouslySetInnerHTML={{ __html: mailContent }} />
  )
}
