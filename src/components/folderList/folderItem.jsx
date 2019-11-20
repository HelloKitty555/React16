import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import SendIcon from '@material-ui/icons/Send'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import CustomIcon from 'components/customIcon/customIcon'
import folderIconMap from './folderIconMap'
import { useSelector, useDispatch } from 'react-redux'
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: props => theme.spacing(props.paddingLeft),
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingRight: '0px',
    height: '45px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center'
  },
  folderIcon: {
    margin: '0 auto'
  },
  folderName: {
    fontSize: '14px',
    marginLeft: '10px'
  },
  folderNameActive: {
    fontSize: '14px',
    marginLeft: '10px',
    color: theme.palette.primary.main
  },
  listItemTextRoot: {
    marginLeft: '10px',
    marginRight: '50px'
  },
  listItemTextPrimary: {
    fontSize: '14px',
  }
}))
export default function FolderItem(props) {
  const classes = useStyles(props)
  const { onClick } = props
  const { folderInfo, paddingLeft } = props
  const [expand, setExpand] = useState(false)
  const activeFolderFid = useSelector(state => state.mail.activeFolderFid)
  function handleClick(e) {
    setExpand(!expand)
    e.stopPropagation()
  }
  return (
    <React.Fragment>
      <ListItem button className={classes.root} onClick={() => {onClick(folderInfo.id)}}>
        <div className={classes.leftSide}><CustomIcon iconName={folderIconMap[folderInfo.id] || 'icon-iconfolder'} size="26px" />
        <span className={activeFolderFid == folderInfo.id ? classes.folderNameActive : classes.folderName}>{folderInfo.name}</span></div>
        {folderInfo.children && (expand ? <span onClick={handleClick}><CustomIcon iconName="icon-icontop" /></span> : <span onClick={handleClick}><CustomIcon iconName="icon-icondown" /></span>)}
      </ListItem>
      {folderInfo.children && (
        <Collapse in={expand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {folderInfo.children.map(folder => <FolderItem folderInfo={folder} key={folder.id} paddingLeft={paddingLeft + 2} onClick={onClick}/>)}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  )
}
