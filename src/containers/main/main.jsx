import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import AddressBook from 'components/addressBook/addressBook'
import Schedule from 'components/schedule/schedule'
import Setting from 'components/setting/setting'
import FileCenter from 'components/fileCenter/fileCenter'
import MailFolder from 'components/mailFolder/mailfolder'
import Read from 'components/read/read'
import Paper from '@material-ui/core/Paper'

const drawerWidth = 280

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  appBar: {
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
    height: '100%'
  },
}))

export default function Main(props) {
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  const [openDrawer, setOpenDrawer] = React.useState(false)
  function handleDrawerToggle() {
    setOpenDrawer(!openDrawer)
  }

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
      <CssBaseline />
      {/* 应用栏 */}
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Coremail
          </Typography>
        </Toolbar>
      </AppBar>
      {/* 抽屉 */}
      <Drawer open={openDrawer} onClose={handleDrawerToggle} classes={{ paper: classes.drawerPaper }}>
        {drawer}
      </Drawer>
      {/* 内容区 */}
      <main className={classes.content}>
        <Paper>
          <div className={classes.toolbar} />
          <div>
            <Switch>
              <Route exact path="/main" component={MailFolder} />
              <Route path="/main/mailFolder" component={MailFolder} />
              <Route path="/main/addressBook" component={AddressBook} />
              <Route path="/main/fileCenter" component={FileCenter} />
              <Route path="/main/schedule" component={Schedule} />
              <Route path="/main/setting" component={Setting} />
              <Route path="/main/read/:fid/:mid" component={Read} />
            </Switch>
          </div>
        </Paper>
      </main>

    </div>
  )
}

Main.propTypes = {
  container: PropTypes.object,
}
