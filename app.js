
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration
app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');

// middleware
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.logger());
  app.use(express.static(__dirname + '/public'));
});

// app.configure('development', function(){
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });
// 
// app.configure('production', function(){
//   app.use(express.errorHandler());
// });

// Routes

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

app.listen(20036, function(){
  console.log("Express server listening on port 20036");
});
