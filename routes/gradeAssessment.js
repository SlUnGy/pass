/*
 * GET/POST login.
 */

exports.post = function(req, res){
	console.log("Course Name: " + req.body.courseName);
	res.render('gradeAssessment', { title: 'PASS', studentName: req.body.studentName, assessmentName: req.body.assessment, courseName: req.body.courseName}); 
};

exports.display = function(req, res){
	if(req.session.user != null){
		res.render('gradeAssessment', { title: 'PASS' });
	}
	else {
		res.render('index',{title: 'USER REQUIRED' });
	}
};
