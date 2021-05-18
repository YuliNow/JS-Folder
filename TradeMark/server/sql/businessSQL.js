/*
 * @author: DSCode
 * @create: 2021-03-27 16:12 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-05-13 14:48 PM
 * @desc: 所有业务SQL
 */
"use strict";

/** ----------------------------------------------------------------
 * TODO Business APIs
 ---------------------------------------------------------------- */

/**
 * 查询所有业务类型信息
 * @returns Select businesstype SQL
 */
const getAllBusinessTypes = () => {
  return "SELECT * FROM `trademarkdata`.`businesstype`;";
};

/**
 * 根据业务名称查询某一个业务类型详细信息
 * @param {*} TypeName 业务类型名称
 * @returns get All Business Type By ID SQL
 */
const getAllBusinessTypeByName = (TypeName) => {
  return (
    "SELECT `business_info` FROM `trademarkdata`.`businesstype` WHERE `business_name` = '" +
    TypeName +
    "';"
  );
};

/**
 * 查询所有提交的单号信息,不区分用户,不筛选字段
 * @returns get all business data
 */
const getAllBusinessInfo = () => {
  return "SELECT * FROM `trademarkdata`.`business`;";
};

/**
 * 根据用户 ID 查询所有业务信息
 * @param {*} accountID 用户ID
 * @returns getAllBusinessInfoByAccount SQL
 */
const getAllBusinessInfoByAccount = (account) => {
  return (
    "SELECT * FROM `trademarkdata`.`business` WHERE `account` = '" +
    account +
    "';"
  );
};

/**
 * 根据单号查询业务详细信息
 * @param {*} orderID 单号
 * @returns get Business Info By Order ID SQL
 */
const getBusinessInfoByOrderID = (orderID) => {
  return (
    "SELECT * FROM `trademarkdata`.`business` WHERE `order_id` = '" +
    orderID +
    "';"
  );
};

/**
 * 新增业务信息
 * @param {*} account 账号 登录用户,跟用户表进行外键绑定
 * @param {*} applicant_type 申请人类型 1.企业/单位申请 2.自然人 3.其他
 * @param {*} applicant_name 申请人姓名/主题名称
 * @param {*} valid_license 有效执照 1.身份证 2.营业执照 3.其他
 * @param {*} certificate_ID 执照号码/证件号码
 * @param {*} certificate_type 证件类型 1.身份证 2.营业执照
 * @param {*} address 地址信息
 * @param {*} phone 联系电话
 * @param {*} identity 所属省份
 * @param {*} city 所属城市
 * @param {*} EN_name 英文名称
 * @param {*} legal_person 企业法人
 * @param {*} EN_address 英文地址
 * @param {*} applicant_nationality 申请人国籍/地区
 * @param {*} postcode 邮政编码
 * @param {*} contacts 联系人
 * @param {*} agency_name 代理机构名称
 * @param {*} domestic_recipients 外国申请人的国内接收人
 * @param {*} recipient_address 国内接收人地址
 * @param {*} application_country 申请/展出国家/地区
 * @param {*} application_date 申请日期
 * @param {*} application_instructions 商标申请说明
 * @param {*} application_priority 要求优先权声明：1.基于第一次申请的优先权 2.基于展会的优先权 3.优先权证明文件后补
 * @param {*} trademark_info 商标说明
 * @param {*} application_number 申请号`
 * @param {*} trademark_type_id 商标类别编号
 * @param {*} nets 办理网点
 * @param {*} business_type 业务类型`
 * @param {*} status 审核状态 1.审核中,2.审核完成,3.审核失败4.预约成功`
 * @returns 新增业务信息 SQL
 */
const createBusiness = (
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
  trademark_type_id,
  trademark_project,
  nets
) => {
  return (
    "INSERT INTO `trademarkdata`.`business`(`account`,  \
  `applicant_type`,`applicant_name`,`valid_license`,\
  `certificate_ID`,`certificate_type`,`address`, `identity`,`city`,\
  `EN_name`,`legal_person`,`EN_address`,`applicant_nationality`,`postal_code`,\
  `contacts`,`agency_name`,`domestic_recipients`,`recipient_address`,`application_country`,`application_date`,`application_instructions`,\
  `application_priority`, `trademark_info`,`trademark_type_id`, `trademark_project`, `nets`)\
   VALUES ('" +
    account +
    "','" +
    applicant_type +
    "','" +
    applicant_name +
    "','" +
    valid_license +
    "','" +
    certificate_ID +
    "','" +
    certificate_type +
    "','" +
    address +
    "','" +
    identity +
    "','" +
    city +
    "','" +
    EN_name +
    "','" +
    legal_person +
    "','" +
    EN_address +
    "','" +
    applicant_nationality +
    "','" +
    postal_code +
    "','" +
    contacts +
    "','" +
    agency_name +
    "','" +
    domestic_recipients +
    "','" +
    recipient_address +
    "','" +
    application_country +
    "','" +
    application_date +
    "','" +
    application_instructions +
    "','" +
    application_priority +
    "','" +
    trademark_info +
    "','" +
    trademark_type_id +
    "','" +
    trademark_project +
    "','" +
    nets +
    "')"
  );
};

