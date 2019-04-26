创建blog文件夹
    git init 上传到git上，需要先初始化
    - 创建README.md 这个文件夹会在git上自动显示出来
    创建.gitgnore 这个文件中的内容不会被上传到git上

安装express和mongoose,art-template,express-art-template,bootstrap,jquery
    npm i express mongoose art-template express-art-template bootstrap jquery
        express启动服务的
        mongoose 操作数据库
    注意：bootstrap应该是3.3.7版本的
配置
    // 配置express-art-template
    app.engine('html', require('express-art-template'));

给文件夹加下划线的意思：
    给用于业务的文件夹区分开

模板页为什么只有一个也放在一个文件夹里边？
    便于以后添加新的模板页

| 路径      | 方法 | get参数  | post参数                | 是否需要登录权限  | 备注         |
|-----------|------|----------|-------------------------|-------------------|--------------|
| /         | GET  | -------- | ----------              | ----------------- | 渲染首页     |
| /register | GET  | -------- | ----------              | ----------------- | 渲染注册页面 |
| /register | POST | -------- | email,nickname,password | ----------------- | 处理注册请求 |
| /login    | GET  | -------- | ----------              | ----------------- | 渲染登录页面 |
| /login    | POST | -------- | email,password          | ----------------- | 处理登录请求 |
| /logout   | GET  | -------- | ----------              | ----------------- | 处理退出请求 |

- 书写步骤：
    + 创建目录结构
    + 整合静态页，模板页
        * include
        * block
        * extend
    + 设计用户登录、退出、注册的路由
    + 用户注册
        * 先处理好客户端页面的内容（表单控件的name，收集表单数据，发起请求）
        * 服务端
            获取客户端表单请求数据
            操作数据库
                如果有错，发送500告诉客户端服务器错了
                其他的根据你的业务发送不同的响应数据
    + 用户登录
    + 用户退出