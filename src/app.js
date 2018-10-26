// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const router = require('koa-router')();
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');

// 导入路由生成控件
import controler from './controler.js';

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
});

// 添加请求体解析中间件
app.use(bodyParser());

// 注册router
let routes = controler();
app.use(routes);

// 读取ssl证书文件
var options = {
    key: fs.readFileSync(__dirname + '/ssl/bd-ssl.key'), //ssl文件路径
    cert: fs.readFileSync(__dirname + '/ssl/bd-ssl.crt') //ssl文件路径
};

// 开启服务
https.createServer(options, app.callback()).listen(443, '0.0.0.0');
console.log('https server is running');