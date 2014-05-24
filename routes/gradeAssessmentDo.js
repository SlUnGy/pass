/*
 * GET/POST login.
 */

var schemes = require('../DBschemes');
var db = require('../db');
var async = require("async");
var scoreFunctions = require("../scoreFunctions");

exports.post = function(req, res){
	var data = JSON.parse(req.body.postGrading);
	
	/*
	var scores = new Array();
	for (var as in data["assignments"]){
	//	discard the null smileys (where are those from?)
		var smileyArray	= filledSmileys;
		
	//	create a relative distribution from smileys
		for (var smiley in smileyArray){
	//	the total amount is missing in the data
			smiley = smiley / total;
		}
		var tolerance = as["tolerance"]; 
	
	//	remember the calculated score 
		scores.push(scoreFunctions.profile2score(smileyArray, tolerance));
	}

	//lenience default
	var lenience = 0.85;
	var resultScore = scoreFunctions.scores2score(lenience, scores);

	//save resultscore to db
	*/
};
