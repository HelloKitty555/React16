const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// const backEndServer = 'http://lunkrcm05.rd.mt'
const backEndServer = 'http://mt1.icoremail.net'
// const backEndServer = 'http://cim.rd.mt'

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.jsx')
    ],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    }),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 8080,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/coremail/s': {
        target: backEndServer,
        changeOrigin: true,
        secure: false
      },
      '/coremail/common': {
        target: backEndServer,
        changeOrigin: true,
        secure: false
      },
      '/coremail/*.jsp': {
        target: backEndServer,
        changeOrigin: true,
        secure: false
      },
      '/coremail/cmcu_addon/*.jsp': {
        target: backEndServer,
        changeOrigin: true
      },
      '/coremail/bundle': {
        target: backEndServer,
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      components: path.join(__dirname, 'src/components'),
      containers: path.join(__dirname, 'src/containers'),
      utils: path.join(__dirname, 'src/utils'),
      network: path.join(__dirname, 'src/network'),
      _redux: path.join(__dirname, 'src/redux'),
      assets: path.join(__dirname, 'src/assets'),
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.jsx', '.json']
  }
}
