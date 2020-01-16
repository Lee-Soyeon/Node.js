var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

http
  .createServer(function(request, response) {
    // 1. File System 모듈의 사용
    // fs.readFile("./html/test_res.html", function(error, data) {
    //   if (error) {
    //     console.log(error.message);
    //   } else {
    //     response.writeHead(200, { "Content-Type": "text/html" });
    //     response.end(data);
    //   }
    // });

    // 2. 이미지 파일 사용하기
    // fs.readFile("./img/butterfly.jpg", function(error, data) {
    //   if (error) {
    //     console.log(error.message);
    //   } else {
    //     response.writeHead(200, { "Content-Type": "butterflt.jpg" });
    //     response.end(data);
    //   }
    // });

    // 3. 페이지 이동하기
    // response.writeHead(302, { Location: "https://cs.dongduk.ac.kr" });
    // response.end();

    // 4. 다양한 페이지 접근
    // var pathName = url.parse(request.url).pathname;
    // if (pathName == "/") {
    //   fs.readFile("./html/index.html", function(error, data) {
    //     response.writeHead(200, { "Content-Type": "text/html" });
    //     response.end(data);
    //   });
    // } else if (pathName == "/second") {
    //   fs.readFile("./html/second.html", function(error, data) {
    //     response.writeHead(200, { "Content-Type": "text/html" });
    //     response.end(data);
    //   });
    // }

    // 5. Method GET/POST 속성 구분
    var query = url.parse(request.url, true).query;

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("<h1>" + JSON.stringify(query) + "</h1>");

    if (request.method == "GET") {
      fs.readFile("./html/login.html", function(error, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(data);
      });
    } else if (request.method == "POST") {
      request.on("data", function(data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>" + data + "</h1>");
        // 실습
        var text = "";
        text += data;
        var parsedStr = querystring.parse(text, "&", "=");
        console.log(parsedStr.id);
        console.log(parsedStr.pwd);
        if (parsedStr.id == parsedStr.pwd) {
          response.writeHead(302, { Location: "https://cs.dongduk.ac.kr" });
          response.end();
        } else {
          fs.readFile("./html/login_failed.html", function(error, file_data) {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(file_data);
          });
        }
      });
    }
  })
  .listen(1234, function() {
    console.log("Server running at http://127.0.0.1:1234");
  });
