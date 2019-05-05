// process.stdin
// 一个指向 标准输入流（stdin）的可读流（Readable Stream）
// 标准输入流默 认是暂停（pause）的，所以必须要调用process.stdin.resume() 来恢复resume接受：

process.stdin.on('end', function() {
	process.stdout.write('end');
});

function gets(cb) {
	process.stdin.setEncoding('utf8');

	//输入进入流模式（flowing-mode，默认关闭，需用resume开启），注意开启后将无法read到数据
	//见 https://github.com/nodejs/node-v0.x-archive/issues/5813
	process.stdin.resume();
	process.stdin.on('data', function(chunk) {
		console.log('start!');
		//去掉下一行可一直监听输入，即保持标准输入流为开启模式
		process.stdin.pause();
		cb(chunk);
	});
	console.log('试着在键盘敲几个字然后按回车吧');
}

gets(function(reuslt) {
	console.log("[" + reuslt + "]");
	//process.stdin.emit('end'); //触发end事件
});