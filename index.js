require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoute = require('./routers/user.route');
const productRoute = require('./routers/product.route');
const authRoute = require('./routers/auth.route');

const authMiddleware = require('./middlewares/auth.middleware');

const port = 3000;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('asafsdsrte5454'));

app.use(express.static('public'));

app.get('/', authMiddleware.requireAuth, function(req, res) {
  res.render('index', {
    name: 'AAAAA'
  });
});



app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/products', authMiddleware.requireAuth, productRoute);
app.use('/auth', authRoute);

app.listen(port, () =>
  console.log('Server listening on port:', port)
);