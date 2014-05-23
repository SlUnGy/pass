/*
 * GET/POST login.
 */

var schemes = require('../DBschemes');
var db = require('../db');
var async = require("async");
var scoreFunctions = require("../scoreFunctions");

exports.post = function(req, res){
	console.log(req.body.postGrading);
};
