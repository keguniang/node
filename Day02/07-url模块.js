var url = require('url');

var obj = url.parse('/pinglun?name=dsf&message=sdfdsfds',true);
console.log(obj);
console.log(obj.pathname);
// pathname  ？之前的路径
// 使用url.parse方法将路径解析成一个方便操作的对象，第二个参数为true,表示直接将
// 查询字符串转化为一个对象（通过query属性访问）