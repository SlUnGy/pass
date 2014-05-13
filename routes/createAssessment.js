/*
 * GET/POST login.
 */

exports.display = function(req, res){
  if(req.session.user != null){
    res.render('createAssessment', { title: 'Create Assessment - PASS' });
  }
  else {
    res.render('index',{title: 'USER REQUIRED' });
  }
};

exports.post = function(req, res){
  res.render('createAssessment', { title: 'PASS' });
};
