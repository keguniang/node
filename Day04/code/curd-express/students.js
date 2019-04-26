/**
 * 数据操作文件模块
 * 职责：操作文件中的数据，只关心数据，不关心业务
 *
 */
var fs = require('fs');

var dbPath = './db.json';

 /**获取所有学生列表 */
 exports.find = function (callback) {
     fs.readFile(dbPath,'utf-8',function (err,data) {
         if (err) {
             return callback(err);
         } else {
             callback(null,JSON.parse(data).students);
         }
     });
 };
 
/**根据ID查询指定学生对象 */
exports.findById = function (id,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err) {
            return callback(err);
        } else {
            var stu = JSON.parse(data).students.find(function (item) {
                return id === item.id;
            });
            callback(null,stu);
        }
    });
};

 /**添加保存学生
  * 先读取出来，转成对象
  * 然后往数组中push数据
  * 然后把对象转化为字符串
  * 把字符串再次写入文件
  */
 exports.save = function (stu,callback) {
     fs.readFile(dbPath,'utf8',function (err,data) {
         if (err) {
             return callback(err);
         } else {
             var students = JSON.parse(data).students;
            //  处理id的唯一性
            if (students.length != 0) {
                stu.id = students[students.length-1].id + 1;
            } else {
                stu.id = 1;
            }
             
            //  将用户传递的对象保存到数组中
             students.push(stu);
            //  把对象数据转换为字符串
             var res = JSON.stringify({
                 "students" : students
             });
            //  把字符串保存到文件中
             fs.writeFile(dbPath,res,function (err) {
                 if (err) {
                     return callback(err);
                 } else {
                     callback(null);
                 }
             });
         }
     });
}

 /**更新学生 */
 exports.updateById = function (stu,callback) {
     fs.readFile(dbPath,'utf8',function (err,data) {
         if (err) {
             return callback(err);
         }
        //  调取students数组
         var students = JSON.parse(data).students;
         // 注意：这里记得把 id 统一转换为数字类型!!!出错找了半天
         stu.id = parseInt(stu.id);
        //  得到要修改信息的学生
         var student = students.find(function (item) {
             return stu.id === item.id;
         });

        //  这种方式就写死了，属性太多的话明显不现实
        //  student.name = stu.name;
        //  student.age = stu.age;

        // console.log(students);
        //  修改student的属性
        for (var key in student) {
            student[key] = stu[key];//这里之前如果没有将stu.id整数化，这里将被赋值为字符串，再次编辑时会出错，因为模板中{{ students.id }}是字符串，渲染页面出错
        }
        // console.log(students);这里students中的数据已经更新
        //  把对象数据转换为字符串
        var res = JSON.stringify({
            "students" : students
        });
        
       //  把字符串保存到文件中
        fs.writeFile(dbPath,res,function (err) {
            if (err) {
                return callback(err);
            } else {
                callback(null);
            }
        });
     });
 }
 
 /**删除学生 */
 exports.delById = function (id,callback) {
     fs.readFile(dbPath,'utf8',function (err,data) {
        if (err) {
            return callback(err);
        }
        id = parseInt(id);
        var students = JSON.parse(data).students;
        // console.log(Array.isArray(students) );
        var index = students.findIndex(function (item) {
            return id === item.id;
        });
        // console.log(students);
        students.splice(index,1);
        // console.log(students);
        var res = JSON.stringify({
            "students" : students
        });
        fs.writeFile(dbPath,res,function (err) {
            if (err) {
                return callback(err);
            } else {
                callback(null);
            }

        });
     });
 }