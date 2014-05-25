/*
 * GET/POST login.
 */

exports.post = function(req, res){
	res.render('gradeAssessment', { title: 'PASS', studentName: req.body.studentName, assessmentName: req.body.assessment, courseName: "Keks"}); //Change to req.body.courseName later 
};

exports.display = function(req, res){
	if(req.session.user != null){
		res.render('gradeAssessment', { title: 'PASS' });
	}
	else {
		res.render('index',{title: 'USER REQUIRED' });
	}
};
