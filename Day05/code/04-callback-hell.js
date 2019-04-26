var fs = require('fs');

// readFile是异步操作，并不是按顺序从上往下执行，会按照文件大小，哪个小哪个就快
fs.readFile('./data/a.txt', 'utf8', function (err, data) {
    if (err) {
        /**
         * 抛出异常
         *  1、阻止程序的执行
         *  2、把错误消息打印到控制台
         */
        throw err;
    }
    console.log(data);
    fs.readFile('./data/b.txt', 'utf8', function (err, data) {
        if (err) {
            /**
             * 抛出异常
             *  1、阻止程序的执行
             *  2、把错误消息打印到控制台
             */
            throw err;
        }
        console.log(data);
        fs.readFile('./data/c.txt', 'utf8', function (err, data) {
            if (err) {
                /**
                 * 抛出异常
                 *  1、阻止程序的执行
                 *  2、把错误消息打印到控制台
                 */
                throw err;
            }
            console.log(data);
        });
    });
});