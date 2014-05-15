/*
 * GET/POST login.
 */

var schemes = require('../DBschemes');
var db = require('../db');
var async = require("async");

exports.post = function(req, res){	
	var newAssessment = new schemes.Assessment({name: req.body.assessmentName, assessment:req.body.postAssessment}); //Create the assessment
	newAssessment.save();
	res.render('main', { title: 'PASS' });
};
