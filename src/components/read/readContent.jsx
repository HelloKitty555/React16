import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    wordBreak: 'breakAll',
    '& table': {
      width: 'auto!important'
    }
  }
}))
export default function ReadContent(props) {
  const classes = useStyles()
  const { mailContent } = props
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.wrapper}><div className={classes.content} dangerouslySetInnerHTML={{ __html: mailContent }}/></div>
    </React.Fragment>
  )
}
