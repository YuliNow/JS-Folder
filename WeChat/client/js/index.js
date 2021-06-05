/*
 * @author: DoubleW
 * @create: 2021-05-17 11:21 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-25 18:58 PM
 * @desc:
 */
"user strict";
// ! 导入敏感词汇库
let arr = [
  "tm",
  "tmd",
  "nm",
  "nmd",
  "他妈的",
  "妈",
  "爹",
  "老子",
  "傻逼",
  "卧槽",
  "我操",
];

// TODO 工具函数
function get(params) {
  return document.querySelector(params);
}
function gets(params) {
  return document.querySelectorAll(params);
}

const socket = io("http://127.0.0.1:3006");

// TODO 监测窗口大小 监测是否为移动端
function height(height) {
  if (height <= 1300) {
    gist = 1;
  } else {
    gist = 0;
  }
}

// ! 用于针对pc、移动端下不同的操作指令
let gist = 0;
let inner = window.innerWidth;
height(inner);
window.onresize = function () {
  height(window.innerWidth);
};

// ! 识别为移动端时执行此函数 -- 至此才执行本功能
function Until() {
  let mhomePage = get(".home-page");
  mhomePage.style.display = "block";
}

// 监听用户离开聊天
socket.on("leave", (str) => {
  console.log(str);
});

// 验证口令
let code = 0;
socket.on("code", (num) => {
  code = num;
});

// 获取首页总控制元素
let homePage = get(".homePage");
// 获取聊天室页面总控制元素
let charRoom = get(".charRoom");
// 获取用户框和口令框
let user = get(".user");
let word = get(".word");
let parArr = [user, word];
// 列表 ul 框
let lb = get(".left-bottom");

// TODO 首页用户名判断
blur(user);
blur(word);
// flag 定义 input 框合法状态
let flag = 1;
// 存入自己的名字与Id 区分自己与别人
let Id = "";
let priName = "";

// ! 存入当前页面所有消息
let onlineMes = [
  // name:  msg:  id:
];

/**
 * 两个input框绑定同一点击事件，判断 合法、敏感词汇
 * @param param input元素
 */
function blur(param) {
  // 跳转键盘事件
  param.onkeydown = function (e) {
    if (e.keyCode == 13) {
      check();
      if (flag == 1) {
        // 敏感词汇判断
        let result1 = arr.every((ele) => {
          return user.value.indexOf(ele) == -1;
        });
        if (result1) {
          priName = user.value.trim().replace(/ /g, ""); // 账号空白处理

          // socket.emit("check",user.value);
          let data = { account: priName, code: word.value };

          socket.emit("join", data);

          homePage.style.display = "none";
          charRoom.style.display = "flex";

          if (gist == 1) {
            Until();
          }
        } else {
          user.style.borderColor = "red";
          flag = 0;
        }
      } else {
        // 判断谁错
        parArr.forEach((ele) => {
          if (ele.value == "") {
            ele.style.borderColor = "red";
          }
        });
      }
    }
  };
}

/**
 * enter事件 条件函数 判断内容是否合法
 */
function check() {
  flag = 1;

  for (let i = 0; i < parArr.length; i++) {
    const ele = parArr[i];
    // 限制 Input 框的长度
    if (ele.value.length > 8) {
      ele.value = ele.value.slice(0, 8);
    }
    if (ele.value == "") {
      ele.style.borderColor = "red";
      flag = 0;
    } else if (parArr[1].value == String(code)) {
      ele.style.borderColor = "#0063b1";
    } else {
      parArr[0].style.borderColor = "#0063b1";
      parArr[1].style.borderColor = "red";
      flag = 0;
    }
  }
}

// TODO 主页
let leftTop = get(".left-top");
let leftUll = get(".left-bottom");
// 左右大布局
let left = get(".left");
let right = get(".right");
let leftUlLi;
// 获取当前聊天定位
let only = "";

// TODO 搜索框事件
let nameSearch = get(".nameSearch");
let searchBox = get(".search-box");
let nameList;

