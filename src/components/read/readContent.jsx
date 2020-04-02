import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import CssBaseline from '@material-ui/core/CssBaseline'
import 'braft-editor/dist/index.css'
// import BraftEditor from 'braft-editor'

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
  // const [editorState, setEditorState] = useState(BraftEditor.createEditorState(mailContent))
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
    // <div>
    //   <BraftEditor value={editorState}  />
    // </div>
  )
}
