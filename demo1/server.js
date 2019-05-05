var http = require("http"); // node.js自带的http模块

// 启动服务器并监听8888端口(启动一个侦听8888端口的服务器)
// var server = http.createServer()
// server.listen(8888)

// createServer的唯一参数是一个匿名函数
// http.createServer(function(request, response) {
// 	response.writeHead(200, {
// 		"Content-Type": "text/plain"
// 	});
// 	response.write("Hello World");
// 	response.end();
// }).listen(8888);


// 函数传递是如何让http服务器工作的
// node.js是事件驱动的
var http = require("http");

function onRequest(request, response) {
	console.log("Request received."); // 当我们向服务器端发出请求（在浏览器访问http://localhost:8888/）时，运行台就会输出Request received
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});
	response.write("<button>点击</button>");
	runCmdTest()
	response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");


var nodeCmd = require('node-cmd');
function runCmdTest() {
    nodeCmd.get(
        'npm run new:view2',
        function(err, data, stderr){
            console.log(data);
        }
    );
 
    nodeCmd.run('npm run new:view2');
}

// 当我们使用http.createServer方法时，我们当然不只是想要侦听某个端口的服务器，
// 我们还想要它在服务器收到一个http请求时做点什么

// 我们创建了服务器，并向创建它的方法（createServer）传递了一个函数（onRequest），
// 无论何时我们的服务器收到一个请求，这个函数就会被调用

// 给某个方法传递了一个函数，这个方法在有相应事件发生是调用这个函数来进行回调