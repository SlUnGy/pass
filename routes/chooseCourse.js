var schemes = require('../DBschemes');
var db = require('../db');


exports.display = function(req, res){
	schemes.Course.find({}, function(err,data){
		if(err){
			return console.error(err);
		}
		else {
			var names = new Array();
			for( var i=0; i<data.length; i++){
				names.push(data[i]['title']);
			}
			res.render('chooseCourse', { title: 'PASS', courses: names });
		}
	});
};

exports.displayPost = function(req, res){
	schemes.Course.findOne({title: req.body.courseNames},function(err, data){
		if(err){
			return console.error(err);
		}
		if(data != null){
			var names = new Array();
			for( var i=0; i<data.students.length; ++i){
				names.push(data.students[i]['name']);
			}
			res.render('chooseStudent', { title: 'PASS', students: names, course: req.body.courseNames });
		}
		else {
			return console.error('No data found for selected course');
		}
	});
}