/**
 * 删除单一业务
 * @param {*} order_id 业务单号
 * @returns delete business SQL
 */
const deleteBusiness = (order_id) => {
  return (
    "DELETE FROM `trademarkdata`.`business` WHERE `order_id` = '" +
    order_id +
    "';"
  );
};

/**
 * 根据业务状态查询相应业务数据
 * @param {*} account 账号
 * @param {*} status 业务状态
 * @returns get business By status SQL
 */
const getBusinessInfoByStatus = (account, status) => {
  return (
    "SELECT * FROM `trademarkdata`.`business` WHERE `account` = '" +
    account +
    "' AND `status` = '" +
    status +
    "';"
  );
};

/**
 * 根据单号以及原业务状态更新新业务状态
 * @param {*} orderID 单号
 * @param {*} oldstatus 原业务状态
 * @param {*} newstatus 新业务状态
 * @returns
 */
const updateBusinessStatus = (orderID, oldstatus, newstatus) => {
  return (
    "UPDATE `trademarkdata`.`business` SET `status`= '" +
    newstatus +
    "' WHERE order_id= '" +
    orderID +
    "' AND `status`= '" +
    oldstatus +
    "';"
  );
};

/**
 * 查看详情时通过修改数据更新数据库数据
 * @param {*} applicant_name
 * @param {*} EN_name
 * @param {*} address
 * @param {*} EN_address
 * @param {*} contacts
 * @param {*} agency_name
 * @param {*} domestic_recipients
 * @param {*} recipient_address
 * @param {*} postal_code
 * @param {*} application_instructions
 * @param {*} application_country
 * @param {*} application_number
 * @param {*} trademark_type_id
 * @param {*} trademark_project
 * @param {*} order_id
 * @param {*} status
 * @returns
 */
const updateBusiness = (
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
) => {
  return (
    "UPDATE `trademarkdata`.`business` SET applicant_name='" +
    applicant_name +
    "',EN_name='" +
    EN_name +
    "',address='" +
    address +
    "',EN_address='" +
    EN_address +
    "',contacts='" +
    contacts +
    "',agency_name='" +
    agency_name +
    "',domestic_recipients='" +
    domestic_recipients +
    "',recipient_address='" +
    recipient_address +
    "',postal_code='" +
    postal_code +
    "',application_instructions='" +
    application_instructions +
    "',application_country='" +
    application_country +
    "',application_number='" +
    application_number +
    "',trademark_type_id='" +
    trademark_type_id +
    "',trademark_project='" +
    trademark_project +
    "',status='" +
    status +
    "'WHERE order_id='" +
    order_id +
    "';"
  );
};

/**
 * 根据业务审核状态删除所有数据
 * @param {*} status 业务审核状态
 * @returns
 */
const deleteAllBussinessStatus = (status) => {
  return (
    "DELETE FROM `trademarkdata`.`business` WHERE `status` = '" + status + "';"
  );
};

/**
 * 点击申请时，根据订单号 更新业务审核状态以及添加申请号、业务类型
 * @param {*} application_number 申请号
 * @param {*} business_type 业务类型
 * @param {*} status 业务审核状态
 * @param {*} orderID 账号
 * @returns
 */
const intoAuditStatus = (
  application_number,
  business_type,
  status,
  account
) => {
  return (
    "UPDATE `trademarkdata`.`business` SET `application_number`= '" +
    application_number +
    "',`business_type` = '" +
    business_type +
    "',`status` ='" +
    status +
    "'WHERE `account`= '" +
    account +
    "'AND `order_id` = (select order_id from `trademarkdata`.`business` order by order_id desc LIMIT 1);"
  );
};

module.exports = {
  getAllBusinessTypes: getAllBusinessTypes,
  getAllBusinessTypeByName: getAllBusinessTypeByName,
  getAllBusinessInfo: getAllBusinessInfo,
  getAllBusinessInfoByAccount: getAllBusinessInfoByAccount,
  getBusinessInfoByOrderID: getBusinessInfoByOrderID,
  createBusiness: createBusiness,
  deleteBusiness: deleteBusiness,
  getBusinessInfoByStatus: getBusinessInfoByStatus,
  updateBusinessStatus: updateBusinessStatus,
  updateBusiness: updateBusiness,
  deleteAllBussinessStatus: deleteAllBussinessStatus,
  intoAuditStatus: intoAuditStatus,
};
