var scoreFunctions = require("../scoreFunctions");

exports.display = function(req, res){
	if(req.session.student != null){
		//Parse the students courses and grades
		var studentCourses = new Array(); //This are the courses later passed
		var lenience = 0.85;
		var curvature=1.678;
		var polarity=1;
		var gMin=1;
		var gMax=5;

		//console.log(req.session.student);
		var foundStudent = req.session.student;

		for(var ikea in foundStudent.courses){
			var courseAssessments = new Array();
			var courseAssessmentScores = new Array(); //Needed for course grading in the end

			for(var key in foundStudent.courses[ikea].assessments){
				courseAssessmentScores.push(foundStudent.courses[ikea].assessments[key]); //We need this for the grading later on	
				courseAssessments.push({assessmentName:key, assessmentScore:foundStudent.courses[ikea].assessments[key]}); //Add the assessment
			}
			var courseResultScore = scoreFunctions.scores2score(courseAssessmentScores, lenience); 
			var courseGrade = scoreFunctions.score2grade(courseResultScore, curvature, polarity, gMin, gMax); //Calculate the grade for the course
			
			studentCourses.push({courseName: ikea, courseAssessments: courseAssessments, courseGrade: courseGrade}); //Add the course
		}

		res.render('mainStudent', { title: 'PASS', studentName: req.session.student, courses: studentCourses}); //Push the courses (including the assessments)
		
	}
	else {
		res.render('loginStudent', {title: 'PASS'});
	}
};
