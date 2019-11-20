import React from 'react'
import List from '@material-ui/core/List'
import MessageItem from 'components/messageList/messageItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper
  }
}))
export default function MessageList(props) {
  const {messageList, handleMessageClick} = props
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {messageList.map((message) => <MessageItem key={message.id} message={message} onClick={handleMessageClick(message.id)} />)}
    </List>
  )
}
