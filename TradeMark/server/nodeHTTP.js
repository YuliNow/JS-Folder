/*
 * @author: DSCode
 * @create: 2021-03-24 09:55 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-08 15:02 PM
 * @desc: 创建 基础的 Node HTTP 服务器
 */
"use strict";
// 引入 HTTP
const http = require("http");
// 主机名
const hostname = "127.0.0.1";
// 端口
const port = 3000;
// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});
// 服务监听
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
