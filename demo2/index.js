var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// 通过对象来传递请求处理程序
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);

// 函数式编程：将函数作为参数传递
// 将router对象传递进去，服务器随后可以调用这个对象的route函数