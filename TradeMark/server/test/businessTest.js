/*
 * @author: DoubleW
 * @create: 2021-05-06 09:45 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-10 15:12 PM
 * @desc:
 */
module.exports = function (data) {
  let judge = true;
  for (const key in data) {
    const ele = data[key];
    // 测试参数，根据是否完全合格返回布尔值
    let result = tet(ele.tag, ele.data);
    if (result == false) {
      judge = false;
    }
  }

  return judge;
};

// 定义服务端商标方面审核正则表达式
let reg1 = /^[a-zA-Z]/;
// certificate_ID
let regCer = /\d{18}[\d|x]|\d{15}/;

// 二次检测方式
function tet(tag, data) {
  switch (tag) {
    case "1":
      // 账号
      if (data != "") {
        return 1;
      }
      return 0;
    case "2":
      if (reg1.test(data)) {
        return 1;
      }
      return 0;
    case "3":
      if (regCer.test(data)) {
        return 1;
      }
      return 0;
    case "4":
      if (!isNaN(data)) {
        return 1;
      }
      return 0;
    default:
      break;
  }
}
