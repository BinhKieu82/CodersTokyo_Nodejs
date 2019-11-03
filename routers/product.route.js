const express = require('express');

const controller = require('../controllers/product.controller');
const validate = require('../validate/product.validate');

const router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:productid', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;