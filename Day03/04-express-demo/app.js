// 0.安装
// 1、引包
var express = require('express');

// 2、创建服务器应用程序,相当于http.creatServer()
var app = express();

// 在Express中开放资源就是一个API的事
// 公开指定目录
// 可以访问public目录下的所有资源
app.use('/public/',express.static('./public/'));

// 当服务器收到get请求 / 的时候，执行回调处理函数
// 用这个框架不用写res.setHeader('Content-Type','text/html;charset=utf-8');了
// 对于没有设定的请求路径，默认会返回can not get XXX
app.get('/',function (req,res) {
    res.end(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <h1>hello express</h1>
    </body>
    </html>`);
});

app.get('/about',function (req,res) {
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    res.end('关于我');
});

// 默认查询路径不包括？后边的查询字符串
app.get('/pinglun',function (req,res) {
    var name = req.query;
    var nameStr = JSON.stringify(name);
    res.end(nameStr);
    console.log(req.query);
    // 在Express中使用模板引擎有更好的方式：res.render('文件名',{模板对象});
    // 了解art-template结合express使用
});

app.listen(3000,function () {
    console.log('app is running at port 3000');
});