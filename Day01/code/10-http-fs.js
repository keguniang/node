// 1、加载http核心模块
var http = require('http');
var fs = require('fs');
// 2、创建服务
var server = http.createServer();
// 3、注册request请求事件
server.on('request',function(req,res){
    var url = req.url;
    if(url == '/'){
        
        fs.readFile('./resource/index.html',function(err,data){
            if(err){
                res.setHeader('Content-Type','text-plain;charset=utf-8');
                res.end('404 not found');
                // 阻止代码继续往后执行
                return;
            }else{
                res.setHeader('Content-Type','text/html;utf-8');
                res.end(data);
            }
        });
    }
});
// 4、监听端口号并启动服务器
server.listen(3000,function(){
    console.log('Server is running~~~');
});
