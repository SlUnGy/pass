var schemes = require('../DBschemes');
var db = require('../db');

exports.display = function(req, res){
	asses = new Array();
	asses.push('null');
	res.render('chooseAssessment', {title: 'PASS', studentName: 'null', assessments: asses });
};


exports.displayPost = function(req, res){
	schemes.Assessment.find({}, function(err,data){
		if(err){
			return console.error(err);
		}
		else {
			var names = new Array();
			for( var i=0; i<data.length; i++){
				names.push(data[i]['name']);
			}
			res.render('chooseAssessment', { title: 'PASS', studentName: req.body.studentNames, courseName: req.body.courseName, assessments: names });
		}
	});
}

