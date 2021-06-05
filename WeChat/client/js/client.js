/*
 * @author: DoubleW
 * @create: 2021-05-18 09:14 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-20 13:57 PM
 * @desc:
 */
"use strict";
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
function Get(params) {
  let re = document.querySelector(params);
  if (re.length == 1) {
    return re[0];
  } else {
    return re;
  }
}

const socket = io();

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
let user = get(".user");
let word = get(".word");

// flag 定义 input 框合法状态
let flag = 1;
// 存入自己的名字与Id 区分自己与别人
let Id = "";
let priName = "";
// ! 存入当前页面所有消息
let onlineMes = [
  // name:  msg:  id:
];

user.onkeydown = function (e) {
  if (e.keyCode == 13) {
    check();
    if (flag == 1) {
      // 敏感词汇判断
      let result1 = arr.every((ele) => {
        return user.value.indexOf(ele) == -1;
      });
    }
  }
};

// enter事件 条件函数 判断内容是否合法
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
    } else if (word.value == String(code)) {
      ele.style.borderColor = "#0063b1";
    } else {
      user.style.borderColor = "#0063b1";
      word.style.borderColor = "red";
      flag = 0;
    }
  }
}
