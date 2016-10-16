var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.post('/api/hello', urlencodedParser, function (req, res) {

	var data;
	
	switch (req.body['key']) {
	case 'wxl':
		data = {'message': '[POST] Hello Wang Xiaolong!'};
		break;
	case 'sar':
		data = {'message': '[POST] Hello Si Aoran!'};
		break;
	case 'lx':
		data = {'message': '[POST] Hello Lu Xin!'};
		break;
	default:
		data = {'message': '[POST] Who are you?'};
		break;
	}

	console.log('POST');
	console.log(req.body);

	res.end(JSON.stringify(data));
})


app.get('/api/hello', function (req, res) {

	var fs = require('fs');
	var data;
	
	switch (req.query['key']) {
	case 'wxl':
		data = fs.readFileSync('apiTest/hello/wxl.json','utf-8');
		break;
	case 'sar':
		data = fs.readFileSync('apiTest/hello/sar.json','utf-8');
		break;
	case 'lx':
		data = fs.readFileSync('apiTest/hello/lx.json','utf-8');
		break;
	default:
		data = fs.readFileSync('apiTest/hello/default.json','utf-8');
		break;
	}

	console.log('GET');
	console.log(req.query);
	
	res.end(data);
})


var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
  
})