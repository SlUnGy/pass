
/*
 * GET/POST login.
 */

exports.display = function(req, res){
	if(req.session.student != null){
		res.render('mainStudent', { title: 'PASS', studentName: req.session.student.name  });
	}
	else {
		res.render('loginStudent', {title: 'PASS'});
	}
};
