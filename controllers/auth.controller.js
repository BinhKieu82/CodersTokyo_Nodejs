const db = require('../db');


module.exports.login = function(req, res) {
  res.render('auth/login');
};

module.exports.postLogin = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  var user = db.get('users').find({ email: email}).value();

  if(!user) {
    res.render('auth/login', {
      errors: [
        'User does not exist!'
      ],
      values: req.body
    });
    return;
  }

  if(user.password !==password) {
    res.render('auth/login', {
      errors: [
        'Passowrd is not correct!'
      ],
      values: req.body
    });
    return;
  }

  res.cookie('userId', user.id, {
    signed: true
  });
  res.redirect('/users');
};