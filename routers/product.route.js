const express = require('express');
const shortid = require('shortid');
const db = require('../db');

const router = express.Router();
const dbLow = db.get('products').value();

router.get('/', function(req, res) {
  res.render('products/index', {
    products: dbLow
  });
});

router.get('/search', function(req, res) {
  var ques = req.query.q;
  var matchedproducts = dbLow.filter(function(product) {
    return product.name.toLowerCase().indexOf(ques.toLowerCase()) !== -1;
  });
  res.render ('products/index', {
    products: matchedproducts
  });
});

router.get('/create', function(req, res) {
  res.render('products/create',);
});

router.get('/:productid', function(req, res) {
  var id = req.params.productid;
  var product = db.get('products').find({ id: id }).value();
  console.log(id);
  res.render('products/view', {
    product: product
  });
});

router.post('/create', function(req, res) {
  req.body.id = shortid.generate();
 db.get('products').push(req.body).write();
 res.redirect('/products');
});

module.exports = router;