nameSearch.oninput = function () {
  searchBox.innerHTML = "";
  nameList.forEach((ele) => {
    if (
      ele.name.indexOf(nameSearch.value) != -1 &&
      ele.name != user.value &&
      nameSearch.value != ""
    ) {
      searchBox.style.display = "block";

      searchBox.innerHTML += `<li class="search-li" only="${ele.id}">
      <div class="content">
        <div class="img"><img src=${ele.img} alt="" /></div>
        <div class="con-center">
          <span>${ele.name}</span><br /><i>&nbsp;&nbsp;&nbsp;</i>
        </div>
      </div>
    </li>`;
    }
  });

  if (nameSearch.value === "") {
    searchBox.style.display = "none";
  }

  // 搜索时点击跳转到聊天界面
  let searchLi = gets(".search-li");
  searchLi.forEach((ele) => {
    ele.onclick = function () {
      let llis = gets(".lli");
      llis.forEach((value) => {
        if (value.getAttribute("only") == ele.getAttribute("only")) {
          click(value);
          leftTop.style.display = "flex";
          search.style.display = "none";

          nameSearch.value = "";
        }
      });
    };
  });
};

/**
 * 点击由简略到详情页面
 */
function to() {
  let balls = gets(".ball");
  leftUlLi = gets(".lli");

  leftUlLi.forEach((ele, index) => {
    ele.onclick = function () {
      // 取消未读
      ele.children[0].children[2].children[1].style.display = "none";
      ele.children[0].children[2].children[1].innerHTML = "";
      balls[index].style.display = "none";

      click(ele);
    };
  });
}

/**
 * 点击由简略到详情页面 的点击事件
 * @param {*} ele 点击的li元素
 */
let usern = get(".user-name");

function click(ele) {
  msg.innerHTML = "";
  only = ele.getAttribute("only");

  // 根据only属性判断是渲染多人聊天还是私人聊天
  onlineMes.forEach((value) => {
    for (const key in value) {
      value[key].forEach((item) => {
        // 渲染左边
        if (key == Id && item.Sender_id == only && item.type == "per") {
          msgRander(item, item.time);
        } else if (only == "001" && item.type == "all") {
          msgRander(item, item.time);
        }
        // 渲染右边
        if (key == only && item.type == "per") {
          msgRander(item, item.time);
        }
      });
    }
  });

  right.style.display = "block";
  usern.children[0].innerHTML =
    ele.children[0].children[1].children[0].innerHTML;

  // ! 移动端时执行操作
  if (gist == 1) {
    left.style.display = "none";
    let leave = get(".leave");
    leave.onclick = function () {
      left.style.display = "block";
      right.style.display = "none";
    };
  }
}

// 搜索工具
let tool = get(".tool");
let search = get(".search");
tool.onclick = function () {
  leftTop.style.display = "none";
  search.style.display = "flex";
};
// 搜索 取消工具
let cancel = get(".cancel");
cancel.onclick = function () {
  leftTop.style.display = "flex";
  search.style.display = "none";
};
// 关闭页面元素
let closer = get(".close");
closer.onclick = function () {
  right.style.display = "none";
};
// emoji 打开与关闭元素
let emoji = get(".emoji");
let emojiCont = get(".emoji-cont");
emoji.onclick = function () {
  if (emojiCont.style.display == "block") {
    emojiCont.style.display = "none";
  } else {
    emojiCont.style.display = "block";
  }
};
emojiCont.onmouseleave = function () {
  emojiCont.style.display = "none";
};

// emoji表情输入
let imgs = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😉",
  "😊",
  "😋",
  "😗",
  "😙",
  "😚",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "🥱",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "😓",
  "😔",
  "😕",
  "🙃",
  "🤑",
  "😲",
  "🙁",
  "😖",
  "😞",
  "😟",
  "😤",
  "😢",
  "😭",
  "😦",
  "😧",
  "😨",
  "🤯",
  "😬",
  "😰",
  "😱",
  "🥵",
  "🥶",
  "😳",
  "🤪",
  "😵",
  "🥴",
  "😠",
  "😡",
  "🤬",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "🥳",
  "🥺",
  "🤠",
  "🤡",
  "🤫",
  "🤭",
  "🧐",
  "😇",
  "😍",
  "😘",
  "🥰",

  // { img: "client/img/emoji/IMG00001.bmp", alt: "[开心]" },
  // { img: "client/img/emoji/IMG00002.bmp", alt: "[龇牙]" },
  // { img: "client/img/emoji/IMG00005.bmp", alt: "[笑哭]" },
  // { img: "client/img/emoji/IMG00006.bmp", alt: "[高兴]" },
  // { img: "client/img/emoji/IMG00009.bmp", alt: "[大笑]" },
  // { img: "client/img/emoji/IMG00010.bmp", alt: "[尴尬]" },
  // { img: "client/img/emoji/IMG00013.bmp", alt: "[笑疯]" },
];

