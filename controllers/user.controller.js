const db = require('../db');
const dbLow = db.get('users').value();

const shortid = require('shortid');

module.exports.index = function(req, res) {
  res.render('users/index', {
    users: dbLow
  });
};
module.exports.search = function(req, res) {
  var ques = req.query.q;
  var matchedusers = dbLow.filter(function(user) {
    return user.name.toLowerCase().indexOf(ques.toLowerCase()) !== -1;
  });
  res.render ('users/index', {
    users: matchedusers
  });
};

module.exports.create = function(req, res) {
  console.log(req.cookies);
  res.render('users/create');
};

module.exports.get = function(req, res) {
  var id = req.params.userid;
  var user = db.get('users').find({ id: id }).value();
  res.render('users/view', {
    user: user
  });
};

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();  

  db.get('users').push(req.body).write();
  res.redirect('/users');
};