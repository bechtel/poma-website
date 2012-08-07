
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express();

// middleware
app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

// app.configure('development', function(){
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });

// app.configure('production', function(){
//   app.use(express.errorHandler());
// });

app.listen(20036, function(){
  console.log("Express server listening on port 20036");
});
