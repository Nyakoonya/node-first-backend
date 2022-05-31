/*
 * @Descripttion: 初始化路由，自定义全局异常处理中间件
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */
const express = require("express");
const router = express.Router(); // 注册路由
const userRouter = require("./users"); // 引入user路由模块
const homeRouter = require("./home");
const { jwtAuth, decode } = require("../utils/user-jwt"); // 引入jwt认证函数

router.use(jwtAuth); //注入认证模块
router.use("/api", userRouter); //注入用户路由模块
router.use("/api", homeRouter);

// 自定义全局统一的异常处理中间件
router.use((err, req, res, next) => {
  // 自定义用户认证失败的错误返回
  console.log("err router 全局:>> ", err);
  if (err && err.name === "UnauthorizedError") {
    const { status = 401 } = err;
    // 抛出401异常
    res.status(status).json({
      code: status,
      msg: "授权过期，请重新登录",
      data: null,
    });
  } else {
    const { output } = err || {};
    // 错误码和错误信息
    const errCode = (output && output.statusCode) || 500;
    const errMsg =
      (output && output.payload && output.payloa.error) || err.message;
    res.status(errCode).json({
      code: errCode,
      msg: errMsg,
    });
  }
});

module.exports = router;
