/*
 * @Descripttion: 业务逻辑处理 - 用户相关接口
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */
const { querySql, queryOne } = require("../utils/index.js");
const { md5, decodeAes } = require("../utils/md5");
const jwt = require("jsonwebtoken");
const boom = require("boom");
const { body, validationResult } = require("express-validator");
const {
  CODE_ERROR,
  CODE_SUCESS,
  PRIVATE_KEY,
  JWT_EXPIRED,
} = require("../utils/constant");
const { decode } = require("../utils/user-jwt");

function login(req, res, next) {
  const err = validationResult(req);
  console.log("err login:>> ", err);
  if (err.isEmpty()) {
    console.log("right ------:>> ");
    // 错误为空，验证正确
    let { username, password } = req.body;
    // 解密前端
    password = decodeAes(password);
    // md5加密
    password = md5(password);
    const query = `select * from sys_user where username='${username}' and password='${password}'`;
    querySql(query).then((user) => {
      console.log("user :>> ", user);
      if (user && user.length > 0) {
        // 登录成功，签发一个token并返回给前端
        const token = jwt.sign(
          // payload: 签发的token中需要包含的一些数据
          { username },
          // 私钥
          PRIVATE_KEY,
          // 设置过期时间
          { expiresIn: JWT_EXPIRED }
        );
        let userData = {
          id: user[0].id,
          username: user[0].username,
          gmt_create: user[0].gmt_create,
          gmt_modify: user[0].gmt_modify,
        };
        res.json({
          code: CODE_SUCESS,
          msg: "登录成功",
          data: {
            token,
            userData,
          },
        });
      } else {
        res.json({
          code: CODE_ERROR,
          msg: "用户名或密码错误",
          data: null,
        });
      }
    });
  } else {
    console.log("fail :>> ");
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  }
}

// 注册
function register(req, res, next) {
  const error = validationResult(req);
  if (error.isEmpty()) {
    let { username, password } = req.body;
    findUser(username).then((data) => {
      console.log("data ----register:>> ", data);
      if (data) {
        res.json({
          code: CODE_ERROR,
          msg: "用户已存在",
          data: null,
        });
      } else {
        passowrd = md5(decodeAes(password));
        const query = `insert into sys_user (username, password) values ('${username}', '${password}')`;
        querySql(query).then((result) => {
          if (!result || result.length === 0) {
            res.json({
              code: CODE_ERROR,
              msg: "注册失败",
              data: null,
            });
          } else {
            const query = `select * from sys_user where username='${username}' and password='${password}'`;
            querySql(query).then((user) => {
              console.log("user :>> ", user);
              if (user && user.length > 0) {
                // 登录成功，签发一个token并返回给前端
                const token = jwt.sign(
                  // payload: 签发的token中需要包含的一些数据
                  { username },
                  // 私钥
                  PRIVATE_KEY,
                  // 设置过期时间
                  { expiresIn: JWT_EXPIRED }
                );
                let userData = {
                  id: user[0].id,
                  username: user[0].username,
                  gmt_create: user[0].gmt_create,
                  gmt_modify: user[0].gmt_modify,
                };
                res.json({
                  code: CODE_SUCESS,
                  msg: "注册成功",
                  data: {
                    token,
                    userData,
                  },
                });
              } else {
                res.json({
                  code: CODE_ERROR,
                  msg: "用户名或密码错误",
                  data: null,
                });
              }
            });
          }
        });
      }
    });
  }
}

function findUser(username) {
  const query = `select id, username from sys_user where username='${username}'`;
  return queryOne(query);
}
module.exports = {
  login,
  register,
};
