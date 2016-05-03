// Automaattisesti generoidut muuttujat, joihin sidotaan expressin ja noden toiminnat.
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MongoDB:n ja Monkin määrittely
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

// Reittien asetus
var routes = require('./routes/index');
var users = require('./routes/users');

// Määritellään Express app -muuttujaan
var app = express();


// Näkymämoottorin asetus
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Automaattisesti generoituja määrityksiä
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Asetetaan tietokanta reitittimen saataville
app.use(function(req,res,next){
	req.db = db;
	next();
});

// Määritellään mitä reittitiedostoja käytetään
app.use('/', routes);
app.use('/users', users);


// havaitaan 404 ja siirretään eteenpäin error handlerille
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// development error handler
// tulostaa stacktracen
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// stacktrace ei tulostu käyttäjälle
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Lähetetään app -olio eteenpäin.
module.exports = app;
