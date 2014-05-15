/*
*   Visit http://www.johndcook.com/stand_alone_code.html for the source of this code and more like it.
*   Note that the functions Gamma and LogGamma are mutually dependent.
*
*   Translated into javascript for the pass-system.
*/

exports.gamma = function (x) {
	if (x <= 0.0)
	{
		console.error("Gamma: Invalid input argument x. Argument must be positive");
		return -1;
	}

	var gamma = 0.577215664901532860606512090; // Euler's gamma constant

	if (x < 0.001) {
		return 1.0/(x*(1.0 + gamma*x));
	}

	if (x < 12.0)
	{
		var y = x;
		var n = 0;
		var arg_was_less_than_one = (y < 1.0);

		if (arg_was_less_than_one)
		{
			y += 1.0;
		}
		else
		{
			n = floor(y) - 1;  
			y -= n;
		}

		var p = [ -1.71618513886549492533811E+0, 2.47656508055759199108314E+1, -3.79804256470945635097577E+2, 6.29331155312818442661052E+2, 8.66966202790413211295064E+2, -3.14512729688483675254357E+4, -3.61444134186911729807069E+4, 6.64561438202405440627855E+4];

		var q = [ -3.08402300119738975254353E+1, 3.15350626979604161529144E+2, -1.01515636749021914166146E+3, -3.10777167157231109440444E+3, 2.25381184209801510330112E+4, 4.75584627752788110767815E+3, -1.34659959864969306392456E+5, -1.15132259675553483497211E+5];

		var num = 0.0;
		var den = 1.0;

		var z = y - 1;
		for (i = 0; i < 8; i++)
		{
			num = (num + p[i])*z;
			den = den*z + q[i];
		}
		var result = num/den + 1.0;

		if (arg_was_less_than_one)
		{
			result /= (y-1.0);
		}
		else
		{
			for (i = 0; i < n; i++) {
				result *= y++;
			}
		}

		return result;
	}

	if (x > 171.624)
	{
		console.error("Gamma: X>171.624 => positive infinity");
		return -1;
	}

	return exp(log_gamma(x));
}

exports.log_gamma = function(x) {
	if (x <= 0.0)
	{
		console.error("LogGamma: Invalid input argument x. Argument must be positive");
		return -1;
	}

	if (x < 12.0)
	{
		return log(abs(gamma(x)));
	}
	var c = [ 1.0/12.0, -1.0/360.0, 1.0/1260.0, -1.0/1680.0, 1.0/1188.0, -691.0/360360.0, 1.0/156.0, -3617.0/122400.0];
	var z = 1.0/(x*x);
	var sum = c[7];
	for (i=6; i >= 0; i--)
	{
		sum *= z;
		sum += c[i];
	}
	var series = sum/x;

	var halfLogTwoPi = 0.91893853320467274178032973640562;
	var logGamma = (x - 0.5)*log(x) - x + halfLogTwoPi + series;    
	return logGamma;
}
