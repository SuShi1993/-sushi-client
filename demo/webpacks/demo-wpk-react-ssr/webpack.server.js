const Merge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base')

module.exports = Merge.merge(base, {
  entry: {
    server: path.join(__dirname, './src/entry-server.jsx')
  },
  target: 'node',
  output: {
    // 打包后会在node环境调用 所以将模块化语句转译为commonjs
    libraryTarget: 'commonjs2',
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        // 在 SSR 中，通常由客户端代码提前做好 CSS 资源编译，
        // 对服务端而言只需要支持输出构建后的 CSS 文件路径即可，
        // 不需要关注 CSS 具体内容，因此通常会用一个简单的自定义 Loader 跳过 CSS 资源，如：
        loader: './loader/removeCssLoader'
      }
    ]
  }
})
