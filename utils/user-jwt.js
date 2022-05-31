/*
 * @Descripttion: jwt-token验证和解析函数
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */
const jwt = require("jsonwebtoken"); //加密解密token
const expressJwt = require("express-jwt"); //实现jwt认证
const { PRIVATE_KEY } = require("./constant"); //引入自定义的jwt密钥

// 验证token是否过期
const jwtAuth = expressJwt({
  // 设置密钥
  secret: PRIVATE_KEY,
  // true为校验，false为不校验
  credentialsRequired: true,
  // 自定义获取token的函数
  getToken: (req) => {
    if (req.headers.authorization) {
      return req.headers.authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
  },
}).unless({
  // 设置jwt认证白名单
  path: ["/", "/api/login", "/api/register", "/api/resetPwd"],
});

// jwt-token解析
function decode(req) {
  const token = req.get("Authorization");
  return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
  jwtAuth,
  decode,
};
