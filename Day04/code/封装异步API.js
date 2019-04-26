/**
 * 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
 * 
 * 回调函数：获取异步操作的结果
 */
function fn(callback) {
    // var callback = function (data) {console.log(data); }
    setTimeout(function () {
        var data = 'hello';
        callback(data);
    });
};

fn(function (data) {
    console.log(data);
});