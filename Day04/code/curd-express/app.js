/**
 * app.js入口模块
 * 职责：
 *  创建服务
 *  服务相关的配置
 *      模板引擎
 *      body-parse 解析表单post请求体
 *      提供静态资源服务
 *  挂载路由
 *   监听端口启动服务
 */

var express = require('express');
var template = require('art-template');
var router = require('./router');
var bodyParser = require('body-parser');

var app = express();
//配置模板引擎和body-parser一定要在app.use(router);挂载路由之前
// 配置bodyParser中间件（插件，专门用来解析表单post请求体）
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.engine('html',require('express-art-template'));

// 开放静态资源
app.use('/node_modules/',express.static('./node_modules/'));
app.use('/public/',express.static('./public/'));

// router(app);
// 把路由容器挂载到app服务中
app.use(router);

app.listen(3000,function () {
    console.log('running');
});