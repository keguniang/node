var express = require('express');
var md5 = require('blueimp-md5');
// 引进模型
var User = require('./models/user');
var router = express.Router();



router.get('/', function (req, res) {
    // res.send('hello');
    res.render('index.html');
});

router.get('/login', function (req, res) {
    res.render('login.html');
});

router.post('/login', function (req, res) {

});

router.get('/register', function (req, res) {
    res.render('register-synSubmit.html');
});

router.post('/register', function (req, res) {
    // 1、获取表单提交的数据 req.body
    // 2、操作数据库
    // 判断该用户是否存在  已存在 不允许注册    不存在，则注册新用户
    // 3、发送响应
    var body = req.body;
    User.findOne({
        $or: [{
            email: body.email
        }, {
            nickname: body.nickname
        }]

    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '服务端错误'
            });
        } else {
            // 这里的res.send的内容不会显示在客户端上，因为form表单是异步请求
            if (data) {
                // 邮箱或者昵称已存在
                // 重新渲染页面
                return res.render('register-synSubmit.html',{
                    err_message : '邮箱或者昵称已存在',
                    form : body
                });
            } else {
                // 现在存在的一些反查md5的软件，做两次为了更好的保密
                body.password = md5(md5(body.password));
                new User(body).save(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            err_code : 500,
                            message: 'server error'
                        });
                    } else {
                        // return res.status(200).send(JSON.stringify({
                        // JSON格式中的bool类型不用加引号
                        // 对象 foo : 'bar' 后边的bar得加上引号，不然会以为是变量
                        // success : true,
                        //     foo : 'bar'
                        // }));
                        // express 提供了一个方法json(),该方法接受一个对象作为参数，自动把对象转化为字符串发送给客户端
                        res.status(200).json({
                            err_code : 0,
                            message: 'ok'
                        });
                    }
                });
            }
        }
    });
});





module.exports = router;