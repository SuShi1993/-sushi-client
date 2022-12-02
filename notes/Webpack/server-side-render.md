* 通常React程序会被构建为一套纯客户端运行的SPA(Single Page Application)应用。
1. SEO不友好。SPA应用通常无法向爬虫提供任何有用信息
2. Time-To-Content更长。由于客户端需要等待所有JS资源加载完毕后才开始渲染页面真正有意义的内容。
* SSR正是为了解决这些问题。本质：SSR是一种在服务端将组件渲染HTML字符串并发送到浏览器，最后在浏览器将这些HTML片段"激活"为客户端上可交互的应用技术。
* 编译时，将同一组件构建为适合在客户端、服务端运行的两份副本
* 服务端接收到请求时，调用Render工具将组件渲染为HTML字符串，并返回给客户端
* 客户端运行HTML，并再次执行代码，激活(Hydrate)组件

* React 有许多SSR方案：Next.js/egg-react-ssr/ssr 等

## 使用Webpack + React + Express 搭建一套React SSR 应用环境
1. 为客户端环境准备项目入口文件 见demo *entry-client.js*
2. 为服务端环境准备入口文件 *server-client.js*
### 代码核心
* 引入客户端React根组件，调用renderToString 将其渲染为HTML字符串
* 获取客户端打包产物映射文件*manifest*文件，将组件HTML字符串与*entry-client.js*产物路径注入到HTML文件中，并返回给客户端
* 分别为客户端、服务端版本编写webpack配置文件
* *base* 用于设定基本规则
* *webpack.client.js* 用于定义构建客户端资源的配置 
* 这里我们需要使用 webpack-manifest-plugin 插件记录产物构建路径，之后才能在 server.js 中动态注入 HTML 代码中；
* *webpack.server.js* 用于构建服务端资源的配置
