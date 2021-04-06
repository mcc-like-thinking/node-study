/*
 * @Description: 将读取的本地html文件，格式化后生成新的html文件
 */

var mysql = require('mysql');
const path = require('path');
var fs = require('fs');
var beautify_html = require('js-beautify').html;

const generateFile = (path, data) => {
    // if (fs.existsSync(path)) {
    //     errorLog(`${path}文件已存在`)
    //     return
    // }
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', err => {
            if (err) {
                errorLog(err.message)
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

var localFileCont = fs.readFileSync(__dirname + '/mcc.html', 'utf8');
generateFile(path.resolve(__dirname, 'mccBeauty.html'), beautify_html(localFileCont));