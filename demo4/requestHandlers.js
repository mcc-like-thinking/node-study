let Token = ''
const userData = [
  {
    name: '李梅梅',
    sex: '女',
    age: 20
  },
  {
    name: '王小明',
    sex: '男',
    age: 22
  }
]

// 登录
function login(response, request, postData) {
  const params = JSON.parse(postData)

  Token = Date.parse(new Date())
  const resp = {
    status: 200,
    data: {
      Token: Token
    }
  }

  response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
  response.write(JSON.stringify(resp));
  response.end();
}

function login2(response, request) {
  Token = Date.parse(new Date())
  const resp = {
    status: 200,
    data: {
      Token: Token
    }
  }

  response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
  response.write(JSON.stringify(resp));
  response.end();
}

// 获取用户列表
function userList(response, request) {
  const resp = {
    status: 200,
    data: userData,
    total: userData.length
  }
  // if (request.headers.token != Token) {
  //   resp.status = 50008
  // }

  response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
  response.write(JSON.stringify(resp));
  response.end();
}

// 添加用户
function addUser(response, request, postData) {
  const params = JSON.parse(postData)
  userData.push(params)

  const resp = {
    status: 200,
    data: userData
  }
  // if (request.headers.token != Token) {
  //   resp.status = 50008
  // }

  response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
  response.write(JSON.stringify(resp));
  response.end();
}

exports.login = login;
exports.userList = userList;
exports.addUser = addUser;
