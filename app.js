/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routes = require('./routes');
var hilfe = require('./routes/hilfe');
var nbd = require('./routes/nbd');
var pass = require('./routes/pass');
var login = require('./routes/login');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/hilfe', hilfe.display);
app.get('/nbd', nbd.display);
app.get('/pass', pass.display);
app.post('/login',login.post);
app.get('/login',login.display);

var loginSchema = new Schema({
  name:  String,
  pasword: String,
});

var login = mongoose.model('login', loginSchema);
	
var user = new login({name:'', password:''});

var user = new login({name:'', password:''});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
