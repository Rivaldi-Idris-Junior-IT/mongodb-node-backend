const express = require('express');
const controller = require('../Controller/Products')
const multer = require('multer')
const upload = require('../Middleware/upload')
const checkAuth = require('../Middleware/Check-auth')
const Chache = require('../Middleware/Chache')
const router = express.Router();

//  Handle incoming request Get to /product in file app.js

router.get('/',checkAuth, controller.getall, Chache.product)

router.post('/', checkAuth, upload.single('productImage'), controller.post)

router.get('/:productId', checkAuth, controller.getbyid)

router.patch('/:productId', checkAuth, upload.single('productImage'),  controller.edit )

router.delete('/:productId', checkAuth, controller.delete)

// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Handling GET request to /products'
//     });
// });

// router.post('/', (req, res, next) => {
//     const product = {
//         name: req.body.name,
//         price: req.body.price,
//         desc: req.body.desc,        
//     };
//     res.status(201).json({
//         message: 'Handling POST request to /products',
//         createProducts: product,      
//     });
// });

// router.get('/:productId', (req, res, next) => {
//     const id = req.params.productId;
//     if (id === 'special') {
//         res.status(200).json({
//             message: 'You discovered the special ID',
//             id: id
//         });
//     }else {
//         res.status(200).json({
//             message: 'You passed an ID'
//         });
//     }
// });

// router.patch('/:productId', (req, res, next) => {
//     res.status(200).json({
//         message: 'update product'
//     });
// });

// router.delete('/:productId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Deleted product'
//     })
// })


module.exports = router;