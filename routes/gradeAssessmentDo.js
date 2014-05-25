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
			console.log(smileyArray);
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
			console.log(scores);
		}
	}

	//lenience default
	var lenience = 0.85;
	var resultScore = scoreFunctions.scores2score(lenience, scores);

	console.log(resultScore);
	//save resultscore to db
	schemes.TakenCourse.findOne({name: req.body.courseName}, function(err, foundCourse){
		if(err){
			return console.error(err);
		}
		if(foundcourse == null){
			var foundCourse = new schemes.TakenCourse({name:req.body.courseName}); //Create course if necessary
		}
		foundCourse.assessments[req.body.assessmentName] = resultScore;

		schemes.Student.findOne({name: req.body.studentName}, function(err, foundStudent){
			if(foundCourse in foundStudent.courses){
			}
			else{
				foundStudent.courses.push(foundCourse); //Add the new course if necessary
			}
		});	
	});

};
