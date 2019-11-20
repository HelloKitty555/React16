import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from 'bundle-loader?lazy&name=login!containers/login/login'
import Main from 'bundle-loader?lazy&name=main!containers/main/main'
import Bundle from 'utils/bundle'
import { ThemeProvider} from '@material-ui/styles'
import { createMuiTheme,  responsiveFontSizes } from '@material-ui/core/styles'
import customeTheme from 'assets/theme/theme'
import 'typeface-roboto'

const Loading = function () {
  return <div>Loading...</div>
}

const createComponent = (component) => (props) => (
  <Bundle load={component}>
    {
      (Component) => Component ? <Component {...props} /> : <Loading />
    }
  </Bundle>
)


export default function App() {
  let theme = createMuiTheme(
    customeTheme
  )
  theme = responsiveFontSizes(theme)
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={createComponent(Main)} />
            <Route path="/main" component={createComponent(Main)} />
            <Route path="/login" component={createComponent(Login)} />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
