/*
 * GET/POST login.
 */

var schemes = require('../DBschemes');
var db = require('../db');
var async = require("async");


exports.post = function(req, res){
	var studentNames = JSON.parse(req.body.postStudents); //Get the single student names
	var courseStudents = new Array(); //This will hold the students from the DB for the course
	async.each(studentNames,	
		function(studentName, callback){
			schemes.Student.findOne({name: studentName}, function(err, foundStudent){
				if(err){
					return console.error(err);
				}
				if(foundStudent == null){ //We have to create the student
					var student = new schemes.Student({name: studentName, courses: {} });
					student.save();
					courseStudents.push(student);
				}
				else{
					courseStudents.push(foundStudent); //Push the found student
				}
				callback();				
			});
		},
		function(err){ //This is executed when the call is done
			var newCourse = new schemes.Course({title: req.body.courseName, assessments: null, students: courseStudents}); //Create the new course
			newCourse.save();
			console.log("Added course " + req.body.courseName + " with " + courseStudents.length + " students");
		}
	);
	res.render('main', { title: 'PASS' });
};
