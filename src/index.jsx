import { AppContainer as ReactHotLoader } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import intl from 'react-intl-universal'
import App from './app'
import store from './redux/store'
import './assets/iconfont/iconfont.css'
import './assets/styles/index.scss'
import './assets/styles/transition.scss'
import Cookie from 'js-cookie'
import { SnackbarProvider } from 'notistack'


function renderWithHotReload(RootElement) {
  ReactDOM.render(
    <ReactHotLoader>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} autoHideDuration={1500} anchorOrigin={{ vertical: 'top', horizontal: 'center', }} hideIconVariant>
          {RootElement}
        </SnackbarProvider>
      </Provider>
    </ReactHotLoader>,
    document.getElementById('root')
  )
}

const locales = {
  en_US: require('./i18n/en_US'), // eslint-disable-line global-require
  zh_CN: require('./i18n/zh_CN'), // eslint-disable-line global-require
  zh_TW: require('./i18n/zh_TW') // eslint-disable-line global-require
}
// 初始化
intl.init({
  currentLocale: 'zh_CN',
  locales
})
renderWithHotReload(<App />)

// 单点进入保存sid到cookie中
const sid = window.location.search.split('=')[1]
if (sid) {
  Cookie.set('Coremail.sid', sid)
}

// 模块热替换[HMR]（hot module replacement）
if (module.hot) {
  module.hot.accept('./app', () => {
    console.log('[HMR]:🔥🔥🔥热更新应用中...')
    const UpdateApp = require('./app').default // eslint-disable-line global-require
    renderWithHotReload(<UpdateApp />)
  })
}
