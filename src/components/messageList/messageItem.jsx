import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import UserAvatar from 'components/userAvatar/userAvatar'
import ListItem from '@material-ui/core/ListItem'
import parse from 'utils/email'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
  },
  activeHighLightBar: {
    width: '3px',
    height: '100%',
    backgroundColor: theme.palette.primary.main
  },
  sender: {
    fontSize: '14px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontWeight: props => (props.read ? 'normal' : 'bolder')
  },
  subject: {
    fontSize: '14px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontWeight: props => (props.read ? 'normal' : 'bolder')
  },
  summary: {
    fontSize: '14px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontWeight: props => (props.read ? 'normal' : 'bolder')
  }
}))

export default function MessageItem(props) {
  const { message } = props
  const classes = useStyles({read: message.flags.read })
  const fromParseResult = parse(message.from)
  const activeReadMid = useSelector(state => state.mail.activeReadMid )
  return (
    <ListItem button className={classes.root}>
      <Grid container wrap="nowrap" spacing={2}>
        {activeReadMid === message.id ? <Grid item><div className={classes.activeHighLightBar} /></Grid> : ''}
        <Grid item>
          <UserAvatar userInfo={{ uid: fromParseResult[0].email, name: fromParseResult[0].name }} size="40px" />
        </Grid>
        <Grid item xs zeroMinWidth>
          <div className={classes.sender}>
            {fromParseResult[0].name || fromParseResult[0].email}
          </div>
          <div className={classes.subject}>
            {message.subject}
          </div>
          <div className={classes.summary}>
            {message.summary}
          </div>
        </Grid>
      </Grid>
    </ListItem>
  )
}
