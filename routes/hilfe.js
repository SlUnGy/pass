
/*
 * GET hilfe seite.
 */

exports.display = function(req, res){
  res.render('hilfe', { title: 'PASS - Hilfe' });
};
