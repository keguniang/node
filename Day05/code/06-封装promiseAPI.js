var fs = require('fs');

// 返回一个实例对象
function pReadFile(filePath) {
    return new Promise(function (resolve,reject) {
        fs.readFile(filePath,'utf8',function (err,data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

pReadFile('./data/a.txt')
    .then(function (data) {
        console.log(data);
        return pReadFile('./data/b.txt');
    },function (err) {
        console.log(err);
    })
    .then(function (data) {
        console.log(data);
        return pReadFile('./data/c.txt');
    },function (err) {
        console.log(err);
    })
    .then(function (data) {
        console.log(data);
    },function (err) {
        console.log(err);
    });

