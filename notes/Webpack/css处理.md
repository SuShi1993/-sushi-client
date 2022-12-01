* 原生webpack并不能识别CSS语法，不配置直接导入会编译失败
1. *css-loader*：将CSS等价翻译为形如module.exports = "${css}"的JS代码，使webpack能如处理JS一样解析CSS内容与资源依赖
2. *style-loader*：将在产物中注入一系列runtime代码，将CSS内容注入到页面的<style>标签，使样式生效
3. *mini-css-extract-plugin*：将CSS代码抽离到单独的.css文件，并将文件通过<link>标签方式插入到页面（webpack低于5.0时，使用extract-text-webpack-plugin代替）

```shell
pnpm add -D css-loader style-loader
```

* style-loader 将样式代码最终被写入Bundle文件，并在运行时通过style标签注入到页面，这种将JS CSS代码合并进同一产物文件的方式有问题：
1. JS CSS资源无法并行加载，降低了页面性能
2. 资源缓存粒度变大，任意一种变更都会使缓存失效
* 因此生产环境通常使用mini-css-extract-plugin 代替
```shell
pnpm add -D mini-css-extract-plugin
```
* mini-css-extract-plugin 库同时提供 Loader、Plugin 组件，需要同时使用
* mini-css-extract-plugin 不能与 style-loader 混用，否则报错
* mini-css-extract-plugin 需要与 html-webpack-plugin 同时使用，才能将产物路径以 link 标签方式插入到 html 中

4. 处理Less。接入 *less* *less-loader*
```shell
pnpm add -D less less-loader
```
* 这种需要同时使用3种loader， less-loader 用于将Less代码转换为CSS代码
```text
test: /\.less$/,
use: [
    'style-loader',
    'css-loader',
    'less-loader'
]
```

5. PostCSS并没有定义一门新的语言，而是与@babel/core类似，只实现了一套将CSS源码解析为AST结构，并传入PostCSS插件做处理的流程框架
```shell
pnpm add -D postcss postcss-loader autoprefixer
```
* autoprefixer 是一个插件 自动添加浏览器前缀
* postcss-preset-env：一款将最新 CSS 语言特性转译为兼容性更佳的低版本代码的插件
* postcss-less：兼容 Less 语法的 PostCSS 插件，类似的还有：postcss-sass
* stylelint：一个现代 CSS 代码风格检查器，能够帮助识别样式代码中的异常或风格问题
