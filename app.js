var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser')
const jsonParser = bodyParser.json()
var cors=require('cors')
var UserLogin = require('./routes/userAuth')
var db = require("./Mongoose/DBSetup")
var stockX = require("./routes/StockXRoute")
var amazon = require("./routes/AmazonRoute")
var ebay = require("./routes/Ebay")
const userModel = require('./Mongoose/models.js');
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
db


app.get('/api/getRecentlyViewed', (req, res) => {
  userModel.find({ "recentlyViewed": 1 })
      .then(list => res.send(list))
})

app.get('/api/getWishlist', (req, res) => {
  userModel.find({ "wishList": 1 })
      .then(list => res.send(list))
})

app.post('/api/recentlyViewed', jsonParser, (req, res) => {
  const userId = req.params.id;
  const viewedItem = {
    title: req.body.title,
    vendor: req.body.vendor,
    price: req.body.price,
    currency: req.body.currency,
    itemURL: req.body.itemURL,
    image: req.body.image
  }

  userModel.findById(userId).then(user => {
    user.wishList.push(viewedItem);
  })

});

app.post('/api/addToWishlist', jsonParser, (req, res) => {
  const userId = req.params.id;
  const newItem = {
    title: req.body.title,
    vendor: req.body.vendor,
    price: req.body.price,
    currency: req.body.currency,
    itemURL: req.body.itemURL,
    image: req.body.image
  }

  userModel.findById(userId).then(user => {
    user.wishList.push(newItem);
  })

});


app.use("/api/user",UserLogin)
app.use("/api/stockx",stockX)
app.use("/api/amazon",amazon)
app.use("/api/ebay",ebay)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
