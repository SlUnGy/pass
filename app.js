/**
 * Module dependencies.
 */

var express = require('express');
var schemes = require('./DBschemes');
var db = require('./db');

var routes = require('./routes');
var hilfe = require('./routes/hilfe');
var nbd = require('./routes/nbd');
var pass = require('./routes/pass');
var login = require('./routes/login');
var createCourseDo = require('./routes/createCourseDo');
var createCourse = require('./routes/createCourse');
var createAssessment = require('./routes/createAssessment');
var createAssessmentDo = require('./routes/createAssessmentDo');
var gradeAssessment = require('./routes/gradeAssessment');
var chooseCourse = require('./routes/chooseCourse');
var mainPage = require('./routes/mainPage');
//var admin = require('./routes/admin');
var preferences = require('./routes/preferences');

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
app.use(express.cookieParser());
app.use(express.session({secret: 'yourmamaissofat'}));
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
app.get('/createAssessment', createAssessment.display);
app.get('/gradeAssessment', gradeAssessment.display);
app.get('/login',login.display);
app.get('/main', mainPage.display);
app.get('/preferences',preferences.display);
app.get('/chooseCourse', chooseCourse.display);

//app.get('/admin', admin.display);
var newUser = new schemes.User({name:"root", password:"root"});

newUser.save();

app.get('/getAssessment', function(req, res){
	console.log(req.param("a"));
	
	
});

app.post('/login', function(req, res){
	schemes.User.findOne({name: req.body.name}, function(err, foundUser){
		if(err){
			return console.error(err);
		}
		if(foundUser != null && foundUser.password === req.body.pw){
			req.session.user = foundUser;
			res.render('main', { title: 'PASS' });
		}
		else {
			res.render('index', { title: 'PASS' });
		}
	});
});

app.post('/createCourseDo', function(req, res){
	createCourseDo.post(req, res);
});

app.post('/createAssessmentDo', function(req, res){
	createAssessmentDo.post(req, res);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
