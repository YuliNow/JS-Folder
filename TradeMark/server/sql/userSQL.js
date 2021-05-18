/*
 * @author: DSCode
 * @create: 2021-03-26 14:16 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-10 15:43 PM
 * @desc: 所有用户SQL语句
 */
"use strict";

/** ----------------------------------------------------------------
 * TODO User APIs
 ---------------------------------------------------------------- */
// 获取所有用户信息
const getAllAccounts = "SELECT * FROM `trademarkdata`.`userdata`;";

/**
 * 根据账号密码登录
 * @param {*} account 账号
 * @param {*} password 密码
 * @returns Login SQL
 */
const login = (account, password) => {
  return (
    "SELECT id,username,account,password  FROM `trademarkdata`.`userdata` WHERE `account` = '" +
    account +
    "' AND `password` = '" +
    password +
    "';"
  );
};

/**
 *
 * @param {*} phone 手机号
 * @returns Login SQL
 */
const phone = (phone) => {
  return (
    "SELECT id,username,account,password FROM `trademarkdata`.`userdata` WHERE `phone` = '" +
    phone +
    "';"
  );
};

/**
 * 用户注册添加信息
 * @param {*} account 账号
 * @param {*} password 密码
 * @param {*} phone 手机号
 * @returns Insert account and password SQL
 */
const regis = (account, password, phone) => {
  return (
    "INSERT INTO `trademarkdata`.`userdata` (account, password, phone) VALUES ( '" +
    account +
    "','" +
    password +
    "','" +
    phone +
    "');"
  );
};

/**
 * 更改密码 + 设置新密码
 * @param {*} acount 账号
 * @param {*} oldPWD 老密码
 * @param {*} newPWD 新密码
 * @returns Change password SQL
 */
const changePWD = (account, oldPWD, newPWD) => {
  return (
    "UPDATE `trademarkdata`.`userdata` SET `password` = '" +
    newPWD +
    "' WHERE `account` = '" +
    account +
    "' AND `password` = '" +
    oldPWD +
    "'; "
  );
};

/**
 *
 * @param {*} account 账号
 * @param {*} password 密码
 * @param {*} username 用户名
 * @param {*} ID_card_type 证件类型
 * @param {*} ID_card_num 证件号码
 * @param {*} postcode 邮编
 * @param {*} address 地址
 * @param {*} security 密保问题
 * @param {*} security_answer 密保答案
 * @param {*} upload_ID_Img 是否上传身份证
 * @returns update user info SQL
 */
const updateUserInfo = (
  account,
  password,
  username,
  ID_card_type,
  ID_card_num,
  postcode,
  address,
  security,
  security_answer,
  upload_ID_Img
) => {
  return (
    "UPDATE `trademarkdata`.`userdata` SET `username` = '" +
    username +
    "' ,`ID_card_type` = '" +
    ID_card_type +
    "', `ID_card_num` = '" +
    ID_card_num +
    "', `postcode` = '" +
    postcode +
    "', `address` = '" +
    address +
    "', `security` = '" +
    security +
    "', `security_answer` = '" +
    security_answer +
    "', `upload_ID_Img` = '" +
    upload_ID_Img +
    "' WHERE `account` = '" +
    account +
    "' AND `password` = '" +
    password +
    "';"
  );
};

/**
 * 查看详情时通过修改数据更新个人信息方面的数据库数据
 * @param {*} phone
 * @param {*} postcode
 * @param {*} account
 * @returns
 */
const updateUser = (phone, postcode, account) => {
  return (
    "UPDATE `trademarkdata`.`userdata` SET `phone` = '" +
    phone +
    "',`postcode` = '" +
    postcode +
    "' WHERE `account` = '" +
    account +
    "';"
  );
};

module.exports = {
  getAllAccounts: getAllAccounts,
  login: login,
  phone: phone,
  regis: regis,
  changePWD: changePWD,
  updateUserInfo: updateUserInfo,
  updateUser: updateUser,
};
