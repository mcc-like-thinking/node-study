var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/addResource"] = requestHandlers.addResource;

server.start(router.route, handle);
