/**
 * router.js 路由模块
 *  职责：
 *      处理路由
 *      根据不同的请求方法+请求路径设置具体的请求处理函数
 *  模块职能单一，目的是为了增强项目代码的可维护性
 *  提升开发效率
 */

var fs = require('fs');
var express = require('express');
var students = require('./students');

// 1、创建一个路由器
var router = express.Router();

// 2、把路由器都挂载到router路由容器中
    // 查询出所有的学生
router.get('/students', function (req, res) {
    // fs.readFile('./db.json', 'utf8', function (err, data) {
    //     if (err) {
    //         return res.status(500).send('server error');
    //     } else {
    //         // 从文件中读取出来的数据一定是字符串
    //         // 所以这里一定要手动转成对象，再调用students属性
    //         var students = JSON.parse(data).students;
    //         res.render('index.html', {
    //             fruits: [
    //                 '苹果',
    //                 '香蕉',
    //                 '橘子',
    //                 '草莓'
    //             ],
    //             students: students
    //         });
    //     }
    // });

    students.find(function (err, students) {
        if (err) {
            return res.status(500).send('server error');
        } else {
            res.render('index.html', {
                fruits: [
                    '苹果',
                    '香蕉',
                    '橘子',
                    '草莓'
                ],
                students: students
            });
        }
    });

});

router.get('/students/new', function (req, res) {
    res.render('new.html');
});

router.post('/students/new', function (req, res) {
    // 1、获取表单数据
    var stu = req.body;
    console.log(stu);
    // 2、处理  
    // 3、发送响应数据
    new students(req.body).save(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send('server error');
        } else {
            // 成功的话就跳转到首页
            console.log('添加学生成功');
            res.redirect('/students');
        }
    });
});

// 编辑第一步，先渲染编辑页面
router.get('/students/edit', function (req, res) {
    /**
     * 1、在客户端的列表中处理链接问题（需要由id参数）
     * 2、获取要编辑学生的id
     * 3、渲染编辑页面
     */
    // 获取要编辑学生的id
    // console.log(req.query.id);
    // 通过req.query.id拿到的id是字符串类型
    // console.log(typeof req.query.id);  //string
    // console.log(parseInt(req.query.id));
    students.findById(req.query.id ,function (err,stu) {
        if (err) {
            console.log('查找失败');
            return res.status(500).send('server is error');
        }
        console.log('查找成功');
        // console.log(stu);
        // 用左边的stu去渲染页面,这个不是循环遍历
        res.render('./edit.html',{
            stu : stu
        });
    });


});

router.post('/students/edit', function (req, res) {
    // 1、获取表单数据,此时的内容已经是更新后的对象属性
    console.log(req.body);
    
    // 2、更新数据(注意这里是_id)
        students.updateOne({_id : req.body.id},req.body,function (err,ret) {
            if (err) {
                return res.status(500).send('server is error');
            } else {
                console.log('更新成功');
                console.log(ret);//{ n: 1, nModified: 1, ok: 1 }
                res.redirect('/students');
            }
        });
});

router.get('/students/delById', function (req, res) {
    /**
     * 1、获取要删除的id
     * 2、根据id执行删除操作
     * 3、根据操作结果发送响应数据
     */
    console.log(req.query);
    students.deleteOne({ _id : req.query.id},function (err) {
        if (err) {
            return res.status(500).send('server is error');
        }
        console.log('删除成功');
        res.redirect('/students');
    });
});

// 3、导出router
module.exports = router;
