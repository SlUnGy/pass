/*
 * GET/POST login.
 */

exports.display = function(req, res){
  res.render('createCourse', { title: 'PASS' });
};

exports.post = function(req, res){
  //console.log(req.body.name);
  //console.log(req.body.pw);
  res.render('createCourse', { title: 'PASS' });
};
