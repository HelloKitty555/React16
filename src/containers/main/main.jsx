import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import { Route, Switch, useHistory } from 'react-router-dom'
import Mail from 'components/mail/mail'
import Read from 'components/read/read'
import UserAvatar from 'components/userAvatar/userAvatar'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import wmsvrApi from 'network/api'

const drawerWidth = 280

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  appBar: {
  },
  popover: {
    height: '380px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  info: {
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: '24px',
    color: '#000'
  },
  grow: {
    flexGrow: '1'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  name: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    fontSize: '16px',
    marginTop: '10px',
    fontWeight: 'bolder'
  },
  email: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    fontSize: '14px'
  },
  personalSetting: {
    padding: '12px',
    textAlign: 'center'
  },
  logout: {
    padding: '12px',
    textAlign: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    overflow: 'hidden',
    height: '100%',
  },
  content_mobile: {
    flexGrow: 1,
    overflow: 'hidden',
    height: '100%'
  }
}))
//  height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
//  marginTop: theme.mixins.toolbar.minHeight
export default function Main(props) {
  const classes = useStyles()
  const history = useHistory()
  const [openDrawer, setOpenDrawer] = useState(false)
  const userAttr = JSON.parse(localStorage.getItem('userAttr')) // 用户属性
  const [anchorEl, setAnchorEl] = React.useState(null)
  function handleDrawerToggle() {
    setOpenDrawer(!openDrawer)
  }
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  function handleLogout() {
    wmsvrApi.logout().then((data) => {
      if (data.code === 'S_OK') {
        history.push('/login')
      }
    }, (error) => {
      console.log(error)
    })
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['信箱', '通讯录', '网盘', '日程'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      {/* <AppBar position="fixed" className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <span className={classes.title}>coremail</span>
            <div className={classes.grow}>coremail</div>
            <span onClick={handleClick}><UserAvatar userInfo={{ uid: userAttr.email, name: userAttr.true_name }} size="40px" /></span>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className={classes.popover}>
                <div className={classes.info}>
                  <div className={classes.wrapper}>
                    <UserAvatar userInfo={{ uid: userAttr.email, name: userAttr.true_name }} size="80px" />
                    <div className={classes.name}>{userAttr.true_name}</div>
                    <div className={classes.email}>{userAttr.email}</div>
                  </div>
                </div>
                <div className={classes.personalSetting}>
                  <Button variant="contained" color="primary" disableElevation>
                    个人设置
                  </Button>
                </div>
                <div className={classes.logout}>
                  <Button variant="contained" color="primary" disableElevation onClick={handleLogout}>
                    退出登录
                  </Button>
                </div>
              </div>
            </Popover>
          </Toolbar>
        </AppBar> */}
      <main className={classes.content}>
        <Switch>
          <Route path="/main/mail/:fid" component={Mail} />
        </Switch>
      </main>
      {/* 抽屉 */}
      {/* <Drawer open={openDrawer} onClose={handleDrawerToggle} classes={{ paper: classes.drawerPaper }}>
        {drawer}
      </Drawer> */}
    </div>
  )
}
