var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/login"] = requestHandlers.login;
handle["/userList"] = requestHandlers.userList;
handle["/addUser"] = requestHandlers.addUser;

server.start(router.route, handle);
