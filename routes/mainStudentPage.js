var scoreFunctions = require("../scoreFunctions");

exports.display = function(req, res){
	if(req.session.student != null){
		var scores = new Array();

		//Parse the students courses and grades
		var studentCourses = new Array();
		for(var ikea in req.session.students.courses){
			var courseAssessments = new Array();
			for(var key in req.session.student.courses[ikea].assessments){
				courseAssessments.push({assessmentName:key, assessmentScore:req.session.student.assessments[key]}); //Add the assessment
			}
			studentCourses.push({courseName: ikea, courseAssessments: courseAssessments}); //Add the course
		}
		
		console.log(scores);
		var lenience = 0.85;
		var resultScore = scoreFunctions.scores2score(scores, lenience);
		console.log(resultScore);
		var curvature=1.678;
		var polarity=1;
		var gMin=1;
		var gMax=5;
		var grade = scoreFunctions.score2grade(resultScore, curvature, polarity, gMin, gMax);
		console.log(grade);
		res.render('mainStudent', { title: 'PASS', studentName: req.session.student.name, assessments: req.session.student.assessments, totalGrade: grade});
	}
	else {
		res.render('loginStudent', {title: 'PASS'});
	}
};
