const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = {
  mode: 'development',
  devtool: false,
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        RemoteOrder: 'order@http://localhost:8081/dist/remoteEntry.js'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom']
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom']
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    port: 8082,
    hot: true,
    open: true
  }
}
