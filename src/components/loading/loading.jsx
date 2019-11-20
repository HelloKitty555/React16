import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSpring, animated } from 'react-spring'

const useStyles = makeStyles(() => ({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
}))

export default function Loading() {
  const classes = useStyles
  const props = useSpring({ to: [{opacity: 1, color: '#ffaaee'}, {opacity: 0, color: 'rgb(14,26,19)'}],
  from: {opacity: 0, color: 'red'} })
  return (
    <animated.div style={props}>ddddddddddd</animated.div>
  )
}
