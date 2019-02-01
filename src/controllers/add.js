const redis = require("redis");
const client = redis.createClient('6379', '192.168.0.175');

let addRecord = async (ctx, next) => {
    let body = JSON.stringify(ctx.request.body);
    let key = Date.now();
    console.log(body);

    client.set(key, body, (res) => {
        console.log(res);
    })
    client.get('1541476520537', (err,res)=>{
        console.log('res',res);
        
    })
    ctx.response.body = key;
    
}

module.exports = {
    'POST /addRecord': addRecord
}