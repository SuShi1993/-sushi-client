## 安装依赖
```shell
pnpm add webpack webpack-cli -D
pnpm add @babel/core @babel/cli @babel/preset-env babel-loader -F @sushi/demo-wpk-first -D
pnpm add typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin @babel/preset-typescript -D
pnpm add eslint eslint-config-standard eslint-webpack-plugin -D
```
## 解析
* module属性声明模块处理规则，module.rules子属性定义对类型文件用哪些Loader处理器
* test: /\.js$/ 只有路径命中该正则的所有.js后缀文件生效
* use: 声明Loader处理器序列
* @babel/preset-env 是一种Babel预设规则集 Preset，能按需将一系列复杂、数量庞大的配置、插件、Polyfill 等打包成一个单一的资源包，从而简化 Babel 的应用
1. babel-preset-react：包含 React 常用插件的规则集
2. @babel/preset-typescript：用于转译 TypeScript 代码的规则集
3. eslint-config-airbnb：Airbnb 提供的代码风格规则集，算得上 ESLint 生态第一个成名的规则集合
4. eslint-config-standard：Standard.js 代码风格规则集，史上最便捷的统一代码风格的方式
5. eslint-plugin-react：实现对 React 代码风格检查
6. @typescript-eslint/eslint-plugin：实现对 TypeScript 代码风格检查

* webpack只需 babel-loader 就可接入babel转译
* @babel/preset-typescript 借助babel-loader 可以完成 ts转码工作
* Webpack 下，可以使用 eslint-webpack-plugin 接入 ESLint
