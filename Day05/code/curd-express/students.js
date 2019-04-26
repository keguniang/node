var mongoose = require('mongoose');

// 1、连接MongoDB数据库(在此之前需要先打开mongodb)
mongoose.connect('mongodb://localhost:27017/itcast', {
    useNewUrlParser: true
});

// 2、设计文档结构
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    gender : {
        type : Number,
        // 通过枚举把取值限定在0和1之间
        enum : [0,1],
        default : 0
    },
    age : {
        type : Number
    },
    hobbies : {
        type : String
    }
});

// 3、将文档结构发布为模型
module.exports = mongoose.model('Student',studentSchema);