/*
Apache服务器，这个软件默认有一个www目录，所有存放在www目录中的资源都可以通过
网址来浏览
*/
//1、 引入http核心模块
var http = require('http');
// 引入文件系统和心模块
var fs = require('fs');
// 引入path核心模块，用于获取文件后缀名
var path = require('path');

// 2、创建server
var server = http.createServer();

var wwwDir = 'E:/studyDocument/www';

//3、 注册request事件
server.on('request',function(req,res){
    var url = req.url;
    console.log( 'url是: '+url);
    // 这个需要写在里边，刷新时filePath需要重新初始化为/index.html（针对只有根目录的情况）
    // 写在外边时，filePath=/favicon.ico，刷新，会成空白或报错
    var filePath = '/index.html';
    if(url != '/'){
        filePath = url;
    };
    var extname = path.extname(filePath);
    // console.log(extname);
    // 如果是txt文档，设置utf-8编码格式
    if(extname === '.txt'){
        res.setHeader('Content-Type','text/plain;charset=utf-8');
    }
    console.log(filePath,wwwDir+filePath);
    fs.readFile(wwwDir+filePath,function(err,data){
        if(err){
            console.log('404 not found'+err);
            res.end('404 not found');
        }else{
            res.end(data);
        }
    });
    
});
// 4、监听端口号启动服务器
server.listen(3000,function(){
    console.log('running~~~');
});