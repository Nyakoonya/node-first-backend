/*
 * @Descripttion: 
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */
const md5 = require("./md5");

const getPwd = pwd => md5(pwd);
console.log('pwd :>> ', getPwd('111111'));