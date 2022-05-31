/*
 * @Descripttion: 连接mysql模块
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */

const mysql = require("mysql");
const config = require("../db/dbConfig");

//  连接mysql
function connect() {
  const { host, user, password, database } = config;
  return mysql.createConnection({
    host,
    user,
    password,
    database,
  });
}

// 新建查询连接
function querySql(sql) {
  const _connect = connect();
  return new Promise((resolve, reject) => {
    try {
      _connect.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    } catch (err) {
      console.log("err :>> ", err);
      reject(err);
    } finally {
      // 释放连接
      _connect.end();
    }
  });
}

// 查询一条语句
function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql)
      .then((res) => {
        console.log("res :>> ", res);
        if (res && res.length > 0) {
          resolve(res[0]);
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        console.log("err queryOne:>> ", err);
        reject(err);
      });
  });
}

module.exports = {
  querySql,
  queryOne,
};
