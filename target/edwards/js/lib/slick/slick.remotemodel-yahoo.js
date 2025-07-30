(function ($) {
  /***
   * A sample AJAX data store implementation.
   * Right now, it's hooked up to load Hackernews stories, but can
   * easily be extended to support any JSONP-compatible backend that accepts paging parameters.
   */
  function RemoteModel() {
    // private
    var PAGESIZE = 10;
    var data = {length: 0};
    var h_request = null;
    var req = null; // ajax request

    // events
    var onDataLoading = new Slick.Event();
    var onDataLoaded = new Slick.Event();


    function init() {
    }


    function isDataLoaded(from, to) {
      for (var i = from; i <= to; i++) {
        if (data[i] == undefined || data[i] == null) {
          return false;
        }
      }

      return true;
    }


    function clear() {
      for (var key in data) {
        delete data[key];
      }
      data.length = 0;
    }

    function ensureData(from, to) {
      if (req) {
        req.abort();
        for (var i = req.fromPage; i <= req.toPage; i++) {
          data[i * PAGESIZE] = undefined;
        }
      }

      if (from < 0) {
        from = 0;
      }

      if (data.length > 0) {
        to = Math.min(to, data.length - 1);
      }

      var fromPage = Math.floor(from / PAGESIZE);
      var toPage = Math.floor(to / PAGESIZE);

      while (data[fromPage * PAGESIZE] !== undefined && fromPage < toPage)
        fromPage++;

      while (data[toPage * PAGESIZE] !== undefined && fromPage < toPage)
        toPage--;

      if (fromPage > toPage || ((fromPage == toPage) && data[fromPage * PAGESIZE] !== undefined)) {
        // TODO:  look-ahead
        onDataLoaded.notify({from: from, to: to});
        return;
      }

      var recStart = (fromPage * PAGESIZE);
      var recCount = (((toPage - fromPage) * PAGESIZE) + PAGESIZE);

      var url = "../apis/edwards/selectExpoStatisticItemList";
//      var params 	= {
//			"FROM_DT" 				: "20200416",
//			"TO_DT" 				: "20200416"
//		};

      if (h_request != null) {
        clearTimeout(h_request);
      }

      h_request = setTimeout(function () {
        for (var i = fromPage; i <= toPage; i++)
          data[i * PAGESIZE] = null; // null indicates a 'requested but not available yet'

        onDataLoading.notify({from: from, to: to});

        req = $.jsonp({
          url: url,
          callbackParameter: "callback",
          cache: true,
//          data 		: JSON.stringify(params),
          success: function (json, textStatus, xOptions) {
            onSuccess(json, recStart);
          },
          error: function () {
            onError(fromPage, toPage);
          }
        });

        req.fromPage = fromPage;
        req.toPage = toPage;
      }, 50);
    }


    function onError(fromPage, toPage) {
      alert("error loading pages " + fromPage + " to " + toPage);
    }

    function onSuccess(json, recStart) {
      var recEnd = recStart;
      if (json.query.count > 0) {
        var results = json.query.results.item;
        recEnd = recStart + results.length;
        data.length = 100;// Math.min(parseInt(results.length),1000); // limitation of the API

        for (var i = 0; i < results.length; i++) {
          var item = results[i];

          item.pubDate = new Date(item.pubDate);

          data[recStart + i] = { index: recStart + i };
          data[recStart + i].pubDate = item.pubDate;
          data[recStart + i].title = item.title;
          data[recStart + i].url = item.link;
          data[recStart + i].text = item.description;
        }
      }
      req = null;

      onDataLoaded.notify({from: recStart, to: recEnd});
    }


    function reloadData(from, to) {
      for (var i = from; i <= to; i++)
        delete data[i];

      ensureData(from, to);
    }

    init();

    return {
      // properties
      "data": data,

      // methods
      "clear": clear,
      "isDataLoaded": isDataLoaded,
      "ensureData": ensureData,
      "reloadData": reloadData,

      // events
      "onDataLoading": onDataLoading,
      "onDataLoaded": onDataLoaded
    };
  }

  // Slick.Data.RemoteModel
  $.extend(true, window, { Slick: { Data: { RemoteModel: RemoteModel }}});
})(jQuery);
