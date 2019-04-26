/**
 * 1、核心模块加载
 * 2、路径加载
 * 3、第三方模块
 *  凡是第三方模块都必须通过npm来下载
 *  使用的时候通过require('包名')的方式进行加载使用
 *  既不是核心模块，也不是路径模块的模块
 *      先找到当前文件所处目录的node_modules目录
 *      node_modules/art-template
 *      node_modules/art-template/package.json
 *      node_modules/art-template/package.json文件中的main属性
 *      main属性中记录了art-template的入口模块
 *      然后加载使用这个第三方包
 *      实际上加载的还是文件
 * 
 * 如果package.json文件不存在或者main指定的入口模块不存在
 * 则node会自动寻找该目录下的index.js
 * 即index.js会作为一个默认备选项
 * 
 * 如果以上任何一个条件都不成立，则会进入上一级目录中的node_modules目录
 * 如此不断往上查找，直到找到当前磁盘根目录，若还没有找到，则报错
 */