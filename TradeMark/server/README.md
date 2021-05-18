<!--
 * @author: DSCode
 * @create: 2021-03-28 11:55 AM
 * @license: MIT
 * @lastAuthor: DSCode
 * @lastEditTime: 2021-03-30 17:53 PM
 * @desc: 项目文档
-->

# 关于这个项目

使用 [Hapi](https://hapi.dev/) 创建的第一个 Web Server API Template，项目支持横向扩展，自带示例数据库，采用`活文档`概念书写项目文档。

## 包管理工具

优先使用 `yarn` 简化命令操作，`npm` 同样优秀，但是不推荐 `pnpm`，原因在于 `pnpm` 会改变原有包组织形式，导致环境损坏，也不推荐 `cnpm`。

# 运行项目

```sh
# 安装环境
yarn || npm i
# 启动项目
yarn dev || npm run dev
```

# 项目依赖

```json
"@hapi/hapi"  // 简单、安全、可信任的框架，构建功能强大，可拓展的应用程序。
"@hapi/inert" // hapi.js 的静态文件和目录处理程序。
"@hapi/vision" // hapi.js的模板渲染支持。
"hapi-pino" // 用于日志记录的 pino logger 插件，以 JSON 形式记录日志，以便后期处理。
"hapi-plugin-mysql" // hapi MySQL 插件。将每个请求连接到 MySQL 连接池。
"hapi-swagger" // 这是Hapi的OpenAPI（又名Swagger）插件，安装后将自行记录项目中的API接口。
"joi" // 最强大的JavaScript模式描述语言和数据验证器。
```

`inert`，`vision` 是 `hapi` 生态系统的一部分，旨在与 hapi Web 框架及其其他组件无缝协作（但可以单独使用或与其他框架配合使用）。
