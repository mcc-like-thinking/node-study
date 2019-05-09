const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const request = require('./request')

const Axios = require('axios') // 也可以用axios请求

const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.blue(`${message}`))
const successLog = message => console.log(chalk.green(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

// 生成文件
const generateFile = (path, data) => {
    if (fs.existsSync(path)) {
        errorLog(`${path}文件已存在`)
        return
    }
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

log('相关文件夹及文件生成在 views/目录下')
log('请输入功能关键词:后端地址（如： list:/user/list），增删改查功能关键词为：add、delete、edit、list、detail，功能之间用空格分隔：')
process.stdin.on('data', async chunk => {
    // 请求地址
    const url = String(chunk).trim().toString()
    const urlObj = urlFormat(url)

    //模块名称
    let modName = url.split('/')[1]
    // 模块路径
    let modPath = resolve('../', modName)

    // 判断模块文件夹是否存在
    const hasComponentExists = fs.existsSync(modPath)
    if (hasComponentExists) {
        modName = modName + '' + Math.ceil(Math.random() * 99999)
        modPath = resolve('../', modName)
    }

    request.request(urlObj.list).then(async res => {
        log(`正在生成模块 ${modPath}`)
        await dotExistDirectoryCreate(modPath)

        console.log(res)

        //列表文件
        const listColumn = Object.keys(res[0])
        const list = resolve(modPath, 'list.vue')
        const listEjs = fs.readFileSync(__dirname + '/template/list.ejs', 'utf8')
        const listRet = ejs.render(listEjs, {
            modName: modName,
            column: listColumn,
            add: urlObj.add ? true : false,
            edit: urlObj.edit ? true : false,
            del: urlObj.delete ? true : false,
            detail: urlObj.detail ? true : false
        })
        await generateFile(list, listRet)

        // API文件
        const api = resolve(modPath, 'api.js')
        const apiEjs = fs.readFileSync(__dirname + '/template/api.ejs', 'utf8')
        const apiRet = ejs.render(apiEjs, {
            fetchUrl: urlObj.list ? urlObj.list : '',
            addUrl: urlObj.add ? urlObj.add : '',
            editUrl: urlObj.edit ? urlObj.edit : '',
            deleteUrl: urlObj.delete ? urlObj.delete : '',
            detailUrl: urlObj.detail ? urlObj.detail : ''
        })
        await generateFile(api, apiRet)

        // 添加、编辑文件
        if (urlObj.add || urlObj.edit) {
            // 表单提交页
            const manage = resolve(modPath, 'manage.vue')
            const manageEjs = fs.readFileSync(__dirname + '/template/manage.ejs', 'utf8')
            const manageRet = ejs.render(manageEjs, {
                modName: modName,
                column: listColumn
            })
            await generateFile(manage, manageRet)

            // 添加
            if (urlObj.add) {
                const add = resolve(modPath, 'add.vue')
                const addEjs = fs.readFileSync(__dirname + '/template/add.ejs', 'utf8')
                const addRet = ejs.render(addEjs, {
                    modName: modName
                })
                await generateFile(add, addRet)
            }

            // 编辑
            if (urlObj.edit) {
                const edit = resolve(modPath, 'edit.vue')
                const editEjs = fs.readFileSync(__dirname + '/template/edit.ejs', 'utf8')
                const editRet = ejs.render(editEjs, {
                    modName: modName
                })
                await generateFile(edit, editRet)
            }
        }

        // 详情文件
        if (urlObj.detail) {
            const detail = resolve(modPath, 'detail.vue')
            const detailEjs = fs.readFileSync(__dirname + '/template/detail.ejs', 'utf8')
            const detailRet = ejs.render(detailEjs, {
                modName: modName,
                column: listColumn
            })
            await generateFile(detail, detailRet)
        }

        successLog('生成成功')
        process.stdin.emit('end')
    }).catch(e => {
        errorLog(`生成失败，${e.message}`)
        process.stdin.emit('end')
    })

    // Axios({
    //   method: 'get',
    //   url: 'http://www.yideschool.com/mhh/list.json',
    //   //headers: {'Cookie': 'JSESSIONID=143F4B934D986C6557612E4DF5C9F67E'},
    //   // params: {
    //   //   page: 1,
    //   //   rows: 10
    //   // }
    // }).then(resp => {
    //     console.log('Axios',resp)
    // });
})
process.stdin.on('end', () => {
    log('exit')
    process.exit()
})

function dotExistDirectoryCreate(directory) {
    return new Promise((resolve) => {
        mkdirs(directory, function() {
            resolve(true)
        })
    })
}

// 递归创建目录
function mkdirs(directory, callback) {
    var exists = fs.existsSync(directory)
    if (exists) {
        callback()
    } else {
        mkdirs(path.dirname(directory), function() {
            fs.mkdirSync(directory)
            callback()
        })
    }
}

function urlFormat(url) {
    const urlArr = url.split(' ')
    const urlobj = {}
    urlArr.forEach((item, index) => {
        let tmp = item.split(':')
        let obj = {}
        obj[tmp[0]] = tmp[1]
        Object.assign(urlobj, obj);
    })
    return urlobj
}