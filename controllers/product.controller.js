const db = require('../db');
const dbLow = db.get('products').value();

const shortid = require('shortid');

module.exports.index = function(req, res) {
  res.render('products/index', {
    products: dbLow
  });
};

module.exports.search = function(req, res) {
  var ques = req.query.q;
  var matchedproducts = dbLow.filter(function(product) {
    return product.name.toLowerCase().indexOf(ques.toLowerCase()) !== -1;
  });
  res.render ('products/index', {
    products: matchedproducts
  });
};

module.exports.create = function(req, res) {
  res.render('products/create');
};

module.exports.get = function(req, res) {
  var id = req.params.productid;
  var product = db.get('products').find({ id: id }).value();
  res.render('products/view', {
    product: product
  });
};

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  var errors = [];

  if(!req.body.name) {
    errors.push('Name is required!');
  }
  if(!req.body.version) {
    errors.push('Version is required!');
  }
  if(!req.body.quality) {
    errors.push('Quality is required!');
  }

  if(errors.length) {
    res.render('products/create', {
      errors: errors,
      values: req.body
    });
    return;
  }
  db.get('products').push(req.body).write();
  res.redirect('/products');
};