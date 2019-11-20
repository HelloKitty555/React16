import React, { useState, useEffect, useRef } from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  pullDownTip: {
    height: '40px',
    lineHeight: '40px',
    position: 'absolute',
    top: '-40px',
    left: '0',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}))

export default function ScrollView(props) {
  const classes = useStyles()
  const {click, scrollX, scrollY, scrollbar, mouseWheel, onPullDownRefresh, onPullUpLoad, children, svHeight, data} = props
  const [wrapper, setWrapper] = useState('')
  const [PullDownTip, setPullDownTip] = useState('')
  const [fetching, setFetching] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (wrapper) {
      setFetching(false)
      setPullDownTip('下拉以刷新')
      wrapper.finishPullDown()
      wrapper.finishPullUp()
      wrapper.refresh()
    }
  }, [data])

  useEffect(() => {
    setTimeout(() => {
      initScrollView()
    }, 20)
  }, [])

  // 初始化scrollView
  function initScrollView() {
    let pullDownRefresh = false
    let pullUpLoad = false
    if (onPullDownRefresh) {
      pullDownRefresh = true
    }
    if (onPullUpLoad) {
      pullUpLoad = true
    }
    const bscrollConfig = {
      momentum: true,
      probeType: 1,
      scrollX: scrollX,
      scrollY: scrollY,
      scrollbar: scrollbar,
      mouseWheel: mouseWheel,
      click: click,
      pullDownRefresh: pullDownRefresh,
      pullUpLoad: pullUpLoad
    }
    const wrapper = new BScroll(wrapperRef.current, bscrollConfig)
    setWrapper(wrapper)
    if (onPullDownRefresh) {
      wrapper.on('touchEnd', (pos) => {
        if (pos.y > 100) {
          setFetching(true)
          setPullDownTip('加载中...')
          onPullDownRefresh()
        }
      })
    }
    if (onPullUpLoad) {
      wrapper.on('pullingUp', onPullUpLoad)
    }
  }

  return (
    <React.Fragment>
      <div className="wrapper" style={{ overflow: 'hidden', position: 'relative', height: svHeight }} ref={wrapperRef}>
        <div className="content">
          <div>{children}</div>
          <div className={classes.pullDownTip}>
            <span>{PullDownTip}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
ScrollView.propTypes = {
  click: PropTypes.bool,
  scrollX: PropTypes.bool,
  scrollY: PropTypes.bool,
  scrollbar: PropTypes.bool,
  mouseWheel: PropTypes.bool,
  onPullDownRefresh: PropTypes.func,
  onPullUpLoad: PropTypes.func,
  svHeight: PropTypes.string,
}
ScrollView.defaultProps = {
  click: false,
  scrollX: false,
  scrollY: true,
  scrollbar: true,
  mouseWheel: true,
  onPullDownRefresh: null,
  onPullUpLoad: null,
  svHeight: '0px'
}
