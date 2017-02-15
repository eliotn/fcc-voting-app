'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
//added
var winston = require('winston');
//support body parsing for posts --
//thanks http://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters-in-express
var bodyParser = require('body-parser');


winston.add(
  winston.transports.File, {
    filename: 'myLogFile.log',
    level: 'info',
    json: true,
    eol: '\n', // for Windows, or `eol: ‘n’,` for *NIX OSs
    timestamp: true,
    handleExceptions: true,
    exitOnError: false
  }
)
 
winston.log('info', 'Hello log files!');
winston.info('Hello again log files!');
var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.urlencoded({     
  extended: true
}));

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});