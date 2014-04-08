/*
 * GET/POST login.
 */

exports.display = function(req, res){
  res.render('login', { title: 'PASS' });
};

exports.post = function(req, res){
  console.log(req.body.name);
  console.log(req.body.pw);
  res.render('login', { title: 'PASS' });
};
