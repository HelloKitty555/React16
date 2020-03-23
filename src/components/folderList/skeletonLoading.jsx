import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  skeletonItemContainer: {
    display: 'flex',
    padding: '5px 10px'
  },
  skeletonItem: {
    marginBottom: '4px',
    flex: 1,
  }
}))
export default function SkeletonLoading() {
  const classes = useStyles()
  const numberList = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <React.Fragment>
      {numberList.map((skeletonItem) =>
        <div className={classes.skeletonItemContainer} key={skeletonItem}>
          <Skeleton variant="rect" height={30} className={classes.skeletonItem} />
        </div>)
      }
    </React.Fragment>
  )
}
