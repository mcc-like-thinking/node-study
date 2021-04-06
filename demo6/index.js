/*
 * @Description: 修改数据库中的tmp_content字段，正则表达式匹配并替换字符串（来源:${document.agencyName!xxx}）
 */

var mysql = require('mysql');
var beautify_html = require('js-beautify').html;

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
		connection.query('select tmp_content, id from cms_template where tmp_name="通用细览"', function(error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(JSON.stringify(results));
			for (var i = 0; i < res.length; i++) {
				var patt = /来源[:：]\$\{document\.agencyName[\s\S]*?\}/;
				res[i].tmp_content = res[i].tmp_content.replace(patt, '来源：${document.agencyName!site.siteName!}');
				res[i].tmp_content = beautify_html(res[i].tmp_content);

				// 其他正则表达式写法
				// res[i].tmp_content = res[i].tmp_content.replace(/'/g, "\\'");
				// res[i].tmp_content = res[i].tmp_content.replace(/(^来源[:：]\$\{)(.*)(}$)/g, '$1document.agencyName!site.siteName!$3');
			}
			resolve(res)
		});
	})
}

function updateParam(data) {
	return new Promise((resolve) => {
		// 单引号转义，修正含有js代码的html字段串因存在单双引号混用时字符串无法匹配的问题
		// connection.query("update cms_template set tmp_content='" + data.tmp_content + "' where id=" + data.id + "", function(err, result) {
		connection.query(`update cms_template set tmp_content='${data.tmp_content.replace(/'/g, "\\'")}' where id=${data.id}`, function(err, result) {
			if (err) {
				console.log('[UPDATE ERROR] - ', err.message);
				return;
			}
			resolve()
		});
	})
}