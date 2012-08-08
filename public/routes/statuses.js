define(["templates/navbar", "templates/status"], function (navbar, status) {
  return function (args, view) {
    $("#navbar").html(navbar());
    $("#content").html(view());
    var container = $('#statuses');
    container.isotope({
      itemSelector: '.item'
    });

    if (!Array.prototype.some)
    {
      Array.prototype.some = function(fun /*, thisp */)
      {
        "use strict";
        if (this == null)
          throw new TypeError();
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun != "function")
          throw new TypeError();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
          if (i in t && fun.call(thisp, t[i], i, t))
            return true;
        }
        return false;
      };
    }
    container.isotope({
      getSortData: {
        count: function ( $elem ) {
          return parseFloat( $elem.attr('count') );
        }
      }
    });
    var socket = io.connect(document.location.href);
    var localList = [];
    socket.on('apiCall', function (data) {
      var needsUpdate = $();
      var needsRemove = [];
      var needsInsert = [];
      data.forEach(function (item) {
        item.id = item.url.replace(/[\.\/\\#';":,=+-_\[\]\{\}]/g, '_')
        // Create a reverse sorted api list
        // for each site.
        var list = [];
        for (var i in item.apis) {
          list.push({count:item.apis[i],api:i});
        };
        list.sort(function (a, b) {
          return b.count - a.count;
        });
        item.apis = "";
        list.forEach(function (api) {
          item.apis = item.apis + " " + api.api;
        });
        
        var found = false;
        localList.some(function (other) {
          if (other.url == item.url) {
            found = true;
            var dom = $('#' + item.id);
            if (dom.length === 0) {
              console.log('Unable to find ' + item.id);
            } else {
              dom.attr('count', item.count);
              dom.find('.apis').text(item.apis);
              needsUpdate.push(dom[0]);
            }
            return true;
          }
          return false;
        });
        if (!found) {
          needsInsert.push(item);
        }
      });
      localList.forEach(function (item) {
        if (!data.some(function (other) {
          return item.url === item.url;
        })) {
          needsRemove.push($('#' + item.url));
        }
      });
      if (needsInsert.length) {
        container.isotope('insert', $(status({statuses:needsInsert})));
      }
      if (needsRemove.length) {
        container.isotope('remove', needsRemove);
      }
      if (needsUpdate.length) {
        container.isotope('updateSortData', needsUpdate);
      }
      localList = data;
      setTimeout(function () {
        socket.emit('updateMe');
      }, 10000);
    });
    socket.emit('updateMe');
  };
});