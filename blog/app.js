var express = require('express');
var path = require('path');
var template = require('art-template');
var router = require('./router');
var bodyParser = require('body-parser');
var session = require('express-session')

// 创建服务
var app = express();

// 配置express-art-template
app.engine('html', require('express-art-template'));
app.set('views',path.join(__dirname,'./views'));


// 配置bodyParser中间件（插件，专门用来解析表单post请求体）一定要在app.use(router)之前
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// 在Express这个框架中，默认不支持session和cookie
// 可以使用第三方中间件：express-session来解决
/**
 * 1、安装
 * 2、配置
 * 3、使用
 *      当把这个插件配置好后，我们就可以通过req.session来访问和设置session成员
 *      添加session数据:req.session.foo = 'bar'
 *      访问session数据:req.session.foo
 */
app.use(session({
    // 配置加密字符串，它会在原有的加密基础上和这个字符串拼起来去加密
    // 目的：增加安全性
    secret: 'itcast',
    resave: false,
    // 无论是否使用session,都默认给用户分配一把钥匙
    saveUninitialized: true
  }))


// 把路由挂载到app中
app.use(router);

// 配置一个处理404的中间件
app.use(function (req,res) {
    return res.render('404.html');
});

// 配置一个全局错误处理的中间件
// 这里参数一定是4个
app.use(function (err,req,res,next) {
    return res.status(500).json({
        err_code : 500,
        message: err.message
    });
});

// 开放资源
app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));

app.listen(3000,function () {
    console.log('running~~~');
});