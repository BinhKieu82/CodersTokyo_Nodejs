const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const shortid = require('shortid');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');

const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

const dbLow = db.get('users').value();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
  res.render('index', {
    name: 'AAAAA'
  });
});

app.get('/users', function(req, res) {
  res.render('users/index', {
    users: dbLow
  });
});

app.get('/users/search', function(req, res) {
  var ques = req.query.q;
  var matchedUsers = dbLow.filter(function(user) {
    return user.name.toLowerCase().indexOf(ques.toLowerCase()) !== -1;
  });
  console.log(matchedUsers);
  res.render ('users/index', {
    users: matchedUsers
  });
});

app.get('/users/create', function(req, res) {
  res.render('users/create',);
});

app.get('/users/:userid', function(req, res) {
  var id = req.params.userid;
  var user = db.get('users').find({ id: id }).value();
  console.log(id);
  res.render('users/view', {
    user: user
  });
});

app.post('/users/create', function(req, res) {
  req.body.id = shortid.generate();
 db.get('users').push(req.body).write();
 res.redirect('/users');
});


app.listen(port, () =>
  console.log('Server listening on port:', port)
);