define(["templates/navbar", "templates/tweet"], function (navbar, tweet) {
  return function (args, view) {
    $("#navbar").html(navbar());
    $("#content").html(view());
    var container = $('#tweets');
    container.isotope({
      itemSelector: '.item'
    });

    var addTweets = function(tweets){
      container.html(tweet({tweets:tweets})).isotope('reloadItems').isotope({sortBy:'original-order'});
    };
    $.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?screen_name=bechtel&count=100&exclude_replies=true&callback=?", addTweets);
  };
});