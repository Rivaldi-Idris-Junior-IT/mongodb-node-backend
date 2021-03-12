const redis = require("redis")
require("dotenv").config();

class RedisDB {
    constructor() {
        this.redisdb = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD
        })
    }

    redisCheck() {
        return new Promise((resolve, reject) => {
            this.redisdb.get("testkey", (err, res) => {
                if(err) {
                    reject(err)
                }
                if(res === "OK" || res === null){
                    resolve("Connection to Redis successfully.")
                }
            })
        })
    }
}

module.exports = new RedisDB()

