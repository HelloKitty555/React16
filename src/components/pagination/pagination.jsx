import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import CustomIcon from 'components/customIcon/customIcon'

const useStyls = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

export default function Pagination(props) {
  const classes = useStyls()
  return (
    <Grid container justify="center">
      <Grid item>
        <IconButton color="primary" className={classes.button}>
          <CustomIcon iconName="icon-iconright" />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton color="primary" className={classes.button}>
          <CustomIcon iconName="icon-iconleft" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
