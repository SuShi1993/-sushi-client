## webpack构建NPM库时需要注意
1. 正确导出模块内容
2. 不要将第三方包打包进产物中，以免与业务方环境冲突
3. 将CSS抽离为独立文件，方便用户自行决定用法
4. 始终生成Sourcemap文件，方便调试

## 开建
1. 
```shell
mkdir demo-wpk-third && cd demo-wpk-third
pnpm init
```
2.
```shell
pnpm add -D webpack webpack-cli
```
3.
```shell
mkdir src
touch src/index.js
```
4.
```text
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  }
}
```
* 上述配置会将代码编译成一个 IIFE 函数，但这并不适用于 NPM 库，我们需要修改 output.library 配置，以适当方式导出模块内容：
```text
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    library: {
      name: '_',
      type: 'umd'
    }
  }
}
```
* output.library.name：用于定义模块名称，在浏览器环境下使用 script 加载该库时，可直接使用这个名字调用模块，例如：
```text
// Webpack 会将模块直接挂载到全局对象上
window._.add(1,2)
```
* output.library.type：用于编译产物的模块化方案，可选值有：commonjs、umd、module、jsonp 等，通常选用兼容性更强的 umd 方案
* UMD(Universal Module Definition)模式，这种形态会在 NPM 库启动时判断运行环境，自动选择当前适用的模块化方案：
```js
// ES Module
import {add} from 'test-lib'
// CommonJS
const {add} = require('test-lib')
// HTML
<script>
  // Webpack 会将模块直接挂载到全局对象上
  window._.add(1, 2)
</script>
```

## 正确使用第三方包
* 如果是这样使用：
```js
// src/index.js
import _ from "lodash"
export const add = (a, b) => a + b
export const max = _.max
```
* 因为 Webpack 默认会将所有第三方依赖都打包进产物中，这种逻辑能满足 Web 应用资源合并需求，但在开发 NPM 库时则很可能导致代码冗余。以 test-lib 为例，若使用者在业务项目中已经安装并使用了 lodash，那么最终产物必然会包含两份 lodash 代码！
* 为解决这一问题，我们需要使用 externals 配置项，将第三方依赖排除在打包系统之外：

```text
externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
```

* Webpack 编译过程会跳过 externals 所声明的库，并假定消费场景已经安装了相关依赖，常用于 NPM 库开发场景；在 Web 应用场景下则常被用于优化性能。
* 改造后变化
1. 产物仅包含test-lib库，体积大幅降低
2. UMD模板通过require、define函数中引入lodash依赖并传递到factory
* 至此，Webpack 不再打包 lodash 代码，我们可以顺手将 lodash 声明为 peerDependencies：
* 实践中，多数第三方框架都可以沿用上例方式处理，包括 React、Vue、Angular、Axios、Lodash 等，方便起见，可以直接使用 webpack-node-externals 排除所有 node_modules 模块，使用方法：
```text
// webpack.config.js
const nodeExternals = require('webpack-node-externals')
module.exports = {
    externals: [nodeExternals()]
}
```

## 抽离CSS代码
* 假设我们开发的 NPM 库中包含了 CSS 代码 —— 这在组件库中特别常见，我们通常需要使用 mini-css-extract-plugin 插件将样式抽离成单独文件，由用户自行引入

## 生成Sourcemap
* 是一种代码映射协议，它能够将经过压缩、混淆、合并的代码还原回未打包状态
* 一个成熟的 NPM 库除了提供兼容性足够好的编译包外，通常还需要提供 Sourcemap 文件。
```text
// webpack.config.js
module.exports = {
  devtool: 'source-map'
}
```
* 再次执行 webpack 就可以看到 .map 后缀的映射文件：
* 业务方只需使用 source-map-loader 就可以将这段 Sourcemap 信息加载到自己的业务系统中，实现框架级别的源码调试能力
