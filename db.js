var mongoose = require('mongoose');
var server = require('./connect');
var db = mongoose.connect('mongodb://' + server.details());

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function(){
  console.log('Connected');
});

module.exports.db = db;
