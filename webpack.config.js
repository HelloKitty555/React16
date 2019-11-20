const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: 'cheap-module-sourece-map',
  entry: {
    app: [
      path.join(__dirname, 'src/index.js')
    ],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }, {
        test: /\.(png|jpg|gif)$/,
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
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
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
    }
  }
}
