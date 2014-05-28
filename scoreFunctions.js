var util = require('./gamma.js')

exports.profile2score = function(profileArray, tolerance){
	var n=profileArray.length;

	var pLower = new Array();
	var pUpper = new Array();

	for(var i=1;i<=n;i++){
		pLower[i]=pLower[i-1]+profileArray[i-1];
		pUpper[i]=pUpper[i-1]+profileArray[n-i];
	}

	var rLower = 0;
	var rUpper = 0;
	for(var i=1;i<=n-1;i++){
		if(pLower[i]>0){
			rLower=rLower+Math.exp( util.log_gamma(i+pLower[i])-util.log_gamma(i+1)-util.log_gamma(pLower[i]));
		}
		if(pUpper[i]>0){
			rUpper=rUpper+Math.exp( util.log_gamma(i+pUpper[i])-util.log_gamma(i+1)-util.log_gamma(pUpper[i]));
		}
	}
	rLower = 1-rLower/(n-1);
	rUpper = rUpper/(n-1);

	return (1 - tolerance) * Math.min(rLower,rUpper) + tolerance * Math.max(rLower,rUpper);
}

exports.score2rate = function(score, standart, impact){
	if(standart==0 || standart==1 || impact==0 ){
		return 1;
	} else if (score<(standart/(1-impact*(1-standart)))) {
		return Math.log(1 - score * (1 - impact * (1 - standart)) / standart) / Math.log(impact * (1 - standart));
	}  else {
		return -1;
	}
}

exports.rate2score = function(baseline, rateImpactArray){
	var n=rateImpactArray.length;
	for(var i=0;i<=n-1;i++){
		if(rateImpactArray[i][0]==-1){
			baseline=baseline/(1-rateImpactArray[i][1]*(1-baseline));
		}else {
			baseline=baseline*(1-Math.pow((rateImpactArray[i][1]*(1-baseline)), rateImpactArray[i][0]))/(1-rateImpactArray[i][1]*(1-baseline));
		}
	}
	return baseline;
}

exports.scores2score = function(scoreWeightArray, lenience){
	var n=scoreWeightArray.length;
	var min=1;
	var max=1;
	for(var i=0;i<=n-1;i++){
		//score weight array is suppoed to be a 2d array,
		//containing pairs of <score, weighting>
		min=min*Math.pow((1-scoreWeightArray[i]), 1/n);
		max=max*Math.pow(scoreWeightArray[i], 1/n);
		
		//min=min*Math.pow((1-scoreWeightArray[i][0]), scoreWeightArray[i][1]);
		//max=max*Math.pow(scoreWeightArray[i][0], scoreWeightArray[i][1]);
	}
	return (1 - lenience) * min + lenience * max;            
}

exports.score2grade = function(score, curvature, polarity, gMin, gMax){
	curvature = Math.pow((1-Math.pow(score, curvature)), (1/curvature));
	var g = polarity*curvature+(1-polarity)*(1-curvature);
	return g * gMin + (1-g)*gMax; 
}
