var http = require('http');
const qs = require('querystring');

function request(url) {
	var options = {
		// host: '127.0.0.1',
		// port: 3000,
		//path: url + '?page=1&rows=10',
		host: 'www.yideschool.com',
		path: '/mhh/list.json',
		method: 'get',
		headers: {}
	};

	return new Promise((resolve, reject) => {
		//使用http 发送
		let req = http.request(options, function(res) {
			//设置字符编码
			res.setEncoding('utf8');

			//返回数据流
			let _data = '';

			//数据
			res.on('data', function(chunk) {
				_data += chunk;
			});

			// 结束回调
			res.on('end', function() {
				resolve(JSON.parse(_data));
			});

			//错误回调
			req.on('error', function(e) {
				reject(e);
			});
		});

		req.end();
	})
}

exports.request = request;