const Model = require('../Models/Products');
const fs = require('fs')
const multer = require ("multer")
const mongoose = require('mongoose');
const RedisDB = require('../Config/Redis');
const { nextTick } = require('process');
const Products = {}

Products.getall = async (req, res) => {
    try {
            const getall = await Model.find()                              
            .select('name price desc productImage')
            const data_redis = JSON.stringify(getall)
            RedisDB.redisdb.setex("product", 3600, data_redis)
            if (getall.length > 0) {                                       
            return res.status(201).json({
                Message: 'Succes view data',
                result: getall
            })            
            }else{
                res.status(404).json({ message: 'No entries found' });
            }            
            
    }catch(error){
        console.log(error)
        return res.status(500).json({ error: error });
    }
}

Products.post = async (req, res) => {
    try {        
        console.log(req.file);
        const product = new Model({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            productImage: req.file.path
        });

        product.save()

        RedisDB.redisdb.select(0)
        RedisDB.redisdb.flushdb()
        return res.status(201).json({
            Message: 'Success posted data',
            createProduct: {
                _id  : product._id,
                name : product.name,
                price: product.price,
                desc: product.desc,
                productImage: product.productImage
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}



Products.getbyid = async (req, res) => {
    try {
        const id = req.params.productId;
        Model.findById(id)
        .select('name price desc _id productImage')
        .exec()
        .then(doc => { 
        console.log("From database",doc);
            if (doc)  {
                return res.status(200).json({
                    message: 'Success view ID',
                    product: doc                    
                });
            }else {
                return res.status(404).json({ message: 'No valid entry found for provided ID' })
            }
        })
    }catch(error){
        return res.status(500).json({ error: err })
    }
}

Products.edit = async (req, res) => {
    try {
        const id = req.params.productId;
            
            const get = await Model.findOne( {_id:id},{productImage :1});

            console.log(get.productImage)

            const image = get.productImage;

            fs.unlink(image, function(err,next) {
                if(err){
                    throw err;
                }else if (!err){
                    console.log('File deleted');
                }
                
            })                            
                    
        await Model.update({ _id:id }, { $set: { name: req.body.name, price: req.body.price, desc: req.body.desc, productImage:req.file.path } });

        RedisDB.redisdb.select(0)
        RedisDB.redisdb.flushdb()

        return res.status(200).json({
            Message: 'Success Updated'   
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            error
        });
    }
}

Products.delete = async (req, res, next) => {
    try {
        const id = req.params.productId;        

        const get = await Model.findOne( {_id:id},{productImage :1});        

        console.log(get.productImage)

        const image = get.productImage;        

        fs.unlink(image, function(err, next) {
            if(err) throw err;
            console.log("File deleted")
            if(!err) return;
        })        
        

        await Model.deleteOne({  _id:id   })

        RedisDB.redisdb.select(0)
        RedisDB.redisdb.flushdb()

        return res.status(200).json({
            Message: 'Delete Successfull'
        });
    }catch(error) {
        console.log(error)
        return res.status(500).json({ error });
    }
}

module.exports = Products;

// Products.post = async (req, res) => {
//     try {        
//         console.log(req.file);
//         const product = new Model({
//             _id: new mongoose.Types.ObjectId(),
//             name: req.body.name,
//             price: req.body.price,
//             desc: req.body.desc,
//             productImage: req.file.path
//         });
//         product
//         .save()
//         .then(result => { console.log(result);  
//             return res.status(201).json({ 
//                 message: 'Post product data success', 
//                 createProducts: {
//                     _id  : result._id,
//                     name : result.name,
//                     price: result.price,
//                     desc: result.desc,
//                     productImage: result.productImage
//                 }
//             });
            
//         })
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({
//             error: err
//         });
//     }
// }