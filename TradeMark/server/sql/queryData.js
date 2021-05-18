/*
 * @author: DSCode
 * @create: 2021-03-26 14:28 PM
 * @license: MIT
 * @lastAuthor: DSCode
 * @lastEditTime: 2021-04-30 16:02 PM
 * @desc: Run SQL
 */
'use strict';

/**
 * 执行SQL语句的函数，自带异常捕获
 * @param {*} req Request 请求体
 * @param {*} sql 需要执行的SQL
 * @returns 执行 SQL 之后的结果
 */
module.exports = async (req, sql) => {
  let result = '';
  try {
    result = req.app.db.query(sql);
    console.log(
      '🔥 -> file: queryData.js -> line 21 -> module.exports= -> result',
      result
    );
  } catch (error) {
    result = error;
  }
  return result;
};
