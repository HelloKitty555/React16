import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '10px',
    height: '100%'
  },
  title: {
    margin: '26px 0',
  },
  info: {
    padding: '12px 0',
    display: 'flex'
  },
  contact: {
    marginLeft: '20px',
    flex: 1,
  },
  content: {
    marginTop: '20px',
    height: '50%'
  },
  attachment: {
    marginTop: '20px',
    height: '10%'
  }
}))
export default function SkeletonLoading() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Skeleton variant="rect" height={55} className={classes.title} />
      <div className={classes.info}>
        <Skeleton variant="circle" height={44} width={44} />
        <Skeleton variant="rect" height={44} className={classes.contact} />
      </div>
      <Skeleton variant="rect" className={classes.content} />
      <Skeleton variant="rect" className={classes.attachment} />
    </div>
  )
}