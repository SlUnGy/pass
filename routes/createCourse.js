/*
 * GET/POST login.
 */

exports.display = function(req, res){
  if(req.session.user != null){
    res.render('createCourse', { title: 'PASS' });
  }
  else {
    res.render('index',{title: 'USER REQUIRED' });
  }
};

exports.post = function(req, res){
  //console.log(req.body.name);
  //console.log(req.body.pw);
  res.render('createCourse', { title: 'PASS' });
};