imgs.forEach((ele) => {
  emojiCont.innerHTML += `<span class="emo">${ele}</span>`;
});
let emo = gets(".emo");
emo.forEach((ele) => {
  ele.onclick = function () {
    ipt.innerHTML += `<span>${ele.innerHTML}</span>`;
  };
});

// ! 消息输送
let ipt = get(".ipt");
let msg = get(".messages");

// ! 保留 下次开发 正在输入事件
// 先创建li标签，用户输入时才加入页面
// let lii;
// ipt.onchange = function () {
//   socket.emit("typing", Id);

//   socket.on("typing", (data) => {
//     lii = document.createElement("li");
//     console.log(data.name, ":is typing");
//     console.log(data.id);
//     console.log(Id);
//     if (data.id != Id) {
//       msg.appendChild(lii);
//       lii.classList.contains("msg12") ? lii.classList.remove("msg2") : 1;
//       lii.classList.add("msg", "msg1");
//       lii.innerHTML = `
//       <div class="msg-left"><div class="dimg"></div></div>
//       <div class="msg-center">
//         <div class="detail">...</div>
//         <div class="angle-left">
//           <img src="client/img/msg-left.png" alt="" />
//         </div>
//         <div class="account">${data.name}</div>
//         <div class="detail-time">正在输入...</div>
//       </div>
//       <div class="msg-right"><div class="dimg1"></div></div>`;

//       if (ipt.value == "") {
//         console.log(lii);
//         lii.remove();
//       }
//     }
//   });
// };

// TODO 发送消息到服务端并同步到所有客户端
let sm = get(".submit");
sm.onclick = function () {
  sub();
};
ipt.onkeydown = function (e) {
  if (e.keyCode == 13) {
    sub();
  }
};

function sub() {
  if (ipt.innerHTML) {
    ipt.style.borderColor = "#e4e4e4";
    let re;
    // 敏感词汇判断
    arr.forEach((ele) => {
      re = ipt.innerHTML.replace(new RegExp(ele, "g"), "*");
    });

    // TODO 判断是聊天室还是私人聊天
    socket.emit("mess", { msg: re, Sender_id: Id, Reveive_id: only });
  } else {
    ipt.style.borderColor = "red";
  }
  ipt.innerHTML = "";
}

// TODO socket.on监听事件
socket.on("join", (data) => {
  Id = data.id;
});

// ! 接收到消息时播放音频文件
let audio = new Audio();
audio.src = "client/audio/prompt_tone.mp3";

// 聊天列表渲染
socket.on("online", (nameArr) => {
  nameList = nameArr;

  nameArr.forEach((ele) => {
    // 渲染自己的头像
    if (ele.name == user.value) {
      let rN = get(".roomName");
      rN.innerHTML = `<div><img src=${ele.img} alt="" />${ele.name}</div>`;
    }
    // 渲染在线列表
    if (ele.name != user.value) {
      if (ele.top == 1) {
        lb.innerHTML = `<li class="lli" only="001">
          <div class="content">
            <div class="img"><img src=${ele.img} alt="" /></div>
            <div class="con-center"><span>无限活力</span><br /><i>&nbsp;&nbsp;&nbsp;</i></div>
            <div class="timer">
              <div class="time">9:01</div>
              <div class="unread">0</div>
            </div>

            <!-- 置顶三角标 -->
            <div class="top-triangle"></div>
            <!-- 未读绿球 -->
            <div class="ball"></div>
          </div>
        </li>`;
      } else {
        lb.innerHTML += `<li class="lli" only="${ele.id}">
          <div class="content">
            <div class="img"><img src=${ele.img} alt="" /></div>
            <div class="con-center"><span>${ele.name}</span><br /><i>&nbsp;&nbsp;&nbsp;</i></div>
            <div class="timer">
              <div class="time">9:01</div>
              <div class="unread">0</div>
            </div>

            <!-- 未读绿球 -->
            <div class="ball"></div>
          </div>
        </li>`;
      }
    }
  });

  to();
});

// 新用户进入时给其他用户发送加入通知
socket.on("anojoin", (hello) => {
  console.log(hello);
});

