/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var server = require('./connect');
var db = mongoose.connect('mongodb://' + server.details());

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function(){
  console.log('Connected');
});


var routes = require('./routes');
var hilfe = require('./routes/hilfe');
var nbd = require('./routes/nbd');
var pass = require('./routes/pass');
var login = require('./routes/login');
var createCourse = require('./routes/createCourse');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon('public/favicon.ico'));
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
app.get('/createCourse',createCourse.display);
app.get('/login',login.display);

var userSchema = new mongoose.Schema({
  name:  String,
  password: String
});

userSchema.path('name').unique(true);

var User = mongoose.model('User', userSchema);

var newUser = new User({name:"root", password:"root"});

newUser.save();

app.post('/login', function(req, res){
  User.findOne({name: req.body.name}, function(err, foundUser){
    if(err){
      return console.error(err);
    }
    if(foundUser != null && foundUser.password === req.body.pw){
      res.render('login_success', { title: 'PASS' });
    }
    else {
      res.render('index', { title: 'PASS' });
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
