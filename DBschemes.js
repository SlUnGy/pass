var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name:  String,
  password: String
});

userSchema.path('name').unique(true);

var User = mongoose.model('User', userSchema);

module.exports.User = User;

var takenCourseSchema = new mongoose.Schema({
	name: String,
	assessments: {} //Hashmap Assessmentname to Score
});

var TakenCourse = mongoose.model('TakenCourse', takenCourseSchema);

module.exports.TakenCourse = TakenCourse;

var studentSchema = new mongoose.Schema({
	name: String,
	courses: {}
});

var Student = mongoose.model('Student', studentSchema);

module.exports.Student = Student;

var courseSchema = new mongoose.Schema({
	title: String,
	assements: Array,
	students: Array
});

var Course = mongoose.model('Course', courseSchema);

module.exports.Course = Course;

var assessmentSchema = new mongoose.Schema({
	name: String,
	assessment: String
});

var Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports.Assessment = Assessment;
