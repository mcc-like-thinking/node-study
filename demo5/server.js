var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    const type = request.method.toLowerCase();

    if (type === 'get') {
        route(handle, pathname, response, request);
    } else {
    	let postData = '';

    	request.setEncoding("utf8");

	    request.addListener("data", function(postDataChunk) {
	      postData += postDataChunk;
	    });

	    request.addListener("end", function() {
	      route(handle, pathname, response, request, postData);
	    });
    }
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
