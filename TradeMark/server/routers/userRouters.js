/*
 * @author: DSCode
 * @create: 2021-03-26 10:00 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-12 10:20 AM
 * @desc: 定义用户路由集
 */
"use strict";

const allSQL = require("../sql/userSQL");
const query = require("../sql/queryData");
const Joi = require("joi");

const Test = require("../test/userTest");
// TODO 用户路由
const user = [
  {
    method: "get",
    path: "/getAllAccountInfo",
    handler: async (req, res) => {
      return query(req, allSQL.getAllAccounts);
    },
    options: {
      description: "获取所有账户信息",
      notes: "获取所有账户信息，包含所有数据！！！",
      tags: ["api"],
    },
  },
  {
    method: "post",
    path: "/login",
    handler: async (req, res) => {
      try {
        const account = req.payload.account;
        const password = req.payload.password;

        // TODO 服务端验证
        const testData = [
          { data: account, tag: 2 },
          { data: password, tag: 2 },
        ];

        return Test(testData)
          ? query(req, allSQL.login(account, password))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    // 配置 Swagger
    options: {
      description: "账号登录接口",
      notes: "前端传入account password 进行登录验证",
      tags: ["api"],
      validate: {
        // 字段说明，Joi 字段类型库
        payload: Joi.object({
          account: Joi.string().required().description("账户名称"),
          password: Joi.string().required().description("账户密码"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/phone",
    handler: async (req, res) => {
      try {
        const phone = req.payload.phone;
        const code = req.payload.code;

        const testData = [
          { data: phone, tag: 1 },
          { data: code, tag: 1 },
        ];

        return Test(testData)
          ? query(req, allSQL.phone(phone, code))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "手机号验证登录接口",
      notes: "前端传入 phone code 进行登录验证",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          phone: Joi.string().required().description("手机号"),
          code: Joi.string().required().description("验证码"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/regis",
    handler: async (req, res) => {
      try {
        const account = req.payload.account;
        const password = req.payload.password;
        const phone = req.payload.phone;

        const testData = [
          { data: account, tag: "2" },
          { data: password, tag: "2" },
          { data: phone, tag: "1" },
        ];

        console.log(Test(testData));
        return Test(testData)
          ? query(req, allSQL.regis(account, password, phone))
          : { message: "403" };
      } catch (error) {
        console.log(error);
      }
    },
    options: {
      description: "用户注册",
      notes: "前端传入 账号 密码 合法验证并存入数据库",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          account: Joi.string().required().description("账号"),
          password: Joi.string().required().description("密码"),
          phone: Joi.string().required().description("手机号"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/changePWD",
    handler: async (req, res) => {
      try {
        const account = req.payload.account;
        const oldPWD = req.payload.oldPWD;
        const newPWD = req.payload.newPWD;

        const testData = [
          { data: account, tag: 2 },
          { data: oldPWD, tag: 2 },
          { data: newPWD, tag: 2 },
        ];

        return Test(testData)
          ? query(req, allSQL.changePWD(account, oldPWD, newPWD))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "更改密码 + 设置新密码",
      notes: "前端传入 账号 密码 进行合法验证",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          account: Joi.string().required().description("账号"),
          oldPWD: Joi.string().required().description("老密码"),
          newPWD: Joi.string().required().description("新密码"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/updateUserInfo",
    handler: async (req, res) => {
      try {
        const account = req.payload.account;
        const password = req.payload.password;
        const username = req.payload.username;
        const ID_card_type = req.payload.ID_card_type;
        const ID_card_num = req.payload.ID_card_num;
        const postcode = req.payload.postcode;
        const address = req.payload.address;
        const security = req.payload.security;
        const security_answer = req.payload.security_answer;
        const upload_ID_Img = req.payload.upload_ID_Img;
        req.log("Log Here");
        return query(
          req,
          allSQL.updateUserInfo(
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
          )
        );
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "更新个人信息",
      notes: "前端传入姓名、证件号码、邮政编码、地址、账号、密保问题、密保答案",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          account: Joi.string().required().description("账号"),
          password: Joi.string().required().description("密码"),
          username: Joi.string().required().description("姓名"),
          ID_card_type: Joi.string().required().description("证件类型"),
          ID_card_num: Joi.string().required().description("证件号码"),
          postcode: Joi.string().required().description("邮政编码"),
          address: Joi.string().required().description("地址"),
          security: Joi.string().required().description("密保问题"),
          security_answer: Joi.string().required().description("密保答案"),
          upload_ID_Img: Joi.string()
            .required()
            .description("是否上传证件照片"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/updateUser",
    handler: async (req, res) => {
      try {
        const phone = req.payload.phone;
        const postcode = req.payload.postcode;
        const account = req.payload.account;
        req.log("Log Here");

        const testData = [
          { data: phone, tag: "3" },
          { data: postcode, tag: "3" },
          { data: account, tag: "2" },
        ];

        return Test(testData)
          ? query(req, allSQL.updateUser(phone, postcode, account))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "查看详情时通过修改数据更新个人信息方面的数据库数据",
      notes: "需要传入修改页面的所有个人信息方面的参数",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          phone: Joi.string().required().description("手机号"),
          postcode: Joi.string().required().description("邮箱编码"),
          account: Joi.string().required().description("账号"),
        }),
      },
    },
  },
];

module.exports = user;
