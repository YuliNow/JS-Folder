/*
 * @author: DoubleW
 * @create: 2021-05-14 14:53 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-25 19:05 PM
 * @desc:
 */
// TODO 引入 fastify 组件
const fastify = require("fastify")({ logger: true });
const io = require("socket.io")(fastify.server);
const crypto = require("crypto");
const path = require("path");

// 初始配置
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3006;
const public_prefix = "/client";

// 模板引擎
fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs"),
  },
});
// 配置静态资源
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "client"),
  prefix: "/client/",
});

// 路由
fastify.get("/", async (req, res) => {
  return res.view(`${public_prefix}/index.html`);
});

// 在线人数
let nameArr = [];
// 本人用户账号
let name = "";
// 随机分配头像
let imgArr = [
  "client/img/_1_cj.png",
  "client/img/_2_cj.png",
  "client/img/_3_cj.png",
  "client/img/_4_cj.png",
  "client/img/_5_cj.png",
  "client/img/_6_cj.png",
  "client/img/_7_cj.png",
  "client/img/_8_cj.png",
  "client/img/_9_cj.png",
  "client/img/_10_cj.png",
];

nameArr.push({
  name: "无限活力",
  id: "001",
  img: "client/img/photo.png",
  top: 1,
});

// Io 监听 -- 用户连接
io.on("connection", function (socket) {
  // TODO 消息监听
  socket.on("mess", (data) => {
    console.log("mess:", data);

    nameArr.forEach((ele) => {
      if (ele.id == data.Sender_id) {
        name = ele.name;
      }
    });

    if (data.Reveive_id == "001") {
      // 发送给 energy room 的用户
      io.emit("allMess", {
        msg: data.msg,
        name: name,
        Sender_id: data.Sender_id,
        Reveive_id: data.Reveive_id,
      });
    } else {
      // 发送给 私人 用户
      // 别人
      io.to(data.Reveive_id).emit("perMess", {
        msg: data.msg,
        name: name,
        Sender_id: data.Sender_id,
        Reveive_id: data.Reveive_id,
      });
      // 自己
      socket.emit("perMess", {
        msg: data.msg,
        name: name,
        Sender_id: data.Sender_id,
        Reveive_id: data.Reveive_id,
      });
    }
  });

  // TODO 监测用户输入口令判断是否正确并进入主页面
  socket.emit("code", 666);

  // 用户名重名验证
  socket.on("check", (data) => {
    nameArr.forEach((ele) => {
      if (ele.name == data.account) {
        let p = 1;
        socket.emit("rep", p);
      } else {
        nameArr.push(obj);
      }
    });
  });

  // TODO 监测用户的加入与离开
  socket.on("join", (data) => {
    console.log("data:", data);

    let rd = Math.floor(Math.random() * 10);
    // 给每个用户分配唯一ID
    let obj = {
      name: data.account,
      id: socket.id,
      img: imgArr[rd],
      top: 0,
    };

    nameArr.push(obj);

    socket.emit("join", obj);
    // 将该用户添加进 energy 聊天室
    // socket.join("energy room");

    // TODO 在线人数
    io.emit("online", nameArr);

    // TODO 给其他人发送进群通知
    let hello = data.account + "加入了聊天！";
    socket.broadcast.emit("anojoin", hello);
  });

  // TODO 监听用户离开
  socket.on("disconnect", () => {
    let str = name + "离开了聊天！";
    nameArr.forEach((ele, index) => {
      if (ele.id == socket.id) {
        nameArr.splice(index, 1);
      }
    });
    io.emit("online", nameArr);

    socket.broadcast.emit("leave", str);
  });

  // TODO 监测用户的正在输入 与 停止
  socket.on("typing", (id) => {
    nameArr.forEach((ele) => {
      if (ele.id == id) {
        name = ele.name;
      }
    });

    console.log(name + " is typing");

    io.emit("typing", { name: name, id: id });
  });
});

// 端口监听
fastify.listen(port, host, () => {
  console.log(`server is on http://${host}:${port}`);
});
