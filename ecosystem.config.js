/*
 * @Descripttion: pm2配置文件
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */

 module.exports = {
     apps: [{
         name: 'node_first_backend',
         script: 'app.js',
         instances: 1,
         autorestart: true,
         watch: false,
         max_memory_restart: '1G',
         env: {
             NODE_ENV: 'development'
         },
         env_production: {
             NODE_ENV: 'production'
         }
     }]
 }
