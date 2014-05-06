/*
GET/POST login.
 */

exports.display = function(req, res){
  res.render('admin', { title: 'PASS' });
};

exports.post = function(req, res){
  //console.log(req.body.name);
  //console.log(req.body.pw);
  res.render('admin', { title: 'PASS' });
};

