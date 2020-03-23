import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from 'bundle-loader?lazy&name=login!containers/login/login'
import Main from 'bundle-loader?lazy&name=main!containers/main/main'
import Bundle from 'utils/bundle'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import customeTheme from 'assets/theme/theme'
import 'typeface-roboto'
import InitLoading from 'components/initLoading/initLoading'
import { makeStyles } from '@material-ui/core/styles'
import { ConfirmProvider } from 'material-ui-confirm'

const createComponent = (component) => (props) => (
  <Bundle load={component}>
    {
      (Component) => Component ? <Component {...props} /> : <InitLoading />
    }
  </Bundle>
)


const useStyles = makeStyles(() => ({
  container: {
    height: '100%'
  }
}))

export default function App() {
  const classes = useStyles()
  let theme = createMuiTheme(
    customeTheme
  )
  window.loggedIn = true
  theme = responsiveFontSizes(theme)
  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <HashRouter>
          <div className={classes.container}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/login" component={createComponent(Login)} />
              <Route path="/main" component={createComponent(Main)} />
            </Switch>
          </div>
        </HashRouter>
      </ConfirmProvider>
    </ThemeProvider>
  )
}
