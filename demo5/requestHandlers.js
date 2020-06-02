// 添加资源
function addResource(response, request, postData) {
  const resp = {
    status: 200,
    data: postData
  }

  response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
  response.write(JSON.stringify(resp));
  response.end();
}

exports.addResource = addResource;
