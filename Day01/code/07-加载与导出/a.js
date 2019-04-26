/*
在Node中，模块有三种：
    1、具名的核心模块：例如fs/http
    2、用户自己编写的文件模块,相对路径必须加./ ，否则不加的话就会被当成核心模块了
    3、nmp下载的

require是一个方法
有两个作用：
    1、用来加载模块并执行其中的代码
    2、拿到被加载文件模块导出的接口对象
        在每个文件模块中都提供了一个对象：exports(默认是个空对象)
    作用是：
        把所有需要被外界访问的成员挂载到这个exports对象上
        */


// node中没有全局作用域，只有模块作用域
// 外部访问不到内部，内部也访问不到外部
var bExports = require('./b');
// 这里的res就是exports
console.log(bExports);//{ foo: 'hello' }
console.log(bExports.foo);
console.log(bExports.add(1,2));//3