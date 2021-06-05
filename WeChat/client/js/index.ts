/*
 * @author: DoubleW
 * @create: 2021-05-17 11:21 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-18 16:54 PM
 * @desc:
 */
"user strict";
import * as io from "socket.io";
console.log(io);

// TODO 监测窗口大小
// ! 用于针对pc、移动端下不同的操作指令
let gist: number = 0;

let inner = window.innerWidth;
if (inner <= 1300) {
  Until();
  gist = 1;
} else {
  gist = 0;
}

window.onresize = function () {
  if (window.innerWidth <= 1300) {
    gist = 1;
  } else {
    gist = 0;
  }
};

// ! 识别为移动端时执行此函数 -- 至此才执行本功能
function Until() {
  let mhomePage = Eleget(".home-page");
  mhomePage.style.display = "block";
}

// TODO 工具函数
function Eleget(params: string) {
  return document.querySelector(params) as HTMLElement;
}
function Iptget(params: string) {
  return document.querySelector(params) as HTMLInputElement;
}
function gets(params: string) {
  return document.querySelectorAll(params);
}

// 验证口令
let code = 0;
window.onload = function () {
  // socket.on("code", (num: number) => {
  //   code = num;
  // });
};

// 获取首页总控制元素
let homePage = Eleget(".homePage");
// 获取聊天室页面总控制元素
let charRoom = Eleget(".charRoom");

let user = Iptget(".user");
let word = Iptget(".word");
let parArr = [user, word];

// ! 敏感词汇
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
];

// TODO 首页用户名判断
blur(user);
blur(word);
// flag 定义 input 框合法状态
let flag = 1;

/**
 * 两个input框绑定同一点击事件，判断 合法、敏感词汇
 * @param param input元素
 */
function blur(param: any) {
  // 跳转键盘事件
  param.onkeydown = function (e: any) {
    if (e.keyCode == 13) {
      check();
      if (flag == 1) {
        // 敏感词汇判断
        let result1 = arr.every((ele) => {
          return user.value.indexOf(ele) == -1;
        });

        if (result1) {
          // ? let data = { account:user.value,code:word.value }
          // ? socket.emit("join",data);

          //  socket.on("join",(data)=>{
          //    data.name  data.id
          //  });
          //  模板字符串渲染

          homePage.style.display = "none";
          charRoom.style.display = "flex";

          // socket.on("anojoin",(hello)=>{
          //  console.log(hello);
          // })
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
    } else if (parArr[1].value === String(code)) {
      ele.style.borderColor = "#0063b1";
    } else {
      parArr[0].style.borderColor = "#0063b1";
      parArr[1].style.borderColor = "red";
      flag = 0;
    }
  }
}

// TODO 主页
let leftTop = Eleget(".left-top");
let leftUll = Eleget(".left-bottom");
let left = Eleget(".left");
let right = Eleget(".right");

// 点击由简略到详情页面
for (let i = 0; i < leftUll.children.length; i++) {
  const ele = leftUll.children[i] as HTMLElement;
  ele.onclick = function () {
    right.style.display = "block";

    // ! 移动端时执行操作
    if (gist == 1) {
      left.style.display = "none";

      let leave = Eleget(".leave");
      leave.onclick = function () {
        left.style.display = "block";
        right.style.display = "none";
      };
    }
  };
}

// 搜索工具
let tool = Eleget(".tool");
let search = Eleget(".search");
tool.onclick = function () {
  leftTop.style.display = "none";
  search.style.display = "flex";
};

// 搜索 取消工具
let cancel = Eleget(".cancel");
cancel.onclick = function () {
  leftTop.style.display = "flex";
  search.style.display = "none";
};

// 关闭页面元素
let closer = Eleget(".close");
closer.onclick = function () {
  right.style.display = "none";
};

// emoji 打开与关闭元素
let emoji = Eleget(".emoji");
let emojiCont = Eleget(".emoji-cont");
emoji.onclick = function () {
  if (emojiCont.style.display == "block") {
    emojiCont.style.display = "none";
  } else {
    emojiCont.style.display = "block";
  }
};
