const express = require('express');
const controller = require('../Controller/Orders')
const router = express.Router();
const checkAuth = require('../Middleware/Check-auth')

router.get('/', checkAuth, controller.getall)

router.post('/', checkAuth, controller.post)

router.get('/:orderbyid', checkAuth, controller.getbyid)

router.delete('/:deletebyid', checkAuth, controller.deletewithid)


// COMBINE EXAMPLE

// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Orders were fetched'
//     });
// });

// router.post('/', (req, res, next) => {
//     const orders = {
//         productId : req.body.productId,
//         quantity: req.body.quantity,
//         price: req.body.price
//     };
//     res.status(201).json({
//         message: 'Order was created',        
//         createOrders: orders
//     });
// });

// router.get('/:orderId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Order details',
//         orderId: req.params.orderId
//     })
// })

// router.delete('/:orderId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Order deleted',
//         orderId: req.params.orderId
//     })
// })

module.exports = router;