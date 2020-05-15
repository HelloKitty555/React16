import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Collapse from '@material-ui/core/Collapse'
import CustomIcon from 'components/customIcon/customIcon'
import folderIconMap from './folderIconMap'
import folderNameMap from './folderNameMap'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: props => theme.spacing(props.paddingLeft),
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingRight: '0px',
    height: '45px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  rootActive: {
    paddingLeft: props => theme.spacing(props.paddingLeft),
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingRight: '0px',
    height: '45px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.light
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '8px',
    maxWidth: '70%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowarp',
  },
  unreadNumber: {
    verticalAlign: 'super',
    marginRight: '12px'
  },
  folderIcon: {
    margin: '0 auto'
  },
  folderName: {
    fontSize: '12px',
    marginLeft: '5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowarp',
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
  const { fid } = useParams()
  const { onClick } = props
  const { folderInfo, paddingLeft } = props
  const [expand, setExpand] = useState(false)
  function handleClick(e) {
    setExpand(!expand)
    e.stopPropagation()
  }
  return (
    <React.Fragment>
      <ListItem button className={fid == folderInfo.id ? classes.rootActive : classes.root} onClick={() => { onClick(folderInfo.id) }} color="primary">
        <div className={classes.leftSide}>
          <CustomIcon iconName={folderIconMap[folderInfo.id] || 'icon-iconfolder'} size="24px" />
          <span className={classes.folderName}>{folderNameMap[folderInfo.id] || folderInfo.name}</span>
        </div>
        <div className={classes.rightSide}>
          {folderInfo.stats.unreadMessageCount ? <span className={classes.unreadNumber}>{folderInfo.stats.unreadMessageCount}</span> : ''}
          {folderInfo.children && (expand ? <span onClick={handleClick}><CustomIcon iconName="icon-icontop" /></span> : <span onClick={handleClick}><CustomIcon iconName="icon-icondown" /></span>)}
        </div>
      </ListItem>
      {folderInfo.children && (
        <Collapse in={expand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {folderInfo.children.map(folder => <FolderItem folderInfo={folder} key={folder.id} paddingLeft={paddingLeft + 2} onClick={onClick} />)}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  )
}
