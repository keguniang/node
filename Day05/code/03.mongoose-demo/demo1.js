// 引包
const mongoose = require('mongoose');
// 链接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true
});
// 创建一个模型，就是在设计数据库Cat
// MongoDB是动态的，只需要在代码中设计数据库就可以了
// mongoose这个包可以让你的设计编写过程变得非常简单
// 生成一个小写复数的几何名称 cats
const Cat = mongoose.model('Cat', {
    name: String
});

for (let index = 0; index < 50; index++) {
    // 实例化一个cat
    const kitty = new Cat({
        name: '喵喵' + index
    });
    // 持久化保存kitty实例
    kitty.save().then(() => console.log('meow'));

}