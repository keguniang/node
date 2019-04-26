var fs = require('fs');

/*
第一个参数：文件路径
第二个参数：文件内容
第三个参数：回调函数,参数是error
成功：
    文件写入成功
    err null
失败：
    文件写入失败
    err 错误对象 */
fs.writeFile('./data/你好.md','大家好，我是node.js',function name(err) {
    if(err){
        console.log('文件写入失败'+err);
        
    }else{
        console.log('文件写入成功');
    }
    
    
});