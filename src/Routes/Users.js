const express = require('express');
const controller = require('../Controller/Users')
const router = express.Router();

router.post('/signup', controller.post)

router.post('/login', controller.login)

router.delete('/:userId', controller.delete)

module.exports = router;