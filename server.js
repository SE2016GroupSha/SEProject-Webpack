var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/api/pdo/add', urlencodedParser, function (req, res) {

	console.log(req.body);

	res.end('');
})

app.post('/api/pdo/all', urlencodedParser, function (req, res) {

	var fs = require('fs');
	var data = fs.readFileSync('apiTest/new/pdos.json','utf-8');

	console.log(req.body);
	res.end(data);
})
app.post('/api/pdo/checkname', urlencodedParser, function (req, res) {
	
	var data = {"valid": true};
	//-------------------------------
	if (req.body.pdoname=='111' || req.body.pdoname=='343' ) {
		data = {"valid": false};
	}

	console.log(req.body);

	res.end(JSON.stringify(data));
})

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
  
})