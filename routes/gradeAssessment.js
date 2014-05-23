/*
 * GET/POST login.
 */

exports.post = function(req, res){
	res.render('gradeAssessment', { title: 'PASS', studentName: req.body.studentNames, assignmentName: req.body.assignment});
};

exports.display = function(req, res){
	if(req.session.user != null){
		res.render('gradeAssessment', { title: 'PASS' });
	}
	else {
		res.render('index',{title: 'USER REQUIRED' });
	}
};
