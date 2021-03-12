const express = require('express');
const RedisDB = require("../Config/Redis")
const Response = require("../Helper/Response")
const Cache = {}


Cache.user = (req, res, next) => {    
    RedisDB.redisdb.get("user", (err, ress) => {
        if(err){
           return Response(res, 500, err)
        }
        if (ress !== null){
            const data = JSON.parse(ress)
            return Response(res, 200, data)
        }else{ 
            next()
        }
    }) 
}


Cache.order = (req, res, next) => {    
    RedisDB.redisdb.get("order", (err, ress) => {
        if(err){
           return Response(res, 500, err)
        }
        if (ress !== null){
            const data = JSON.parse(ress)
            return Response(res, 200, data)
        }else{ 
            next()
        }
    }) 
}

Cache.product = (req, res, next) => {
  RedisDB.redisdb.get("product", (err, ress) => {
      if(err){
         return Response(res, 500, err)
      }
      if (ress !== null){
          const data = JSON.parse(ress)
          return Response(res, 200, data)
      }else{ 
          next()
      }
  }) 
}

Cache.category = (req, res, next) => {    
    RedisDB.redisdb.get("category", (err, ress) => {
        if(err){
           return Response(res, 500, err)
        }
        if (ress !== null){
            const data = JSON.parse(ress)
            return Response(res, 200, data)
        }else{ 
            next()
        }
    }) 
}



module.exports = Cache
