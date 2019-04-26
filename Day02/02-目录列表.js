var http = require('http');
var fs = require('fs');
var server = http.createServer();

var wwwDir = 'E:/studyDocument/www';
server.on('request',function(req,res){
    var url = req.url;
    fs.readFile('./template.html',function(err,data){
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
                var content = '';
                // console.log(files);
                files.forEach(function (item) {
                    content += `
                        <tr>
                            <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">${item}/</a></td>
                            <td class="detailsColumn" data-value="0"></td>
                            <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
                        </tr>
                    `;
                });
                // 替换
                data = data.toString();
                // console.log('content是：'+  content);
                data = data.replace('^_^',content);
                // 3. 发送解析替换过后的响应数据
                res.end(data);
            }
            
        });
        
        
    });
});
server.listen(3000,function(){
    console.log('running~~~');
});