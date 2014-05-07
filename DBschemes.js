var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name:  String,
  password: String
});

userSchema.path('name').unique(true);

var User = mongoose.model('User', userSchema);

module.exports.User = User;

var studentSchema = new mongoose.Schema({
	name: String,
	assessments: Array
});

var Student = mongoose.model('Student', studentSchema);

module.exports.Student = Student;

var courseSchema = new mongoose.Schema({
	name: String,
	assements: Array,
	students: Array
});

var Course = mongoose.model('Course', courseSchema);

module.exports.Course = Course;

	
