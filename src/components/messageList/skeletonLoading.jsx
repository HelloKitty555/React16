import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  skeletonItemContainer: {
    padding: '10px',
    display: 'flex',
  },
  left: {
    padding: '8px'
  },
  right: {
    padding: '8px',
    flex: 1,
  },
  infoItem: {
    marginBottom: '4px',
  }
}))
export default function SkeletonLoading() {
  const classes = useStyles()
  const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  return (
    <React.Fragment>
      {numberList.map((skeletonItem) =>
        <div className={classes.skeletonItemContainer} key={skeletonItem}>
          <div className={classes.left}>
            <Skeleton variant="circle" width={40} height={40} /></div>
          <div className={classes.right}>
            <Skeleton variant="rect" height={18} className={classes.infoItem} />
            <Skeleton variant="rect" height={18} className={classes.infoItem} />
          </div>
        </div>)
      }
    </React.Fragment>
  )
}
