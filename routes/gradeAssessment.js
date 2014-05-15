/*
 * GET/POST login.
 */

exports.display = function(req, res){
  if(req.session.user != null){
    res.render('gradeAssessment', { title: 'PASS' });
  }
  else {
    res.render('index',{title: 'USER REQUIRED' });
  }
};
