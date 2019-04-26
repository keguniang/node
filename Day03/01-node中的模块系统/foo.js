var foo = 'hello';
exports.foo = foo;

function add (x,y) {
    return x+y;
}
exports.add = add;



/**
 * 在Node中，每个模块内部都有一个自己的module对象
   该module对象中，有一个成员叫：exports也是一个对象
   也就是说如果你需要对外导出成员，只需要把导出的成员挂载到module.exports中
   即每次导出接口成员都需要module.exports.xxx = xxx,点的太多了，麻烦
   所以，Node为了简化操作，专门提供了一个变量exports = module.exports
   即内置代码中有一句这样的代码
   var exports = module.exports;  exports是module.exports的引用
   所以现在可以直接用exports = xxx即可导出接口成员 
   exports.foo = 'hello' 与 module.exports.foo = 'hello'是等价的*/ 

// console.log(exports);//{ foo: 'hello', add: [Function: add] }
// console.log(module.exports);//hello
// console.log(exports === module.exports);//false
// var module = {
//     exports : {
//         foo : 'hello'
//     }
// }

// 导出单个成员，如果有多个module.exports，则为重新赋值
// 给exports赋值会断开和module.exports的联系
// 同理，给module.exports赋值也会断开和exports的联系
// 这一句之后，再给exports添加成员对结果也没有有影响，因为最后返回的是module.exports
module.exports = 'hello';

// 这一句其实就是module.exports.foo = 'hello'
exports.foo = 'world';

// 谁来require我，谁就得到module.exports
// 默认在代码最后有一句：return module.exports
// 返回的不是exports,所以不能给exports赋值，如果给exports赋值，二者指向的将不再相同