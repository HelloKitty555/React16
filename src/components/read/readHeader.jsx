import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import UserAvatar from 'components/userAvatar/userAvatar'
import parse from 'utils/email'
import ReadHeaderContact from 'components/read/readHeaderContact'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '10px'
  },
  subject: {
    padding: '10px 0'
  },
  contact: {
    marginTop: '10px'
  }
}))
export default function ReadHeader(props) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const { headerInfo } = props
  let fromName = ''
  let fromEmail = ''
  let fromParseResult = []
  let toParseResult = []
  let ccParseResult = []
  if (headerInfo.from) {
    fromParseResult = parse(headerInfo.from)
    toParseResult = parse(headerInfo.to)
    ccParseResult = parse(headerInfo.cc)
    fromName = fromParseResult[0].name
    fromEmail = fromParseResult[0].email
  }

  function handleExpandClick() {
    setExpanded(v => !v)
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} className={classes.container}>
        <Grid container>
          <Grid item xs={12}><Typography variant="h4" className={classes.subject}>{headerInfo.subject}</Typography></Grid>
          <Grid item xs={12}>
            <Grid container wrap="nowrap" spacing={3}>
              <Grid item>
                <UserAvatar userInfo={{ uid: fromEmail, name: fromName }} size="35px" />
              </Grid>
              <Grid item xs zeroMinWidth onClick={handleExpandClick}>
                <Typography variant="subtitle2" component="div" noWrap>
                  {fromName || fromEmail}
                </Typography>
                <Typography variant="subtitle2" component="div" noWrap>
                  发送至我
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <div className={classes.contact}><ReadHeaderContact from={fromParseResult} to={toParseResult} cc={ccParseResult} /></div>
            </Collapse>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
