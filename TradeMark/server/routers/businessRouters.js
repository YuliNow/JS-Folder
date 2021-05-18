/*
 * @author: DSCode
 * @create: 2021-03-26 10:00 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-13 14:49 PM
 * @desc: 用户路由定义集
 */

"use strict";

const allSQL = require("../sql/businessSQL");
const userSQL = require("../sql/userSQL");
const query = require("../sql/queryData");
const Joi = require("joi");

const Test = require("../test/businessTest");

// TODO 业务路由
const business = [
  {
    method: "get",
    path: "/getAllBusinessTypes",
    handler: async (req, res) => {
      return query(req, allSQL.getAllBusinessTypes());
    },
    options: {
      description: "获取所有类型信息",
      notes: "获取所有类型信息，包含所有！！！",
      tags: ["api"],
    },
  },
  {
    method: "post",
    path: "/getAllBusinessTypeByName",
    handler: async (req, res) => {
      try {
        const TypeName = req.payload.TypeName;

        // ! 服务端第二次检测，判断是否为空 或 是否合法
        const testData = [{ data: TypeName, tag: "1" }];

        return Test(testData)
          ? query(req, allSQL.getAllBusinessTypeByName(TypeName))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "根据业务类型名称查询所有业务信息",
      notes: "前端传入 ID 进行查询",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          TypeName: Joi.string().description("业务类型名称"),
        }),
      },
    },
  },
  {
    method: "get",
    path: "/getAllBusinessInfo",
    handler: async (req, res) => {
      try {
        // ! 获取用户与业务数据信息，并合并同一获取
        const user = await query(req, userSQL.getAllAccounts);
        const business = await query(req, allSQL.getAllBusinessInfo());

        return [user, business];
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "查询所有提交的单号信息",
      notes: "不区分用户,不筛选字段",
      tags: ["api"],
    },
  },
  {
    method: "post",
    path: "/getAllBusinessInfoByAccount",
    handler: async (req, res) => {
      try {
        const account = req.payload.account;

        const testData = [{ data: account, tag: "2" }];

        return Test(testData)
          ? query(req, allSQL.getAllBusinessInfoByAccount(account))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "用户所有的业务信息",
      notes: "根据用户 账号 查询所有业务信息",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          account: Joi.string().description("账号ID"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/getBusinessInfoByOrderID",
    handler: async (req, res) => {
      try {
        const orderID = req.payload.orderID;

        const testData = [{ data: orderID, tag: "1" }];

        return Test(testData)
          ? query(req, allSQL.getBusinessInfoByOrderID(orderID))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "根据单号查询某一个业务详细信息",
      notes: "根据单号 查询业务详细信息",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          orderID: Joi.string().description("单号"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/createBusiness",
    handler: async (req, res) => {
      try {
        const account = req.payload.account;
        const applicant_type = req.payload.applicant_type;
        const applicant_name = req.payload.applicant_name;
        const valid_license = req.payload.valid_license;
        const certificate_ID = req.payload.certificate_ID;
        const certificate_type = req.payload.certificate_type;
        const address = req.payload.address;
        const identity = req.payload.identity;
        const city = req.payload.city;
        const EN_name = req.payload.EN_name;
        const legal_person = req.payload.legal_person;
        const EN_address = req.payload.EN_address;
        const applicant_nationality = req.payload.applicant_nationality;
        const postal_code = req.payload.postal_code;
        const contacts = req.payload.contacts;
        const agency_name = req.payload.agency_name;
        const domestic_recipients = req.payload.domestic_recipients;
        const recipient_address = req.payload.recipient_address;
        const application_country = req.payload.application_country;
        const application_date = req.payload.application_date;
        const application_instructions = req.payload.application_instructions;
        const application_priority = req.payload.application_priority;
        const trademark_info = req.payload.trademark_info;
        // const application_number = req.payload.application_number;
        const trademark_type_id = req.payload.trademark_type_id;
        const trademark_project = req.payload.trademark_project;
        const nets = req.payload.nets;
        // const business_type = req.payload.business_type;

        req.log(
          allSQL.createBusiness(
            account,
            applicant_type,
            applicant_name,
            valid_license,
            certificate_ID,
            certificate_type,
            address,
            identity,
            city,
            EN_name,
            legal_person,
            EN_address,
            applicant_nationality,
            postal_code,
            contacts,
            agency_name,
            domestic_recipients,
            recipient_address,
            application_country,
            application_date,
            application_instructions,
            application_priority,
            trademark_info,
            // application_number,
            trademark_type_id,
            trademark_project,
            nets
          ),
          "SQL 测试语句"
        );

        // const testData = [
        //   { data: account, tag: "2" },
        //   { data: applicant_type, tag: "2" },
        //   { data: applicant_name, tag: "2" },
        // ];

        return query(
          req,
          allSQL.createBusiness(
            account,
            applicant_type,
            applicant_name,
            valid_license,
            certificate_ID,
            certificate_type,
            address,
            identity,
            city,
            EN_name,
            legal_person,
            EN_address,
            applicant_nationality,
            postal_code,
            contacts,
            agency_name,
            domestic_recipients,
            recipient_address,
            application_country,
            application_date,
            application_instructions,
            application_priority,
            trademark_info,
            // application_number,
            trademark_type_id,
            trademark_project,
            nets
          )
        );
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "创建新的业务",
      notes: "创建新业务，字段多，注意验证",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          account:
            Joi.string().description("账号 登录用户,跟用户表进行外键绑定"),
          applicant_type: Joi.string().description(
            "申请人类型 1.企业/单位申请2.自然人3.其他"
          ),
          applicant_name: Joi.string().description("申请人姓名/主题名称"),
          valid_license: Joi.string().description(
            "有效执照 1.身份证 2.营业执照3.其他"
          ),
          certificate_ID: Joi.string().description("执照号码/证件号码"),
          certificate_type:
            Joi.string().description("证件类型 1.身份证 2.营业执照"),
          address: Joi.string().description("地址信息"),
          identity: Joi.string().description("所属省份"),
          city: Joi.string().description("所属城市"),
          EN_name: Joi.string().description("英文名称"),
          legal_person: Joi.string().description("企业法人"),
          EN_address: Joi.string().description("英文地址"),
          applicant_nationality: Joi.string().description("申请人国籍/地区"),
          postal_code: Joi.string().description("邮政编码"),
          contacts: Joi.string().description("联系人"),
          agency_name: Joi.string().description("代理机构名称"),
          domestic_recipients:
            Joi.string().description("外国申请人的国内接收人"),
          recipient_address: Joi.string().description("国内接收人地址"),
          application_country: Joi.string().description("申请/展出国家/地区"),
          application_date: Joi.string().description("申请日期"),
          application_instructions: Joi.string().description("商标申请说明"),
          application_priority: Joi.string().description(
            "要求优先权声明：1.基于第一次申请的优先权 2.基于展会的优先权 3.优先权证明文件后补"
          ),
          trademark_info: Joi.string().description("商标说明"),
          // application_number: Joi.string().description("申请号"),
          trademark_type_id: Joi.string().description("商标类别编号"),
          trademark_project: Joi.string().description("商品/服务项目"),
          nets: Joi.string().description("办理网点"),
          // business_type: Joi.string().description("业务类型"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/deleteBusiness",
    handler: async (req, res) => {
      try {
        const orderID = req.payload.orderID;

        const testData = [{ data: orderID, tag: 1 }];

        return Test(testData)
          ? query(req, allSQL.deleteBusiness(orderID))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "根据单号删除某一个业务详细信息",
      notes: "根据单号删除单一业务信息",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          orderID: Joi.string().description("单号"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/getBusinessInfoByStatus",
    handler: async (req, res) => {
      try {
        const account = req.payload.account;
        const status = req.payload.status;

        const testData = [
          { data: account, tag: 2 },
          { data: status, tag: 1 },
        ];

        return Test(testData)
          ? query(req, allSQL.getBusinessInfoByStatus(account, status))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "根据业务状态信息查询业务信息",
      notes: "需要传入账号以及业务状态 1.申请中,2,成功,3,失败,4,预约成功",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          account: Joi.string().description("账号"),
          status: Joi.string().description("状态"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/updateBusinessStatus",
    handler: async (req, res) => {
      try {
        const orderID = req.payload.orderID;
        const oldstatus = req.payload.oldstatus;
        const newstatus = req.payload.newstatus;

        const testData = [
          { data: orderID, tag: 1 },
          { data: oldstatus, tag: 1 },
          { data: newstatus, tag: 1 },
        ];

        return Test(testData)
          ? query(
              req,
              allSQL.updateBusinessStatus(orderID, oldstatus, newstatus)
            )
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "根据单号以及审核状态更新审核状态",
      notes: "需要传入单号以及业务状态 1.申请中,2,成功,3,失败,4,预约成功",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          orderID: Joi.string().description("单号"),
          oldstatus: Joi.string().description("原业务状态"),
          newstatus: Joi.string().description("新业务状态"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/updateBusiness",
    handler: async (req, res) => {
      try {
        const applicant_name = req.payload.applicant_name;
        const EN_name = req.payload.EN_name;
        const address = req.payload.address;
        const EN_address = req.payload.EN_address;
        const contacts = req.payload.contacts;
        const agency_name = req.payload.agency_name;
        const domestic_recipients = req.payload.domestic_recipients;
        const recipient_address = req.payload.recipient_address;
        const postal_code = req.payload.postal_code;
        const application_instructions = req.payload.application_instructions;
        const application_country = req.payload.application_country;
        const application_number = req.payload.application_number;
        const trademark_type_id = req.payload.trademark_type_id;
        const trademark_project = req.payload.trademark_project;
        const status = req.payload.status;
        const order_id = req.payload.order_id;

        const testData = [
          { data: applicant_name, tag: "1" },
          { data: address, tag: "1" },
          { data: contacts, tag: "1" },
          { data: agency_name, tag: "1" },
          { data: postal_code, tag: "1" },
          { data: application_instructions, tag: "1" },
          { data: application_country, tag: "1" },
          { data: application_number, tag: "1" },
          { data: trademark_type_id, tag: "1" },
          { data: trademark_project, tag: "1" },
          { data: status, tag: "1" },
          { data: order_id, tag: "1" },
        ];
        query(
          req,
          allSQL.updateBusiness(
            applicant_name,
            EN_name,
            address,
            EN_address,
            contacts,
            agency_name,
            domestic_recipients,
            recipient_address,
            postal_code,
            application_instructions,
            application_country,
            application_number,
            trademark_type_id,
            trademark_project,
            status,
            order_id
          )
        );
        return Test(testData)
          ? query(
              req,
              allSQL.updateBusiness(
                applicant_name,
                EN_name,
                address,
                EN_address,
                contacts,
                agency_name,
                domestic_recipients,
                recipient_address,
                postal_code,
                application_instructions,
                application_country,
                application_number,
                trademark_type_id,
                trademark_project,
                status,
                order_id
              )
            )
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "查看详情时通过修改数据更新业务方面的数据库数据",
      notes: "需要传入修改页面的所有业务方面的参数",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          applicant_name: Joi.string().description("申请人名字"),
          EN_name: Joi.string().description("申请人英文名"),
          address: Joi.string().description("申请人地址"),
          EN_address: Joi.string().description("申请人地址英文"),
          contacts: Joi.string().description("联系人"),
          agency_name: Joi.string().description("代理机构名称"),
          domestic_recipients:
            Joi.string().description("外国申请人的国内接收人"),
          recipient_address: Joi.string().description("国内接收人地址"),
          postal_code: Joi.string().description("国内接收人邮政编码"),
          application_instructions: Joi.string().description("商标申请声明"),
          application_country: Joi.string().description("申请/展出国家/地区"),
          application_number: Joi.string().description("申请号"),
          trademark_type_id: Joi.string().description("类别"),
          trademark_project: Joi.string().description("商品/服务项目"),
          status: Joi.string().description("审核状态"),
          order_id: Joi.string().description("单号"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/deleteAllBussinessStatus",
    handler: async (req, res) => {
      try {
        const status = req.payload.status;

        const testData = [{ data: status, tag: 1 }];

        return Test(testData)
          ? query(req, allSQL.deleteAllBussinessStatus(status))
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description: "根据业务审核状态删除所有数据",
      notes: "需要传入业务状态 1.申请中,2,成功,3,失败,4,预约成功",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          status: Joi.string().description("业务状态"),
        }),
      },
    },
  },
  {
    method: "post",
    path: "/intoAuditStatus",
    handler: async (req, res) => {
      try {
        const application_number = req.payload.application_number;
        const business_type = req.payload.business_type;
        const status = req.payload.status;
        const account = req.payload.account;

        const testData = [
          { data: application_number, tag: 1 },
          { data: business_type, tag: 1 },
          { data: status, tag: 1 },
          { data: account, tag: 2 },
        ];

        return Test(testData)
          ? query(
              req,
              allSQL.intoAuditStatus(
                application_number,
                business_type,
                status,
                account
              )
            )
          : { message: "403" };
      } catch (error) {
        return error;
      }
    },
    options: {
      description:
        "点击申请时，根据账号 更新业务审核状态以及添加申请号、业务类型",
      notes: "需要传入申请号、业务类型、业务状态、账号",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          application_number: Joi.string().description("申请号"),
          business_type: Joi.string().description("业务类型"),
          status: Joi.string().description("业务状态"),
          account: Joi.string().description("账号"),
        }),
      },
    },
  },
];

module.exports = business;
