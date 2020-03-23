import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../assets/img/logo.png'
import Loading from '../../assets/img/loading.svg'

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    width: '60px'
  }
}))

export default function InitLoading() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <img className={classes.loading} src={Loading} alt="loading" />
    </div>
  )
}
