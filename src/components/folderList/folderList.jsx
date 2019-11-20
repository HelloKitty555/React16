import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useSelector, useDispatch } from 'react-redux'
import FolderItem from 'components/folderList/folderItem'
import { getAllFolders} from '_redux/mail/mail_redux'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

export default function NestedList(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)
  const folders = useSelector(state => state.mail.folders.data)
  const {handleFolderItemClick} = props
  useEffect(() => {
    dispatch(getAllFolders())
  }, [])
  return (
    <List
      component="nav"
      className={classes.root}
    >
      {folders.map((folder) => <FolderItem folderInfo={folder} key={folder.id} paddingLeft={0} onClick={handleFolderItemClick}/>)}
    </List>
  )
}
