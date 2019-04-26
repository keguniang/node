var http = require('http');
var fs = require('fs');
var template = require('art-template');

var server = http.createServer();

var wwwDir = 'E:/studyDocument/www';
server.on('request',function(req,res){
    var url = req.url;
    fs.readFile('./template-apache.html',function(err,data){
        if(err){
            console.log('404 not found');
        };
        /*1、如何得到wwwDir目录列表中的文件名和目录名  fs.readdir()
          2、如何将得到的文件名和目录名替换到template.html中  模板引擎
              2.1 在template.html中需要替换的位置预留一个特殊的标记
              2.2 根据files生成需要的HTML内容
              */ 
        
        fs.readdir(wwwDir,function(err,files){
            if (err) {
                return res.end('con not find www dir');
            }else{
                // 这里只需要使用模板引擎替换data中的模板字符串即可
                // 数据就是files
                // 然后去你的template.html文件中编写模板语法即可
                //  template.render('模板字符串'，替换对象);
                 data = template.render(data.toString(),{
                    title : '哈哈',
                    files : files
                });
                // 3. 发送解析替换过后的响应数据
                res.end(data);
            }
            
        });
        
        
    });
});
server.listen(3000,function(){
    console.log('running~~~');
});