var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');

var g_index = 4;
var g_data = eval('(' + fs.readFileSync('test_api/lx/allpdo.json','utf-8') + ')');

app.post('/api/pdo/all', urlencodedParser, function (req, res) {

	res.end(JSON.stringify(g_data));
})

app.post('/api/pdo/add', urlencodedParser, function (req, res) {

	var json = eval('(' + req.body['params'] + ')'); 
	var pdos = json['pdos']
	
	for (var i=0; i<pdos.length; i++) {
		var n = g_index++;
		pdos[i]['id'] = n.toString();
		g_data['pdos'].push(pdos[i]);
	}
	
	var data = {state: 'success'};
	res.end(JSON.stringify(data));
})


// app.post('/api/pdo/add', urlencodedParser, function (req, res) {

	// console.log(req.body);
	
	// var data = {"state": "success"};
	// res.end(JSON.stringify(data));
// })

// app.post('/api/pdo/all', urlencodedParser, function (req, res) {

	// var fs = require('fs');

	// var data = fs.readFileSync('test_api/lx/allpdo.json','utf-8');
	// var data = fs.readFileSync('test_api/wxl/allpdo.json','utf-8');

	// console.log('POST');
	// console.log(req.body);

	// res.end(data);
// })


app.post('/api/pdo/checkname', urlencodedParser, function (req, res) {
	
	var data = {"valid": "true"};
	//-------------------------------
	if (req.body.name=='111' || req.body.name=='343' ) {
		data = {"valid": "false"};
	}

	console.log(req.body);

	res.end(JSON.stringify(data));
})



app.post('/api/data/redata', urlencodedParser, function (req, res) {

	var data;
	
	var json = eval('(' + req.body['params'] + ')'); 
	
	switch (json['pdo']) {
	case '0':
		data = {"datas":[{"id":"9","time":1477412666666,"pdo":"1","values":["00学校","网吧","1分钟"],"related_data":[]},{"id":"8","time":1477412577654,"pdo":"3","values":["10.23"],"related_data":[]},{"id":"7","time":1477412576999,"pdo":"3","values":["23.10"],"related_data":["4","5","6"]},{"id":"6","time":1477412576389,"pdo":"3","values":["32.10"],"related_data":["4","5","7"]},{"id":"5","time":1477412568543,"pdo":"2","values":["家人和学校同学","2016-10-23"],"related_data":[]},{"id":"4","time":1477412545804,"pdo":"1","values":["家","学校","10分钟"],"related_data":[]}],"pdos":[{"id":"1","time":1477410877415,"user":"0","name":"坐车","fields":["始点","终点","耗时"]},{"id":"2","time":1477412043598,"user":"0","name":"上学","fields":["伙伴","日期"]},{"id":"3","time":1477411586548,"user":"0","name":"支付","fields":["金额"]}]};
		break;
	case '1':
		data = {"datas":[{"id":"5","time":1477412568543,"pdo":"2","values":["11家人和学校同学","2016-10-23"],"related_data":["4","6","7"]},{"id":"4","time":1477412545804,"pdo":"1","values":["家","学校","10分钟"],"related_data":["5","6","7"]}],"pdos":[{"id":"1","time":1477410877415,"user":"0","name":"坐车","fields":["始点","终点","耗时"]},{"id":"2","time":1477412043598,"user":"0","name":"上学","fields":["伙伴","日期"]}]};
		break;
	case '2':
		data = {"datas":[{"id":"5","time":1477412568543,"pdo":"2","values":["22家人和学校同学","2016-10-23"],"related_data":["4","6","7"]},{"id":"4","time":1477412545804,"pdo":"1","values":["家","学校","10分钟"],"related_data":["5","6","7"]}],"pdos":[{"id":"1","time":1477410877415,"user":"0","name":"坐车","fields":["始点","终点","耗时"]},{"id":"2","time":1477412043598,"user":"0","name":"上学","fields":["伙伴","日期"]}]};
		break;
	default:
		data = {"datas":[],"pdos":[]};
		break;
	}

	console.log('POST');
	console.log(req.body);
	console.log(JSON.stringify(data));

	res.end(JSON.stringify(data));
})

