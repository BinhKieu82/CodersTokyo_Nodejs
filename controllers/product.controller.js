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
  console.log(id);
  res.render('products/view', {
    product: product
  });
};

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
 db.get('products').push(req.body).write();
 res.redirect('/products');
};