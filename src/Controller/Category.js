const Model = require('../Models/Category');
const mongoose = require('mongoose');
const RedisDB = require('../Config/Redis');
const { nextTick } = require('process');
const Category = {}

Category.getall = async (req, res) => {
    try {
            const getall = await Model.find()                              
            .select('nameCategory')
            const data_redis = JSON.stringify(getall)
            RedisDB.redisdb.select(3)
            RedisDB.redisdb.setex("category", 3600, data_redis)
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


Category.add = async (req, res) => {
    try {                
        const category = new Model({
            _id: new mongoose.Types.ObjectId(),
            nameCategory: req.body.nameCategory
        });
        category.save()

        RedisDB.redisdb.select(0)
        RedisDB.redisdb.flushdb()

        return res.status(201).json({
            Message: 'Success posted data',
            createCategory: {
                _id  : category._id,
                nameCategory : category.nameCategory,
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

Category.edit = async (req, res) => {
    try {
        const id = req.params.categoryId;                        
                    
        await Model.update({ _id:id }, { $set: { nameCategory: req.body.nameCategory } });

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


Category.delete = async (req, res, next) => {
    try {
        const id = req.params.categoryId;
        
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


module.exports = Category;