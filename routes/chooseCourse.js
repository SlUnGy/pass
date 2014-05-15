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
				names.push(data[i]["title"]);
			}
			res.render('chooseCourse', { title: 'PASS', courses: names });
		}
	});
};
