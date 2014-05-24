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
var gradeAssessmentDo = require('./routes/gradeAssessmentDo');
var chooseCourse = require('./routes/chooseCourse');
var chooseStudent = require('./routes/chooseStudent');
var mainPage = require('./routes/mainPage');
var mainStudentPage = require('./routes/mainStudentPage');
//var admin = require('./routes/admin');
var preferences = require('./routes/preferences');
var loginStudent = require('./routes/loginStudent');
var chooseAssessment = require('./routes/chooseAssessment');

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
app.use(express.session({secret: 'a1s2d3##+'}));
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/index',routes.index);
app.get('/hilfe', hilfe.display);
app.get('/nbd', nbd.display);
app.get('/pass', pass.display);
app.get('/createCourse',createCourse.display);
app.get('/createAssessment', createAssessment.display);
app.get('/gradeAssessment', gradeAssessment.display);
app.get('/login',login.display);
app.get('/main', mainPage.display);
app.get('/mainStudent', mainStudentPage.display);
app.get('/preferences',preferences.display);
app.get('/chooseCourse', chooseCourse.display);
app.get('/chooseStudent',chooseStudent.display);
app.get('/loginStudent',loginStudent.display);

//app.get('/admin', admin.display);
var newUser = new schemes.User({name:"root", password:"root"});

newUser.save();

app.get('/getAssessment', function(req, res){
	schemes.Assessment.findOne({name:req.query["a"]}, function(err, foundAssessment){
		console.log(foundAssessment);
		if(err){
			return console.error(err);
		}
		if(foundAssessment != null){
			res.send(foundAssessment);
		}
	});
});

app.post('/gradeAssessment', function(req, res){
	gradeAssessment.post(req, res);
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

app.post('/loginStudent', function(req, res){
	schemes.Student.findOne({name: req.body.name}, function(err, foundStudent){
		if(err){
			return console.error(err);
		}
		if(foundStudent != null){
			req.session.student = foundStudent;
			res.render('mainStudent', { title: 'PASS', studentName: foundStudent.name });
		}
		else {
			res.render('loginStudent', { title: 'ERROR on login' });
		}
	});
});

app.post('/chooseAssessment', chooseAssessment.displayPost);

app.post('/chooseCourse', chooseCourse.displayPost);

app.post('/createCourseDo', function(req, res){
	createCourseDo.post(req, res);
});

app.post('/createAssessmentDo', function(req, res){
	createAssessmentDo.post(req, res);
});

app.post('/gradeAssessmentDo', function(req, res){
	gradeAssessmentDo.post(req, res);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
