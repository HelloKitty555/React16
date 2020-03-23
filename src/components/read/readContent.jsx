import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles(theme => ({
  content: {
    // wordBreak: 'breakAll',
    // wordWrap: 'break-word',
    // transform: 'translateZ(0)',
    // transformOrigin: '0 0',
    // overflow: 'scrollY',
    // webkitOverflowScrolling: 'touch',
    // touchAction: 'auto',
    // userSelect: 'text',
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
