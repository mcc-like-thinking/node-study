var http = require("http");
var url = require("url");

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(pathname); // 添加路由模块

		response.writeHead(200, {
			"Content-Type": "text/plain"
		});
		response.write("Hello World");
		response.end();
	}

	http.createServer(onRequest).listen(8888);
}

exports.start = start;

// 接收http请求
// 对不同的url请求，服务器有不同的反应
// 处理不同的http请求，在代码里是不同的部分 —— 路由选择
// 为路由提供: 请求的url和get、post参数，随后路由根据这些数据来执行相应的代码