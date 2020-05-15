import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import { useSelector, useDispatch } from 'react-redux'
import FolderItem from 'components/folderList/folderItem'
import wmsvrApi from 'network/api'
import SkeletonLoading from './skeletonLoading'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
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
  const [folderList, setFolderList] = useState([])
  const {handleFolderItemClick} = props
  const [isFetching, setIsFetching] = useState(false)
  useEffect(() => {
    setIsFetching(true)
    wmsvrApi.getAllFolders({ stats: true }).then(data => {
      if (data && data.code === 'S_OK') {
        setFolderList(data.var)
      }
    }, error => {
      console.log(error)
    }).finally(() => {
      setIsFetching(false)
    })
  }, [])
  return (
    <List
      component="nav"
      className={classes.root}
    >
      {folderList.map((folder) => <FolderItem folderInfo={folder} key={folder.id} paddingLeft={0} onClick={handleFolderItemClick}/>)}
      { isFetching ? <SkeletonLoading /> : ''}
    </List>
  )
}
