import React from 'react'
import Grid from '@material-ui/core/Grid'
import Contact from 'components/contact/contact'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  label: {},
  value: {
    wordBreak: 'breakWord'
  },
  contact: {
    marginRight: '5px'
  }
}))
export default function ReadHeaderContact(props) {
  const { from, to, cc } = props
  const classes = useStyles()
  return (
    <React.Fragment>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item><Typography component="span" color="primary" variant="subtitle2">发件人</Typography></Grid>
        <Grid item xs className={classes.value} >{from.map(item => <Contact key={item.email} contactInfo={item} />)}</Grid>
      </Grid>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item><Typography component="span" color="primary" variant="subtitle2">收件人</Typography></Grid>
        <Grid item xs className={classes.value} ><Grid container spacing={1}>{to.map(item => <Grid item key={item.email}><Contact contactInfo={item} /></Grid>)}</Grid></Grid>
      </Grid>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item><Typography component="span" color="primary" variant="subtitle2">抄送人</Typography></Grid>
        <Grid item xs className={classes.value}>{cc.map(item => <Contact key={item.email} contactInfo={item} />)}</Grid>
      </Grid>
    </React.Fragment>
  )
}