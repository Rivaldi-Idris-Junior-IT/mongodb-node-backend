const express = require('express');
const controller = require('../Controller/Category')
const checkAuth = require('../Middleware/Check-auth')
const Chache = require('../Middleware/Chache')
const router = express.Router();

//  Handle incoming request Get to /product in file app.js

router.get('/',checkAuth, controller.getall, Chache.category)

router.post('/', checkAuth, controller.add)

router.patch('/:categoryId', checkAuth, controller.edit)

router.delete('/:categoryId', checkAuth, controller.delete)

module.exports = router;
