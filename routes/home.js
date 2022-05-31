/*
 * @Descripttion:
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */
const express = require("express");
const router = express.Router();
const service = require("../services/homeService");

router.get("/test", service.test);

module.exports = router;
