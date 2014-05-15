var schemes = require('../DBschemes');
var db = require('../db');


exports.display = function(req, res){
	res.render('chooseCourse', { title: 'PASS'});
};
