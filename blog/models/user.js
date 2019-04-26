var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 连接数据库
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true
});

var userSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    nickname : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    created_time : {
        type : Date,
        // 注意：这里不要写Date.now() 因为会即刻调用
        // 这里直接给了一个方法：Date.now
        // 当你去new Model的时候，若没有传递create_time，则mongoose会调用Date.now，其返回值作为默认值
        default : Date.now
    },
    last_modified_time : {
        type : Date,
        default : Date.now
    },
    avatar :{
        type : String,
        default : '/public/img/avatar-max-img.png'
    },
    bio : {
        type : String,
        default : ''
    },
    gender : {
        type : Number,
        enum : [-1,0,1],
        default : -1
    },
    birthday : {
        type : Date
    },
    status : {
        type : Number,
        //0 没有权限限制
        // 1不可以评论
        // 2不可以登录
        enum : [0,1,2],
        default : 0
    }
});

module.exports = mongoose.model('User',userSchema);