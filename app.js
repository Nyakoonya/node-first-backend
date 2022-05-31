/*
 * @Descripttion: 入口文件
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors'); // 跨域模块
const routes = require('./routes') // 导入自定义路由
const app = express();

app.use(bodyParser.json()); // 解析json
app.use(bodyParser.urlencoded({extended: true})); //解析 application/x-www-form-urlencoded

app.use(cors()); //注入cors模块解决跨域

app.use('/', routes); //routes路由对象中的路由都会匹配到'/'路由后面

app.listen(8088, ()=>{
    console.log('服务已启动http://localhost:8088');
})