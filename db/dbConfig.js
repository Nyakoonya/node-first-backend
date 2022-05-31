/*
 * @Descripttion: 数据库基础配置
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */
const mysql = {
    host: 'localhost', //主机名称，一般是本机
    port: '3306', //数据库的端口号，mysql默认为3306
    user: 'root',
    password: 'LaiLaiBear',
    database: 'node_first_db',
    connectionTimeout: 5000 //连接超时
}

module.exports = mysql;