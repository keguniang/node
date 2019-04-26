// app application应用程序

// 为了让目录结构保持统一清晰，所以我们约定，把所有的 HTML 文件都放到 views（视图） 目录中
// 我们为了方便的统一处理这些静态资源，所以我们约定把所有的静态资源都存放在 public 目录中
// 哪些资源能被用户访问，哪些资源不能被用户访问，我现在可以通过代码来进行非常灵活的控制
// / index.html
// /public 整个 public 目录中的资源都允许被访问

var http = require('http');
var fs = require('fs');
var tpl = require('art-template');
var url = require('url');
// url.parse()   将一个路径转换为一个对象，得到路径的各个组成部分
/**url.parse('http://127.0.0.1:3000/pinglun?name=dsf&message=sdfdsfds',true)
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: '127.0.0.1:3000',
  port: '3000',
  hostname: '127.0.0.1',
  hash: null,
  search: '?name=dsf&message=sdfdsfds',
  query:
   [Object: null prototype] { name: 'dsf', message: 'sdfdsfds' },
  pathname: '/pinglun',
  path: '/pinglun?name=dsf&message=sdfdsfds',
  href: 'http://127.0.0.1:3000/pinglun?name=dsf&message=sdfdsfds' } */


var comments = [
    {
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
      },
      {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
      },
      {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
      }
];

http
    .createServer(function (req,res) {
        var urlObj = url.parse(req.url,true);
        // 单独获取不包含查询字符串的路径部分
        var urlname = urlObj.pathname;

        console.log(urlname);
        if (urlname === '/' || urlname === '/index.html') {
            // 括号里边的是文件路径
            fs.readFile('./views/index.html',function (err,data) {
                if (err) {
                    return res.end('404 not found...');
                }else{
                    var htmlStr = tpl.render(data.toString(),{
                        comments : comments
                    });
                    res.end(htmlStr);
                }
            });
        } else if (urlname === '/post') {
            fs.readFile('./views/post.html',function (err,data) {
                if (err) {
                    return res.end('404 not found');
                }else {
                    res.end(data);
                }
            });
        }else if (urlname.indexOf('/public/') == 0) {
            // 统一处理：如果请求是以.public/开头的，则我认为你要获取public中的
            // 某个资源，所以我们就直接可以把请求路径当做文件路径直接进行读取
            fs.readFile('.'+urlname,function (err,data) {
                if (err) {
                    return res.end('404 not found');
                }else {
                    res.end(data);
                }
            });
        }else if (urlname === '/pinglun') {
            // console.log('收到表单');
            // 一次请求对应以此响应，响应之后请求就结束了，代码也就不再往下执行了
            // res.end(JSON.stringify(urlObj.query));
            /**
             * 接下来要做的是：
             *      1、获取表单提交的数据urlObj.query
             *      2、将当前时间日期到数据对象中，然后存储到数组中
             *      3、让用户重定向跳转到首页，数组的数据已经发生变化
             */
            var comment = urlObj.query;
            var dt= new Date();
            var y = dt.getFullYear();
            var m = dt.getMonth() + 1;
            var d = dt.getDate();
            var h = dt.getHours();
            var mm = dt.getMinutes();
            var s = dt.getSeconds();
            var time = `${y}-${m}-${d} ${h}:${mm}:${s}`;
            comment.dateTime = time;
            comments.unshift(comment);
            // push过去服务端已经把数据存储更新了，接下来应该服务端自动请求/首页，看到发表的内容
            /**
             * 如何通过服务器让客户端重定向？
             *      1、状态码设置为302临时重定向
             *      2、响应头中通过location告诉客户端往哪重定向   res.setHeader
             *      3、如果客户端发现收到的服务器的响应的状态码是302，就会自动去响应头中
             *      找location，然后对该地址发起新的请求
             * 这样就能看到客户端的自动跳转了
             */
            res.statusCode = 302;
            res.setHeader('Location','/');
            res.end();
        }else{
            // 其它的路径都处理为404
            fs.readFile('./views/404.html',function (err,data) {
                if (err) {
                    console.log('404 not found');
                }else {
                    res.end(data);
                }
            });
        }
    })
    .listen(3000,function(){
        console.log('running');
    });