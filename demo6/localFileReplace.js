/*
 * @Description: 将读取的本地文件内容，存入到数据库中的tmp_content字段
 */

var mysql = require('mysql');
var fs = require('fs');

// var connection = mysql.createConnection({
// 	host: '127.0.0.1',
// 	user: 'root',
// 	password: '123456',
// 	database: 'database_name'
// });
var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '123456',
	database: 'database_name'
});

connection.connect();

(async() => {
	var key = 0;
	var newData = await selectParam();
	newData.map(async(item, index) => {
		await updateParam(item)
		if (index === newData.length - 1) {
			console.log('数据库更新完毕！')
		}
	})
})();

function selectParam() {
	return new Promise((resolve) => {
		connection.query('select tmp_content, id from cms_template where tmp_name="默认内容页"', function(error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(JSON.stringify(results));
			for (var i = 0; i < res.length; i++) {
				if (res[i].tmp_content) {
					var localFileCont = fs.readFileSync(__dirname + '/news-detail-tmp.html', 'utf8');
					res[i].tmp_content = localFileCont;
				} else {
					res[i].tmp_content = '';
				}

			}
			resolve(res)
		});
	})
}

function updateParam(data) {
	return new Promise((resolve) => {
		// 单引号转义，修正含有js代码的html字段串因存在单双引号混用时字符串无法匹配的问题
		connection.query(`update cms_template set tmp_content='${data.tmp_content.replace(/'/g, "\\'")}' where id=${data.id}`, function(err, result) {
			if (err) {
				console.log('[UPDATE ERROR] - ', err.message);
				return;
			}
			resolve()
		});
	})
}