/*
 * @author: DoubleW
 * @create: 2021-05-06 16:51 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-10 15:15 PM
 * @desc:
 */

module.exports = function (data) {
  let a = 1;
  for (const key in data) {
    const element = data[key];
    // 测试参数，根据是否完全合格返回布尔值
    let result = Select(element.tag, element.data);
    console.log(result);
    if (result == false) {
      a = 0;
    }
  }

  return a;
};

// 定义服务端用户方面审核正则表达式
let reg = /^[a-zA-Z]/;

// 检测传入参数是否为空或合法
function Select(tag, data) {
  let num = 0;
  switch (tag) {
    case "1":
      if (data != "") {
        num = 1;
      }
      return num;
    case "2":
      if (reg.test(data)) {
        num = 1;
      }
      return num;
    case "3":
      if (!isNaN(data)) {
        num = 1;
      }
      return num;
    default:
      break;
  }
}
