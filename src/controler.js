const fs = require('fs');
const router = require('koa-router')();

// 该模块将controllers文件夹下的文件处理成路由，类似：router.post('/path', async fn)
function addMapping(mapping) {
    let keys = Object.keys(mapping);
    keys.forEach((url) => {
        if (url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    })
}

function addControllers() {
    let files = fs.readdirSync(__dirname + '/controllers');
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(mapping);
    }
}

export default function (dir) {
    let controllers_dir = dir || 'controllers'; // 如果不传参数，扫描目录默认为'controllers'
    addControllers(controllers_dir);
    return router.routes();
};