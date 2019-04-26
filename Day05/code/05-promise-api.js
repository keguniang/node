// promise是一个构造函数

// console.log('1');
var fs = require('fs');
// 创建promise容器
// 1、给别人一个承诺，promise容器一旦创建，就开始执行里边的代码
// promise本身不是异步的，但是内部的任务是异步的
var p1 = new Promise(function (resolve, reject) {
    // console.log('2');
    fs.readFile('./data/a.txt', 'utf8', function (err, data) {
        if (err) {
            // 承诺容器中的任务失败了
            // console.log(err);
            // 把容器中的pending状态变为rejected
            // 调用reject就相当于调用了then 方法的第二个参数函数
            reject(err);
        } else {
            // console.log('3');
            // 承诺容器中的任务成功了
            // console.log(data);
            // 把容器中的pending状态变为resolved
            // 调用reject就相当于调用了then 方法的第一个参数函数
            resolve(data);
        }
    });
});
// console.log('4');

var p2 = new Promise(function (resolve, reject) {
    fs.readFile('./data/b.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

var p3 = new Promise(function (resolve, reject) {
    fs.readFile('./data/c.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

// p1就是那个承诺
// 当p1成功了，然后（then）做指定的操作
// then方法接受的function就是容器的resolve函数，
// 如果resolve(123),那这里接收到的数据就是123
p1.
    then(function (data) {
        console.log(data);
        // 当前函数return 的结果可以在后边的then中的function接收到
        // 当return 123 的时候，function中的参数就是123
        // return 'hello' 的时候，function中的参数就是hello
        // 没有return 的时候，function中的参数就是undefined
        // 但是上述的return 并没有什么用，真正有用的是return 一个promise对象
        // 当return 一个promise对象的时候，后续的then中方法的第一个参数会作为p2的resolve方法
        return p2;
    }, function (err) {
        console.log(err);
    })
    .then(function (data) {
        console.log(data);
        return p3;
    },function (err) {
        console.log(err);
    })
    .then(function (data) {
        console.log(data);
    },function (err) {
        console.log(err);
    });