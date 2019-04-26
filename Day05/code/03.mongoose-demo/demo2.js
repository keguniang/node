var mongoose = require('mongoose');

// 1、连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/itcast', {
    useNewUrlParser: true
});

///2、设计文档结构（表结构）
var Schema = mongoose.Schema;
// 字段名称就是表结构中的属性名称
var userSchema = new Schema({
    username: {
        type: String,
        required: true //表示必须有
    },
    password: {
        type: String,
        required: true //表示必须有
    },
    email: {
        type: String
    }
});

//   3、将文档结构发布为模型
/**
 *第一个参数：传入一个大写首字母的单数用来表示你的集合名称
            mongoose会自动将大写首字母的单数变成小写字母的复数
            例如这里的User会变成users集合名称
  第二个参数：架构Schema
  返回值：模型构造函数
*/
var User = mongoose.model('User', userSchema);

// 当我们有了模型构造函数之后，就可以使用这个构造函数对users集合中的数据进行CURD的操作了
var admin = new User({
    username: 'admin',
    password: '123',
    email: 'admin@admin.com'
});

var user = new User({
    username: 'user',
    password: '123'
});

var user1 = new User({
    username: 'user1',
    password: '123'
});
// 持久化保存admin实例（相当于插入数据）
// admin.save(function (err,res) {
//     if (err) {
//         console.log('保存失败');
//     } else {
//         console.log('保存成功');
//         console.log(res);
//     }
// });


// // 查询所有数据
// User.find(function (err,res) {
//     if (err) {
//         console.log('查询失败');
//     } else {
//         console.log('查询成功');
//         console.log(res);
//     }
// });

// 查询(这里需要先持久化保存才能查询到)
// 不加条件就是查询所有的，返回的是一个数组
// User.find({username : 'admin'},function (err,res) {
//     if (err) {
//         console.log('查询失败');
//     } else {
//         console.log('查询成功');
//         console.log(res);
//     }
// });

// 根据id查找数据
User.findByIdAndUpdate('5cbed3f3d5c894506472abbc',function (err,res) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log('查询成功');
        console.log(res);
    }
});

// // findOne返回的是一个对象
// User.findOne({username : 'user1'},function (err,res) {
//     if (err) {
//         console.log('查询失败');
//     } else {
//         console.log('查询成功');
//         console.log(res);
//     }
// });

// 删除一条数据
// User.deleteOne({ username : 'admin',}, function (err) {
//     if (err) {
//         console.log('删除失败');
//         return handleError(err);
//     } else {
//         console.log('删除成功');
//     }
//   });

// 删除多条数据
// User.deleteMany({ username : 'admin',}, function (err) {
//     if (err) {
//         console.log('删除失败');
//         return handleError(err);
//     } else {
//         console.log('删除成功');
//     }
//   });

// 更新数据
User.updateOne({
    username: 'user'
}, {
    password: '123456789',
    email : 'user@qq.com'
}, function (err, res) {
    if (err) {
        console.log('更新失败');
    } else {
        console.log('更新成功');
    }
});