// 多人消息列表渲染
socket.on("allMess", (data) => {
  unread(data);

  // 点击时获取当前时间
  let date = new Date();
  let time1 = date.toLocaleDateString();
  let time2 = date.toLocaleTimeString();
  let time = time1 + " " + time2;

  if (only == "001") {
    msgRander(data, time);

    // 收到消息音频播放
    audio.play();
  }

  // 每次发消息存放一次消息关键信息
  onlineMes.push({
    [data.Reveive_id]: [
      {
        name: data.name,
        msg: data.msg,
        Sender_id: data.Sender_id,
        time: time,
        type: "all",
      },
    ],
  });
  console.log(onlineMes);
});

// 私人消息列表渲染
socket.on("perMess", (data) => {
  unread(data);

  // 点击时获取当前时间
  let date = new Date();
  let time1 = date.toLocaleDateString();
  let time2 = date.toLocaleTimeString();
  let time = time1 + " " + time2;

  if (only == data.Sender_id) {
    msgRander(data, time);
    audio.play();
  } else if (data.Sender_id == Id) {
    msgRander(data, time);
    audio.play();
  }

  onlineMes.push({
    [data.Reveive_id]: [
      {
        name: data.name,
        msg: data.msg,
        Sender_id: data.Sender_id,
        time: time,
        type: "per",
      },
    ],
  });
  console.log(onlineMes);
});

/**
 * 页面渲染函数
 * @param {*} data 渲染数据
 * @param {*} time 消息时间
 */
function msgRander(data, time) {
  let lii2 = document.createElement("li");
  console.log(data);
  nameList.forEach((ele) => {
    if (ele.id == data.Sender_id) {
      if (data.Sender_id == Id) {
        msg.appendChild(lii2);

        lii2.classList.add("msg", "msg2");
        lii2.innerHTML = `
            <div class="msg-left"><div class="dimg1"></div></div>
            <div class="msg-center">
              <div class="detail">${data.msg}</div>
              <div class="angle-right">
                <img src="client/img/msg-right.png" alt="" />
              </div>
              <div class="account ta">${data.name}</div>
              <div class="detail-time ta">${time}</div>
            </div>
            <div class="msg-right"><div class="dimg"><img src=${ele.img} alt="" /></div></div>`;
      } else {
        msg.appendChild(lii2);

        lii2.classList.add("msg", "msg1");
        lii2.innerHTML = `
            <div class="msg-left"><div class="dimg"><img src=${ele.img} alt="" /></div></div>
            <div class="msg-center">
              <div class="detail">${data.msg}</div>
              <div class="angle-left">
                <img src="client/img/msg-left.png" alt="" />
              </div>
              <div class="account">${data.name}</div>
              <div class="detail-time">${time}</div>
            </div>
            <div class="msg-right"><div class="dimg1"></div></div>`;
      }
    }
  });

  // 每次点击更新元素视口在总高度定位
  msg.scrollTo(0, msg.scrollHeight);
}

/**
 * 判断未读消息
 * @param {*} data 传入数据
 */
function unread(data) {
  let llis = gets(".lli");
  let T = usern.children[0].innerHTML === data.name;

  llis.forEach((ele, index) => {
    if (
      ele.getAttribute("only") == data.Sender_id &&
      data.Reveive_id != "001"
    ) {
      // 判断右边框的 display 状态
      if (right.style.display == "" || right.style.display == "none") {
        dis(ele, index, data.msg);
      } else if (!T) {
        dis(ele, index, data.msg);
      } else {
        ele.children[0].children[1].children[2].innerHTML = data.msg;
      }
    } else if (ele.getAttribute("only") == "001" && data.Reveive_id == "001") {
      let msg = data.name + ":" + data.msg;
      if (right.style.display == "" || right.style.display == "none") {
        dis(ele, index, msg);
      } else {
        ele.children[0].children[1].children[2].innerHTML = msg;
      }
    }
  });
}

/**
 * 未读消息渲染
 * @param {*} ele 未读消息所在的元素
 * @param {*} index 未读消息所在元素集中的下标
 * @param {*} msg 未读消息内容
 */
function dis(ele, index, msg) {
  let balls = gets(".ball");
  balls[index].style.display = "block";
  ele.children[0].children[2].children[1].style.display = "block";
  ele.children[0].children[2].children[1].innerHTML =
    Number(ele.children[0].children[2].children[1].innerHTML) + 1;

  // 渲染最后一条语句到人员列表上
  ele.children[0].children[1].children[2].innerHTML = msg;
}
