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
    // 2、处理  将数据保存在db.json文件中，用于持久化
    // 3、发送响应数据
    students.save(stu,function (err) {
        if (err) {
            return res.status(500).send('server error');
        } else {
            // 成功的话就跳转到首页
            res.redirect('/students');
        }
    });
});

// students.update({
//     id : 1,
//     name : '张小三',
    
// },function (err) {
//     if (err) {
//         console.log('修改失败');
//     }
//     console.log('修改成功');
// });

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
    students.findById(parseInt(req.query.id),function (err,stu) {
        if (err) {
            return res.status(500).send('server is error');
        }
        // console.log(stu);
        // 用左边的stu去渲染页面,这个不是循环遍历
        res.render('./edit.html',{
            stu : stu
        });
    });


});

router.post('/students/edit', function (req, res) {
    // 1、获取表单数据,此时的内容已经是更新后的对象属性
    // console.log(req.body);
    
    // 2、更新数据
        students.updateById(req.body,function (err) {
            if (err) {
                return res.status(500).send('server is error');
            } else {
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
    students.delById(req.query,function (err) {
        if (err) {
            return res.status(500).send('server is error');
        }
        res.redirect('/students');
    });
});

// 3、导出router
module.exports = router;

// 这样也不方便
//  module.exports = function (app) {
//     app.get('/',function (req,res) {
//         fs.readFile('./db.json', 'utf8',function (err,data) {
//             if (err) {
//                 return res.status(500).send('server error');
//             } else {
//                 // 从文件中读取出来的数据一定是字符串
//                 // 所以这里一定要手动转成对象，再调用students属性
//                 var students = JSON.parse(data).students;
//                 res.render('index.html',{
//                     fruits : [
//                         '苹果',
//                         '香蕉',
//                         '橘子',
//                         '草莓'
//                     ],
//                     students : students
//                 });
//             }
//         });

//     });

//     app.get('',function () {

//     });

//     app.get('',function () {

//     });

//     app.get('',function () {

//     });

//     app.get('',function () {

//     });

//     app.get('',function () {

//     });

//     app.get('',function () {

//     });
//  }