//  1、加载http核心模块
var http = require('http');
// 2、使用http.createServer()方法创建一个web服务器
var server = http.createServer();

/* 
注册request请求事件,需要接受两个参数
    request 请求对象
        请求对象可以用来获取客户端的一些请求信息，例如请求路径
    response 响应对象
        响应对象可以用来给客户端发送响应消息*/

server.on('request', function (request, response) {
    // request.url获取到的是端口号之后的路径
    // 也就是所有的url都是以/开头的
    // 即使输入网址127.0.0.1；3000    url是/
    console.log('收到客户端请求' + '请求路径是:' + request.url);
    console.log('发送请求的客户端的端口号为:'+request.socket.remotePort);//发送请求的客户端的端口号为:58173
    console.log('发送请求的客户端的ip地址为:'+request.socket.remoteAddress);
    var products = [
        {
            name : 'ck',
            age : 18
        },
        {
            name : 'zz',
            age : 20
        }
    ];
    var productsStr = JSON.stringify(products);
    // response对象有一个方法，write可以用来给客户端发送响应数据
    // write可以使用多次，但是最后一定要用end来结束响应，否则客户端会一直等待
    
    // 根据不同的请求路径发送不同的响应结果
    switch (request.url) {
        case '/':
            response.end('/index');
            break;
        case '/login':
            response.end('/login');
            break;
        case '/register':
            response.end('/register');
            break;
        case '/products':
            response.end(productsStr);
            break;
        default:
            response.end('404 not found');
            break;
    };
    
    // 告诉客户端，我的话说完了，你可以呈递给用户了
    // 响应内容必须是二进制或者字符串
    response.end();

    // 上述write,end比较麻烦，推荐使用简单的方式
    // res.end('');

    // 由于现在我们的服务器能力还非常弱，无论是什么请求，都只会返回相同的内容
    /*思考：
        希望当请求不同的路径相应不同的结果
        例如：
            /   index
            /login  登录
            /register  注册 */
});

// 4、绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功，可以通过http://127.0.0.1:3000/来进行访问');
});