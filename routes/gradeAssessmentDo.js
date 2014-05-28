/*
 * GET/POST login.
 */

var schemes = require('../DBschemes');
var db = require('../db');
var async = require("async");
var scoreFunctions = require("../scoreFunctions");

exports.post = function(req, res){
	var data = JSON.parse(req.body.postGrading);
	
	var scores = new Array(); //To save the scores for each assignment
	
	for (var as in data["assignments"]){
		var currentAssignment = data["assignments"][as];
		var tolerance = currentAssignment["tolerance"];
		
		for (var qs in currentAssignment["questions"]){
			var currentQuestion = currentAssignment["questions"][qs];
			var smileyArray	= currentQuestion["smileys"];
			//Count total amount
			var total = 0;

			for (var smiley in smileyArray){
				total = total + smileyArray[smiley];
			}

			//	create a relative distribution from smileys
			for (var smiley in smileyArray){
				smileyArray[smiley] = smileyArray[smiley] / total;
			}
			scores.push(scoreFunctions.profile2score(smileyArray, tolerance)); //Push the score for every question
		}
	}

	//lenience default
	var lenience = 0.85;
	var resultScore = scoreFunctions.scores2score(lenience, scores);

	resultScore = 0.719; //Debug Code

	schemes.Student.findOne({name: req.body.studentName}, function(err, foundStudent){
		console.log("Pre manipulation:");
		console.log(foundStudent.courses);
		var courseFound = 0;
		
		if(foundStudent.courses == null){ //The database sometimes does not save the course. This prevents it.
			foundStudent.courses = {};
		}
		
		for(var key in foundStudent.courses){
			if(foundStudent.courses[key].name == req.body.courseName){ //The course was already created
				foundStudent.courses[key].assessments[req.body.assessmentName] = resultScore; //Add the taken assessment to the course
				courseFound = 1; //Mark that we already edited the course
			}
		}
		if(courseFound == 0){ //We have to create the course
			var newCourse = new schemes.TakenCourse({name:req.body.courseName, assessments:{}});
			newCourse.assessments[req.body.assessmentName] = resultScore;
			newCourse.save();
			console.log("Student will now get additional course" + req.body.courseName);
			foundStudent.courses[req.body.courseName] = newCourse;
		}
		foundStudent.save();
		console.log("Post manipulation:");
		console.log(foundStudent.courses);
	});
};
