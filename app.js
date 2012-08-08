
/**
 * Module dependencies.
 */

var express = require('express'),
    io = require('socket.io');

var app = express();
	
	
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

var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
   
server.listen(20036, function(){
  console.log("Express server listening on port 20036");
});

// ----- FAKE DATA -----
// Some Fake Data
// Some Fake URLS
var someUrls = ["www.microsoft.com", "google.com", "somewhere.com", "somewhereelse.com", "example.com",
  "richteralsi.com", "cooldude.com"];
// Some Fake APIS
var someApis = ["twitter", "sensor1", "sensor2", "coolness", "interruptions", "fat", "loudness"];
// Return a list of the last set of API calls.
// Each item should have
// {
//    url: the site that made the api call
//    api: name of the api they called
// }
function getApiCalls() {
  // Generate some fake API call logs
  var array = [];
  var num = Math.floor(Math.random() * 1000);
  for (var i = 0; i < num; i++) {
    array.push({
      url:someUrls[Math.floor(Math.random() * someUrls.length)],
      api:someApis[Math.floor(Math.random() * someApis.length)]
    });
  }
  return array;
}
// ------ END FAKE DATA ------

var apiSummary = [];
var apiSummaryMax = 50;

// Summarize all calls
function aggregateApiCalls() {
  var apiCalls = getApiCalls();
  apiCalls.forEach(function (apiCall) {
    var found = false;
    apiSummary.forEach(function (api) {
      if (apiCall.url == api.url) {
        found = true;
        api.count++;
        api.apis[apiCall.api] = (api.apis[apiCall.api] || 1) + 1;
      }
    });
    if (!found) {
      var item = {url:apiCall.url, apis:{}, count:1};
      item.apis[apiCall.api] = 1;
      apiSummary.push(item);
    }
  });
  apiSummary.sort(function (a, b) {
    return a.count - b.count;
  });
  apiSummary.splice(50, apiSummary.length - 50);
  apiSummary.forEach(function (api) {
    api.count = api.count * 3 / 4;
    for (var i in api.apis) {
      api.apis[i] = api.apis[i] * 3 / 4;
    }
  });
}

setInterval(aggregateApiCalls, 1000);

io.sockets.on('connection', function (socket) {
  socket.on('updateMe', function () {
    socket.emit('apiCall', apiSummary);
  });
});