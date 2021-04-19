/*
 * @author: DoubleW
 * @create: 2021-04-19 09:08 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-04-19 15:38 PM
 * @desc: 计算器进阶 js
 */
"use strick";

let [a, s, b, e, r] = ["", "", "", "", ""];
let num = document.querySelectorAll(".num");
let sym = document.querySelectorAll(".symbol");
let rst = document.querySelector(".result");
let ipt = document.querySelector("#ipt");

// TODO 循环数字和符号点击事件
num.forEach((ele) => {
  // 存取数据到const上防止页面数据篡改导致功能损坏
  const tet = ele.innerHTML;
  ele.onclick = () => {
    funcNum(tet);
  };
});
sym.forEach((ele) => {
  const tet = ele.innerHTML;
  ele.onclick = () => {
    funcSym(tet);
  };
});

// TODO 数字点击事件
function funcNum(tet) {
  if (s == "") {
    a += tet;
    rander();
  } else if (s != "" && a != "" && r == 0) {
    b += tet;
    rander();
  }
  console.log({ a: a, s: s, b: b, e: e, r: r });
}

// TODO 字符点击事件
function funcSym(tet) {
  if (a !== "" && b == "") {
    s = tet;
    rander();
  } else if (s !== "" && r !== "") {
    // ! 等号多级事件
    step(tet);
  } else if (a !== "" && s !== "" && b !== "") {
    // ! 不使用等号多级运算事件
    compute();
    step(tet);
  }
  if (tet == "c") {
    [a, s, b, r, e, ipt.value] = ["", "", "", "", "", ""];
  }
  console.log({ a: a, s: s, b: b, e: e, r: r });
}

// TODO 多级运算符事件
function step(tet) {
  ipt.value = "";
  // ! 存取上次运算结果并将其余内容置零
  a = r;
  [b, r, e] = ["", "", ""];
  s = tet;
  rander();
}

// TODO 计算结果事件
function compute() {
  if (a !== "" && b !== "" && s !== "") {
    a = Number(a);
    b = Number(b);
    switch (s) {
      case "+":
        r = a + b;
        break;
      case "-":
        r = a - b;
        break;
      case "*":
        r = a * b;
        break;
      case "/":
        if (b == 0) {
          r = 0;
        } else {
          r = a / b;
        }
        break;
      default:
        break;
    }
    e = "=";
  }
}

// TODO 求值点击事件
rst.onclick = () => {
  compute();
  rander();
  console.log({ a: a, s: s, b: b, e: e, r: r });
};

// TODO 渲染页面
function rander() {
  ipt.value = `${a} ${s} ${b} ${e} ${r}`;
}
