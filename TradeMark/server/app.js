/*
 * @author: DSCode
 * @create: 2021-03-23 18:32 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-13 09:01 AM
 * @desc: 服务器主文件
 */
"use strict";

// TODO 引用 Hapi
const Hapi = require("@hapi/hapi");

const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Pack = require("./package");

// 导入路由
const Routers = require("./routers/router");
// 创建一个 HTTP 服务
// (async () => {})(); 可用此方法改进函数
// ! 访问页面网址 192.168.0.24/documentation
// ! 127.0.0.1 本机域名
const server = Hapi.server({
  port: 3000,
  host: "127.0.0.1",
  debug: false, // 禁用Hapi调试控制台日志记录
  // 配置跨域
  routes: {
    cors: {
      origin: ["*"],
    },
  },
});

// TODO 配置 Swagger
const swaggerOptions = {
  info: {
    title: "API 文档",
    version: Pack.version,
  },
};

// TODO 初始化 App
const init = async () => {
  // 使用 Hapi 日志组件，实时监控程序运行情况
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      // 格式化日志输出
      prettyPrint: true,
      // 获取权限
      redact: [
        "req.headers.authorization",
        "key",
        "path.to.key",
        "stuff.thats[*].secret",
      ],
      // 默认输出的日志类型
      logEvents: ["server-start", "server-stop", "response", "request-error"], // Default
    },
  });

  //  TODO 连接数据库
  await server.register({
    plugin: require("hapi-plugin-mysql"),
    // options === 参数
    options: {
      host: "localhost",
      user: "root",
      password: "123456",
      port: 3306,
    },
  });

  // TODO 注册 Swagger 组件
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  try {
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.log(err);
  }

  // TODO  注册路由
  server.route(Routers);
};

// TODO 捕获软件运行异常
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

server.events.on("response", function (request) {
  console.log(
    request.info.remoteAddress +
      ": " +
      request.method.toUpperCase() +
      " " +
      request.path +
      " --> " +
      request.response.statusCode +
      " " +
      JSON.stringify(request.payload)
  );
});

// 执行初始化函数
init();
