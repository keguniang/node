// 1.加载http核心模块
var http = require('http');
// 2.创建一个web服务器
var server = http.createServer();
// 3.注册request请求事件
server.on('request',function(req,res){
    // 服务器默认发送的数据，其实是utf8编码的内容
    // 但是浏览器不知道你是utf8编码的内容，默认情况下会按照当前os的默认编码去解析
    // 中文操作系统默认是gbk编码格式

    
    var url = req.url;
    if(url == '/plain'){
        // 在F12开发者模式的响应头(Response Headers)中多了一行内容Content-Type: text/plain;charset=utf-8
        // http协议中，Content-Type就是告诉浏览器服务器发送的内容类型是普通文本，编码是utf-8
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end('hello 世界');
    }else if(url == '/html'){
        // text/plain普通文本，如果这个使用，则浏览器不会解析成html
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.end('<h1>hello html <a href="">点我</a></h1>');
    }
    
});
// 3、监听端口号，启动服务器
server.listen(3000,function(){
    console.log('Server is running~~~~');
});