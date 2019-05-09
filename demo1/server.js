var http = require("http"); // node.js自带的http模块

// node.js实际上就是另一种上下文，它允许在后端（脱离浏览器环境）运行javascript代码；

// 1、要实现在后台运行的javascript代码，代码需要先被解释然后正确执行。node.js使用google的V8虚拟机来解释和执行javascript；
// 2、node.js还有许多有用的模块，它们可以简化很多重复的劳作，比如像终端输出字符串等；
// 总结：node.js事实上既是一个运行时环境，同时又是一个库。

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

function onRequest(request, response) {
	console.log("Request received.", request, response); // 当我们向服务器端发出请求（在浏览器访问http://localhost:8888/）时，运行台就会输出Request received
	response.writeHead(200, {
		"Content-Type": "text/plain"
	}); // 发送一个http状态200和http头的内容类型
	response.write("Hello World"); // 在http相应主题中发送文本hello word
	//runCmdTest()
	response.end(); // 完成响应
}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");


// var nodeCmd = require('node-cmd');
// function runCmdTest() {
//     nodeCmd.get(
//         'npm run new:view2',
//         function(err, data, stderr){
//             console.log(data);
//         }
//     );

//     nodeCmd.run('npm run new:view2');
// }

// 当我们使用http.createServer方法时，我们当然不只是想要侦听某个端口的服务器，
// 我们还想要它在服务器收到一个http请求时做点什么

// 我们创建了服务器，并向创建它的方法（createServer）传递了一个函数（onRequest），
// 无论何时我们的服务器收到一个请求，这个函数就会被调用

// 给某个方法传递了一个函数，这个方法在有相应事件发生是调用这个函数来进行回调