var fs = require('fs');
var path = require('path');

/**
 * 写的时候./a.txt是相对于当前文件的路径
 * 但是执行命令的时候，./a.txt认为是相对于node命令所处的终端路径
 * node 就是这样设计的，但是运行的时候可能会出错
 * 也就是说，文件操作路径中，相对路径的设计就是相对于执行node命令所处的路径
 */

// fs.readFile('E:\studyDocument\Node.js\Day06\foo\a.txt','utf8',function (err,data) {
//     if (err) {
//         throw err;
//     } else {
//         console.log(data);
//     }
// });

// fs.readFile(__dirname + '/a.txt','utf8',function (err,data) {
//     if (err) {
//         throw err;
//     } else {
//         console.log(data);
//     }
// });

fs.readFile(path.join(__dirname,'/a.txt'),'utf8',function (err,data) {
    if (err) {
        throw err;
    } else {
        console.log(data);
    }
});