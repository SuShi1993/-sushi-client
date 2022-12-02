const Merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const base = require('./webpack.base')

module.exports = Merge.merge(base, {
  entry: {
    // 入口指向 `entry-client.js` 文件
    client: path.join(__dirname, './src/entry-client.jsx')
  },
  output: {
    filename: 'index.js',
    publicPath: '/'
  },
  module: {
    rules: [{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }]
  },
  plugins: [
    // 这里使用 webpack-manifest-plugin 记录产物分布情况 方便server.js调用
    new WebpackManifestPlugin({ fileName: 'manifest-client.json' }),
    new MiniCssExtractPlugin({
      filename: 'index.[contenthash].css'
    }),
    // 自动生成HTML文件内容
    new HtmlWebpackPlugin({
      templateContent: `
    <!DOCTYPE html>
    <html>
    <head>
  <meta charset="utf-8">
  <title>Webpack App</title>
    </head>
    <body>
  <div id="app" />
    </body>
    </html>
    `
    })
  ]
})
