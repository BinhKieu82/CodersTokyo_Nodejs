const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('users/index', {
    users: dbLow
  });
});

router.get('/search', function(req, res) {
  var ques = req.query.q;
  var matchedUsers = dbLow.filter(function(user) {
    return user.name.toLowerCase().indexOf(ques.toLowerCase()) !== -1;
  });
  console.log(matchedUsers);
  res.render ('users/index', {
    users: matchedUsers
  });
});

router.get('/create', function(req, res) {
  res.render('users/create',);
});

router.get('/:userid', function(req, res) {
  var id = req.params.userid;
  var user = db.get('users').find({ id: id }).value();
  console.log(id);
  res.render('users/view', {
    user: user
  });
});

router.post('/create', function(req, res) {
  req.body.id = shortid.generate();
 db.get('users').push(req.body).write();
 res.redirect('/users');
});

module.exports = router;