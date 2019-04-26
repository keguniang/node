var fs = require('fs');

fs.readdir('E:/studyDocument/www',function(err,files){
    if (err) {
        console.log('目录不存在');
        return;
    }else{
        // files是一个数组，存放目录中的文件名
        console.log(files);//[ 'a.txt', 'apple', 'favicon.ico', 'img', 'index.html' ]
    }
});