app.post('/api/search/fuzzy', urlencodedParser, function (req, res) {

	var data;
	
	var json = eval('(' + req.body['params'] + ')'); 
	
	switch (json['keys'][0]) {
	case '':
		data = {datas:[{id:"9",time:1577412666666,pdo:"1",values:["00学校","网吧","1分钟"],related_data:["4"]},{id:"7",time:1477412576999,pdo:"3",values:["23.10"],related_data:["4","5","6"]},{id:"8",time:1477412577654,pdo:"3",values:["10.23"],related_data:[]},{id:"5",time:1477412568543,pdo:"2",values:["家人和学校同学","2016-10-23"],related_data:["6","7"]},{id:"4",time:1477412545804,pdo:"1",values:["家","学校","10分钟"],related_data:["6","7","9"]},{id:"6",time:1477412576389,pdo:"3",values:["32.10"],related_data:["4","5","7"]}],pdos:[{id:"3",time:1477411586548,"user":"0","name":"支付","fields":["金额"]},{id:"1",time:1477410877415,"user":"0","name":"坐车","fields":["始点","终点","耗时"]},{id:"2",time:1477412043598,"user":"0","name":"上学","fields":["伙伴","日期"]}]};
		break;
	case '0':
		data = {datas:[{id:"9",time:1477412666666,pdo:"1",values:["00学校","网吧","1分钟"],related_data:["4"]},{id:"5",time:1477412568543,pdo:"2",values:["家人和学校同学","2016-10-23"],related_data:["6","7"]},{id:"6",time:1477412576389,pdo:"3",values:["32.10"],related_data:["4","5","7"]}],pdos:[{id:"3",time:1477411586548,"user":"0","name":"支付","fields":["金额"]},{id:"1",time:1477410877415,"user":"0","name":"坐车","fields":["始点","终点","耗时"]},{id:"2",time:1477412043598,"user":"0","name":"上学","fields":["伙伴","日期"]}]};
		break;
	case '1':
		data = {datas:[{id:"7",time:1477412576999,pdo:"3",values:["23.10"],related_data:["4","5","6"]}],pdos:[{id:"3",time:1477411586548,"user":"0","name":"支付","fields":["金额"]},{id:"1",time:1477410877415,"user":"0","name":"坐车","fields":["始点","终点","耗时"]},{id:"2",time:1477412043598,"user":"0","name":"上学","fields":["伙伴","日期"]}]};
		break;
	case '2':
		data = {datas:[{id:"8",time:1477412577654,pdo:"3",values:["10.23"],related_data:[]},{id:"4",time:1477412545804,pdo:"1",values:["家","学校","10分钟"],related_data:["6","7","9"]}],pdos:[{id:"3",time:1477411586548,"user":"0","name":"支付","fields":["金额"]},{id:"1",time:1477410877415,"user":"0","name":"坐车","fields":["始点","终点","耗时"]},{id:"2",time:1477412043598,"user":"0","name":"上学","fields":["伙伴","日期"]}]};
		break;
	default:
		data = {"datas":[],"pdos":[]};
		break;
	}

	console.log('POST');
	console.log(req.body);
	console.log(JSON.stringify(data));

	res.end(JSON.stringify(data));
})


app.post('/api/data/add', urlencodedParser, function (req, res) {

	var data;
	
	data = {"state":"success"};

	console.log('POST');
	console.log(req.body);

	res.end(JSON.stringify(data));
})

app.post('/api/user/login', urlencodedParser, function (req, res) {

	var data = {"state":"success"};;

	console.log('POST');
	console.log(req.body);

	res.end(JSON.stringify(data));
})

app.post('/api/user/logout', urlencodedParser, function (req, res) {

	var data = {"state":"success"};;

	console.log('POST');
	console.log(req.body);

	res.end(JSON.stringify(data));
})

app.post('/api/user/reg', urlencodedParser, function (req, res) {

	var data = {"state":"success"};;

	console.log('POST');
	console.log(req.body);

	res.end(JSON.stringify(data));
})

app.post('/api/user/checklogin', urlencodedParser, function (req, res) {

	var data = {"state":"success"};;

	console.log('POST');
	console.log(req.body);

	res.end(JSON.stringify(data));
})

app.post('/api/user/checkname', urlencodedParser, function (req, res) {

	var data = {"valid":"true"};;

	console.log('POST');
	console.log(req.body);

	res.end(JSON.stringify(data));
})

app.post('/api/user/username', urlencodedParser, function (req, res) {

	var data = {"state":"success", "username":"luxinxyz"};;

	console.log('POST');
	console.log(req.body);

	res.end(JSON.stringify(data));
})

app.post('/api/user/regdays', urlencodedParser, function (req, res) {

	var data = {"state":"success", "regdays":"111", "regtime":1481614600991};

	console.log('POST');
	console.log(req.body);

	res.end(JSON.stringify(data));
})

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
  
})