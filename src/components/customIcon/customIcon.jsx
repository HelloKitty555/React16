import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  customIcon: {
    fontSize: props => (props.size ? props.size : theme.customConfig.iconSize),
    height: '1em',
    lineHeight: '1em'
  }
}))
export default function CustomIcon(props) {
  const classes = useStyles(props)
  const {iconName} = props
  return (
    <i className={`iconfont ${iconName} ${classes.customIcon}`} />
  )
}
