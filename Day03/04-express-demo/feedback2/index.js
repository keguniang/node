// 引入核心模块
var express = require('express');
var fs = require('fs');
var template = require('art-template');
// body-parser 是express的post请求中用来获得请求体(请求参数)的一种第三方包
// 因为post请求不会再通过url传递参数了,所以就使用body-parser来获取了
// ,配置之后会给请求中的req添加一个body属性来获取请求参数(获取页面提交表单的内容)
var bodyParser = require('body-parser');

// 创建服务器
var app = express();

/**配置
 * 指定.html使用的解析引擎
 * 第一个参数:表示当渲染以html后缀名的文件时,使用art-template模板引擎渲染
    require("express-art-template") 相当于加载了 express-art-template 加载后用它去渲染html格式的文件
    express-art-template整合了express和art-template
 */
app.engine('html', require('express-art-template'));

// 配置bodyParser中间件（插件，专门用来解析表单post请求体）
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// 修改默认的views目录
// app.set("views","设置的render的默认路径")


// 让public目录下的资源公开，使Index.html访问到bootstrap资源
app.use('/public', express.static('./public'));

var comments = [{
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
];

app.get('/', function (req, res) {
    // fs.readFile('./view/index.html',function (err,data) {
    //     if (err) {
    //         res.end('404 not found');
    //     }else {
    //         res.end(data);
    //     }
    // });
    // res对象本身是没有render方法的,当配置了express-art-template才会给其添加此方法
    //第一个参数：你要渲染的页面(写views目录下的相对路径,这里的views可以通过set方法修改) ；第二个参数：渲染的数据(一定要是json格式)
    res.render('index.html', {
        comments : comments
    });
});

// 加载首页
app.get('/index', function (req, res) {
    res.render('index.html', data);
});

// 加载留言页
app.get('/post', function (req, res) {
    res.render('post.html');
});

// 表单提交get 方法
// app.get('/comments', function (req, res) {
//         // req.query只能获取get请求到的数据
//         console.log(req.query);//{ name: 'aaa', message: 'aaa' }
//         var comment = req.query;
//         var dt = new Date();
//         var y = dt.getFullYear();
//         var m = dt.getMonth() + 1;
//         var d = dt.getDate();
//         var h = dt.getHours();
//         var mm = dt.getMinutes();
//         var s = dt.getSeconds();
//         var time = `${y}-${m}-${d} ${h}:${mm}:${s}`;
//         comment.dateTime = time;
//         comments.unshift(comment);
//         // 重定向，参数是重定向的路径
//         res.redirect('/');
// });


// 表单提交post 方法
app.post('/comments', function (req, res) {
    console.log(req.body);
    var comment = req.body;
    var dt = new Date();
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    var d = dt.getDate();
    var h = dt.getHours();
    var mm = dt.getMinutes();
    var s = dt.getSeconds();
    var time = `${y}-${m}-${d} ${h}:${mm}:${s}`;
    comment.dateTime = time;
    comments.unshift(comment);
    // 重定向，参数是重定向的路径
    res.redirect('/');
});

app.listen(3000, function () {
    console.log('running~~~');
});