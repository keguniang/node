/**
 * art-template 不仅可以在浏览器中使用，也可以在node中使用
 * 安装：
 *      npm install art-template
 *  该命令在哪执行就会把包下载到哪里。默认会下载到node_model文件夹下
 *  这个名称不要改，也不支持改
 * 
 * 模板引擎最早诞生于服务器领域，后来才发展到了前端
 * 使用步骤：
 *      1、 npm install art-template
 *      2、在需要使用的文件模块中加载art-template
 *          在服务端使用require
 *          在浏览器中使用script标签引入
 *      3、查文档，使用模板引擎的API
 */

 var template = require('art-template');
var fs = require('fs');
// var tplStr = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Document</title>
// </head>
// <body>
//         <p>大家好，我叫 {{ name }}</p>
//         <p>我今年{{ age }} 岁了</p>
//         <h1>我来自 {{ province }}</h1>
//         <p>我喜欢 {{ each hobbies }} {{$value}} {{ /each }}</p>
// </body>
// </html>
// `;
fs.readFile('./tpl.html',function(err,data){
    if (err) {
        console.log('读取文件失败了');
    } else {
        // data默认是二进制数据，而模板引擎render方法接受的是字符串
        // 所以data需要转化为字符串
        var res = template.render(data.toString(),{
            name : 'jack',
            age : 18,
            province : '河南',
            hobbies : [
                '前端',
                '美美哒'
            ]
        });
        console.log(res);
    }
});


//  template.render('模板字符串'，替换对象);
// var res = template.render('hello {{ name }}',{
//     name : 'cuike'
// });
// console.log(res);//hello cuike