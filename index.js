const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routers/user.route');
const productRoute = require('./routers/product.route');

const port = 3000;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
  res.render('index', {
    name: 'AAAAA'
  });
});

app.use('/users', userRoute);
app.use('/products', productRoute);

app.listen(port, () =>
  console.log('Server listening on port:', port)
);