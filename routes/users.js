/*
 * @Descripttion: 用户路由模块
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const service = require("../services/userService");

// 登录注册校验
const validator = [
  body("username").isString().withMessage("用户名类型错误"),
  body("password").isString().withMessage("密码类型错误"),
];

// 用户登录路由
router.post("/login", validator, service.login);
router.post("/register", validator, service.register);


module.exports = router;