const redis = require("redis");
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

export async function set(k, v) {
    client.set(k, v, redis.print);
}

export async function get(k) {
    client.get(k, redis.print);
}