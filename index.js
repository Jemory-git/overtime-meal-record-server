// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const router = require('koa-router')();
var http = require('http');
var https = require('https');
const fs = require('fs');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log(ctx.request);
    await next();
});

// 路由
router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.post('/signin', async (ctx, next) => {
    console.log(ctx.request);
    
});


// 注册router
app.use(router.routes());


// 读取ssl证书文件
var options = {
    key: fs.readFileSync('./ssl/jemory.cn.key'), //ssl文件路径
    cert: fs.readFileSync('./ssl/jemory.cn.pem') //ssl文件路径
};

// 开启服务
https.createServer(options, app.callback()).listen(443);
console.log('https server is running');