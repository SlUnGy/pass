/*
 * GET/POST login.
 */

var mongoose = require('mongoose');

exports.display = function(req, res){
  res.render('createCourseCouse', { title: 'PASS' });
};

exports.post = function(req, res){
  //console.log(req.body.name);
  //console.log(req.body.pw);
  res.render('createCourseStudents', { title: 'PASS'});
  
};
