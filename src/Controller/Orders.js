const mongoose = require('mongoose');
const Model = require('../Models/Orders');
const Product = require('../Models/Products');
const Orders = {}


Orders.getall  = async (req, res) => {
    try {
     Model.find()
     .select('productId quantity _id')
     .populate('productId','price desc')
     .exec()
     .then(docs => { res.status(200).json({
         Message : 'Success added data',
         count : docs.length,
         orders: docs
     }); 
      })
    }catch(error){
        return res.status(500).json({
            error: err
        });
    }
}

Orders.post = async (req, res) => {
    try {
        Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product id not found"
                });
            }
            const orders = new Model({
                _id : mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                productId: req.body.productId
            });
            return orders.save() 
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                Message : 'Order data stored',
                Order : {
                    _id : result._id,
                    productId : result.productId,
                    quantity: result.quantity
                }
            });
        })        
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

Orders.getbyid = async (req, res) => {
    try {
        Model.findById(req.params.orderbyid)
        .select('id productId quantity')
        .populate('productId','price desc')
        .exec() 
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    Message: 'Order not found'
                });
            }
            res.status(200).json({
                Message : 'Find data success',
                order: order
            });
        })
        .catch();
    }catch(error) {
        return res.status(500).json({
            error: err
        })
    }

}

Orders.deletewithid = async (req, res) => {
    try {
        Model.remove({ _id: req.params.deletebyid })
        .exec()
        .then(result => {
            res.status(200).json({
                Message: 'Order deleted'                
            })
        })
    }catch(error) {
        return res.status(500).json({
            error: err
        });
    }
}

module.exports = Orders