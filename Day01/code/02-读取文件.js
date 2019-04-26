// 浏览器中的JS是没有文件操作的能力,就是说如果把这个JS文件引入到html页面中，会报错
// 但是Node中的JS具有稳健操作的能力

// fs 是file-system的简写，就是文件系统的意思
// 在Node中要进行文件操作，就必须引入fs这个核心模块
// 在fs这个核心模块中，提供了所有的文件操作相关的API
// 例如：fs.readFile用来读取文件


// 1、使用require方法加载fs核心模块
var fs = require('fs');
/* 
2、读取文件
    第一个参数：要读取的文件路径
    第二个参数：一个回调函数
    成功
        data 数据
        error null
    失败
        data undefined
        error 错误对象*/
fs.readFile('./data/hello.txt','utf8',function(error,data){
    // <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 2e 6a 73>
    /* 默认文件中存储的其实都是二进制数据  0  1
    但是为什么这里不是0和1？
        因为这里二进制转化为了16进制
        但无论哪个进制都不认识，所以用toString方法转化为我们认识的字符*/ 
        // console.log(data.toString);
        // 也可以直接设置编码格式
    if(error){
        console.log('读取文件失败'+error);
        
    }else{
        console.log(data);
    }
    
    
});