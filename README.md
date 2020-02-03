# Node.js 기초

## 1. 클라이언트-서버 환경

> **"구글에 주소 입력해서 접속하는 동안 무슨 일이 일어날까?"**

### 클라이언트/서버
* 클라이언트(Client) : 서비스를 요청
* 서버(Server) : 서비스를 제공
* 호스팅 서버(Hosting Server) : 웹페이지를 보여주는 서버
* 브라우저(Browser) : 서로 정보를 주고받는데 사용하는 프로그램

### http(s)

### Javascript
* 본래는 동적으로 클라이언트 쪽에서 웹페이지를 보여주는 용도로 사용되었는데 서버 프로그래밍을 할 수 있게 만들어짐
* 변수 선언
    * **var** : 같은 이름의 변수를 만들 수 있음
    * **let** : 변수의 재선언 불가능
* **함수형 프로그래밍** : 함수 자체를 값으로 생각!
* **콜백 함수** : 시스템이 적절할 때 알아서 호출하는 함수, event handler를 처리하는 함수, 요청이 들어왔을 때 어떤 동작을 해야할 지 처리하는 부분만 만들 수 있음, 함수가 매개변수로 집어넣을 수 있게!
* **모듈** : 별도의 파일로 다른 파일에 있는 기능을 가져다 쓰고 싶을 때 **require**을 사용하여 변수 선언

### 비동기처리방식(ASynchronous)
* ↔︎ **동기처리방식(Synchronous)** : 요청에 대한 결과라 오기를 기다렸다가 다음 작업을 하는 방식
* 다른 일을 하다가 요청이 오거나 작업이 완료되면 다음 작업을 하는 방식

### xml/json
* 요청한 결과나 페이지의 내용을 구성하는 것들을 표현하는 방식

### Node.js
* 기본적으로 꼭 필요하거나 자주 사용하는 기능들이 있는데 그러한 공통 기능들을 미리 만들어놓고 내가 필요한 기능만 덧붙이면 생산성 높아짐
* 프레임워크(Framework) : 미리 만들어놓은 뼈대

---

## 2. Node.js 환경 설정
* Node.js 샘플

```javascript
var http = require('http');

http.createServer(function handler(req, res) {
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('Hello World!\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337');
```
* 요청(request) : 누군가 주소로 접속
* 처리(response) : ( ) 안에 무엇을 할 지 입력, 서버에서 만들어내는 응답 정보인 응답 결과를 담는 객체가 **res**

* 입력 후 저장 ➔ 명령 프롬프트에 node hello_world.js 또는 f5 ➔ 웹 브라우저 실행하여 http://127.0.0.1:1337 또는 http://localhost:1337
* 다른 js 파일을 실행하고자 할 때는 launch.json 파일을 열어 실행할 js 파일을 지정

---

## 3. File System 모듈의 사용
- html 응답 결과를 직접 코드로 작성하지 않고 html 페이지로 대체

```javascript
var http = require("http");
var fs = require("fs");

http.createServer(function(request, response) {
    fs.readFile("./html/test_res.html", function(error, data) {
        if (error) {
            console.log(error.message);
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(data);
        }
    });
}).listen(1234, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1234');
```

---

## 4. 이미지 파일 사용
- 서버의 응답 결과로 이미지 제공

```javascript
fs.readFile('./img/butterfly.jpg', function(error, data) {
    if (error) {
        console.log(error.message);
    } else {
        response.writeHead(200, {'Content-Type': 'butterfly.jpg'});
        response.end(data);
    }
}):
```

---

## 5. 페이지 이동
- 서버에 접속할 때 특정 페이지로 이동

```javascript
var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(302, { Location: "https://cs.dongduk.ac.kr" });
    response.end();
}).listen(1234, function() {
    console.log('Server running at http://127.0.0.1:1234');
});
```

---

## 6. 다양한 페이지 접근
- 접속한 url을 분석하여 서로 다른 결과를 클라이언트에게 전송

```javascript
var url = require('url'); // url 처리하는 모듈 불러오기
var pathName = url.parse(request.url).pathname;

if (pathName == "/") {
    fs.readFile("./html/index.html", function(error, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(data);
    });
} else if (pathName == "/second") {
    fs.readFile("./html/second.html", function(error, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(data);
    });
}
```

---

## 7. Method(GET/POST) 속성 구분
- GET 방식의 클라이언트 요청을 확인하기

``` javascript
var http = require("http");
var url = require("url");
var querystring = require("querystring");

http.createServer(function(request, response) {
    var query = url.parse(request.url, true).query;

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("<h1>" + JSON.stringify(query) + "</h1>");
}).listen(1234, function() {
    console.log('Server running at http://127.0.0.1:1234');
});

```

_접속 주소 예 : http://127.0.0.1:1234?id=my_id&password=my_password_

- GET 방식으로 요청받은 페이지를 전송한 후 POST 요청 처리

```javascript
var http = require("http");
var fs = require("fs");

http.createServer(function(request, response) {
    if (request.method == "GET") {
        fs.readFile("./html/login.html", function(error, data) {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(data);
        });
    } else if (request.method == "POST") {
        request.on("data", function(data) {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end("<h1>" + data + "</h1>");
        });
    }
}).listen(1234, function() {
    console.log('Server running at http://127.0.0.1:1234');
});

```

* ~.on : '~할 때'라는 뜻, 데이터가 들어왔을 때와 같은 어떤 사건이 발생했을 때 사용하는 메소드!

## <참고> POST 방식으로 전달받은 data 값의 확인

```javascript
var querystring = require('querystring');

var text = "";
text += data;
var parsedStr = querystring.parse(text, '&', '=');
console.log(parsedStr.id);
console.log(parsedStr.pwd);
```

## 8. 실습
> 로그인 화면에서 id와 password를 같은 문자열로 입력하고 제출할 경우 학과 홈페이지로 이동하고, 다른 문자열로 입력하였을 경우 '로그인 실패!!!' 라고 표시하는 웹페이지(login_failed.html)를 보여주도록 서버를 작성하시오.

```javascript
var http = require("http");
var fs = require("fs");

http.createServer(function(request, response) {
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
}).listen(1234, function() {
    console.log('Server running at http://127.0.0.1:1234');
});

```
