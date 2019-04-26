var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'users'
});

 // 2、连接数据库
connection.connect();
 
// 3、执行查询数据操作
connection.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('执行成功');
  console.log(results);
});

// 插入
// connection.query('insert into user values(null,"admin","123")', function (error, results, fields) {
//     if (error) throw error;
//     console.log('执行成功');
//   });
 
// 4.关闭连接
connection.end();