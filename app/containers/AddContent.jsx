require('../../css/lx/add.css');
var Handlebars = require('../../node_modules/handlebars/dist/handlebars.js');

var AddContent = React.createClass({
	propTypes: {
		
	},
	getInitialState: function () {
		return {
				
		};
	},
	componentDidMount: function () {

		var self = this;
		
		
		Date.prototype.format = function(fmt)   
		{ //author: meizz   
		  var o = {   
			"M+" : this.getMonth()+1,                 //月份   
			"d+" : this.getDate(),                    //日   
			"h+" : this.getHours(),                   //小时   
			"m+" : this.getMinutes(),                 //分   
			"s+" : this.getSeconds(),                 //秒   
			"q+" : Math.floor((this.getMonth()+3)/3), //季度   
			"S"  : this.getMilliseconds()             //毫秒   
		  };   
		  if(/(y+)/.test(fmt))   
			fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
		  for(var k in o)   
			if(new RegExp("("+ k +")").test(fmt))   
		  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		  return fmt;   
		};
		
		
		
		Handlebars.registerHelper("hidden", function(n, options){
		   if(n > 2){ //在typeahead中做了修改
			 return options.fn(this);
		   }else{
			 return options.inverse(this);
		  }
		});

		Handlebars.registerHelper('remain', function (n, options) {
		  return n-2;
		});
		
		
		$(this.refs.pdoSearch).typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 0,
		  classNames: {
			highlight: 'add-highlight'
		  }
		},
		{
		  name: 'pdoSearch',
		  display: function(param) {
			//console.log(param);
			return param['name'];
		  },
		  limit: 2,
		  source: function(q, sync, async) {
			/*
			sync([
			{"name":"上学","fields":["始点","终点","耗时"],"time":"2016/11/30 15:40"},
			{"name":"出行","fields":["始点","终点","耗时"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"上学","fields":["始点","终点","耗时"],"time":"2016/11/30 15:40"}
			]);
			*/
			
			
			var self = this;
			$.ajax({
				async: true,//异步
				type:"POST",
				cache: false,
				url: "api/pdo/all",
				dataType: "json",
				success: function(data) {
					for (var i=0; i<data['pdos'].length; i++) {
						data['pdos'][i]['time'] = new Date(data['pdos'][i]['time']).format("yyyy/MM/dd hh:mm");
					}
					async(data['pdos']);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					async([]);
				}
			});
			
			/*
			setTimeout(function() {
				async([
						{"name":"上学","fields":["始点","终点","耗时"],"time":"2016/11/30 15:40"},
						{"name":"出行","fields":["始点","终点","耗时"],"time":"2014/03/24 00:40"},
						{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
						{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
						{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
						{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
						{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
						{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
						{"name":"出行","fields":["始点","终点","耗时"],"time":"2014/03/24 00:40"}
					  ]);
			},1000);
			*/
		  },
		  templates: {
			header: '<div class="search-header"><i>符合条件的结果</i></div>',
			footer: Handlebars.compile('<div class="search-footer">{{#hidden length}}<i>还有{{remain length}}条结果未显示</i>{{else}}<i>已显示全部结果</i>{{/hidden}}</div>'),
			empty: '<div class="empty-message" style="text-align: center;">没有符合条件的数据</div>',
			suggestion: Handlebars.compile('<div class="search-card u-cf"><div class="search-card-content"><div class="search-card-title">{{name}}</div><div class="search-card-details">{{#each fields}}<strong>{{this}}</strong>&nbsp;&nbsp;&nbsp;{{/each}}</div></div><div class="search-card-attachs"><div class="search-card-time"><span class="search-card-time-label">时间：</span> {{time}}</div></div></div>')
			/* render template
			<div class="search-card u-cf">
				<div class="search-card-content">
					<div class="search-card-title">{{name}}</div>
					<div class="search-card-details">
						{{#each fields}}
							<span class="label label-info">{{this}}</span>
							&nbsp;&nbsp;&nbsp;
						{{/each}}
					</div>
				</div>
				<div class="search-card-attachs">
					<div class="search-card-time">
						<span class="search-card-time-label">时间：</span> 
						{{time}}
					</div>
				</div>
			</div>
			*/
			
		  }
		})
		.on('typeahead:asyncrequest', function() {
			console.log('pdo asyncrequest');
		})
		.on('typeahead:asynccancel', function() {
			console.log('pdo asynccancel');
		})
		.on('typeahead:asyncreceive', function() {
			console.log('pdo asyncreceive');
		})
		.bind('typeahead:select', function(ev, suggestion) {
		  console.log('PDO Selection: ' + JSON.stringify(suggestion));
		});
		
		
		$(this.refs.dataSearch).typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 0,
		  classNames: {
			highlight: 'add-highlight'
		  }
		},
		{
		  name: 'dataSearch',
		  display: function(param) {
			return param['name'];
		  },
		  limit: 2,
		  source: function(q, sync, async) {
			/*
			sync([
			{"name":"上学","values":{"始点":"家","终点":"学校","耗时":"10分钟"},"time":"2016/11/30 15:40"},
			{"name":"出行","values":{"始点":"火车站","终点":"珠穆朗玛峰","耗时":"32年11月34日12小时4分..."},"time":"2014/03/24 00:40"},
			{"name":"出行","values":{"始点":"火车站","终点":"珠穆朗玛峰","耗时":"32年11月34日12小时4分..."},"time":"2014/03/24 00:40"},
			{"name":"出行","values":{"始点":"火车站","终点":"珠穆朗玛峰","耗时":"32年11月34日12小时4分..."},"time":"2014/03/24 00:40"},
			{"name":"出行","values":{"始点":"火车站","终点":"珠穆朗玛峰","耗时":"32年11月34日12小时4分..."},"time":"2014/03/24 00:40"},
			{"name":"出行","values":{"始点":"火车站","终点":"珠穆朗玛峰","耗时":"32年11月34日12小时4分..."},"time":"2014/03/24 00:40"},
			{"name":"出行","values":{"始点":"火车站","终点":"珠穆朗玛峰","耗时":"32年11月34日12小时4分..."},"time":"2014/03/24 00:40"},
			{"name":"出行","values":{"始点":"火车站","终点":"珠穆朗玛峰","耗时":"32年11月34日12小时4分..."},"time":"2014/03/24 00:40"},
			{"name":"出行","values":{"始点":"火车站","终点":"珠穆朗玛峰","耗时":"32年11月34日12小时4分..."},"time":"2014/03/24 00:40"}
			]);
			*/

			var array = q.split(/\s+/);
			//array.push(q);
			array = array.filter(function(e){return e!="";});
			if (array.length==0) {
				array.push("");
			}
			var httpParams = {keys:array};
			
			var self = this;
			$.ajax({
				async: true,//异步
				type:"POST",
				cache: false,
				url: "api/search/fuzzy",
				data: {'params':JSON.stringify(httpParams)},
				dataType: "json",
				success: function(data) {
					var pdos = data['pdos'];
					var pdosIndex = {};
					for (var i=0; i<pdos.length; i++) {
						var id = pdos[i]['id'];
						pdosIndex[id] = pdos[i];
					}
					
					var datas = data['datas'];
					for (var i=0; i<datas.length; i++) {
						var pdo = datas[i]['pdo'];
						var fields = pdosIndex[pdo]['fields'];
						var values = datas[i]['values'];
						var pairs = {};
						for (var j=0; j<fields.length; j++) {
							var key = fields[j];
							var value = values[j];
							pairs[key] = value;
						}
						datas[i]['name'] = pdosIndex[pdo]['name'];
						datas[i]['values'] = pairs;
					}
					
					for (var i=0; i<datas.length; i++) {
						datas[i]['time'] = new Date(datas[i]['time']).format("yyyy/MM/dd hh:mm");
					}
					async(datas);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					async([]);
				}
			});
		  },
		  templates: {
			header: '<div class="search-header"><i>符合条件的结果</i></div>',
			footer: Handlebars.compile('<div class="search-footer">{{#hidden length}}<i>还有{{remain length}}条结果未显示</i>{{else}}<i>已显示全部结果</i>{{/hidden}}</div>'),
			empty: '<div class="empty-message" style="text-align: center;">没有符合条件的数据</div>',
			suggestion: Handlebars.compile('<div class="search-card u-cf"><div class="search-card-content"><div class="search-card-title">{{name}}</div><div class="search-card-details">{{#each values}}<strong>{{@key}}</strong>:&nbsp;{{this}}&nbsp;&nbsp;&nbsp;{{/each}}</div></div><div class="search-card-attachs"><div class="search-card-time"><span class="search-card-time-label">时间：</span> {{time}}</div></div></div>')
		    /* render template
			<div class="search-card u-cf">
				<div class="search-card-content">
					<div class="search-card-title">{{name}}</div>
					<div class="search-card-details">
						{{#each values}}
							<span class="label label-success">{{@key}}</span>
							&nbsp;{{this}}&nbsp;&nbsp;&nbsp;
						{{/each}}
					</div>
				</div>
				<div class="search-card-attachs">
					<div class="search-card-time">
						<span class="search-card-time-label">时间：</span> 
						{{time}}
					</div>
				</div>
			</div>
			*/
			
		  }
		})
		.on('typeahead:asyncrequest', function() {
			console.log('data asyncrequest');
		})
		.on('typeahead:asynccancel', function() {
			console.log('data asynccancel');
		})
		.on('typeahead:asyncreceive', function() {
			console.log('data asyncreceive');
		})
		.bind('typeahead:select', function(ev, suggestion) {
		  console.log('Data Selection: ' + JSON.stringify(suggestion));
		});
		
		
		$(this.refs.clockTest).clockpicker({
			default: 'now',
			autoclose: true
		});
		
		
		$(this.refs.dateTest).datepicker({
			language: "zh-CN",
			orientation: "bottom auto",
			autoclose: true,
			todayHighlight: true
		});
		

		function topStopScroll(e){
			//console.log(e.deltaX, e.deltaY, e.deltaFactor);
			var box = $(this).get(0);
			if(box.scrollTop === 0){
				if(e.deltaY > 0) {
					e.preventDefault();
					return false;
				}
			}
		}
		
		
		function bottomStopScroll(e){
			//console.log(e.deltaX, e.deltaY, e.deltaFactor);
			var box = $(this).get(0);
			//console.log(box.scrollTop, $(box).height(), box.scrollHeight);
			//console.log($(box).css('padding-top').replace('px', ''), $(box).css('padding-bottom').replace('px', ''));
			if (box.scrollTop + $(box).height() + 
				Number($(box).css('padding-top').replace('px', '')) + 
				Number($(box).css('padding-bottom').replace('px', '')) >= box.scrollHeight) {
				if(e.deltaY < 0) {
					e.preventDefault();
					return false;
				}
			}
		}
		
		$(this.refs.topStopMenu).find('.tt-menu').on('mousewheel', topStopScroll);
		$(this.refs.bottomStopMenu).find('.tt-menu').on('mousewheel', bottomStopScroll);

	},
	substringMatcher: function(strs) {
		return function findMatches(q, cb) {
			var matches, substrRegex;
			matches = [];
			substrRegex = new RegExp(q, 'i');
			$.each(strs, function(i, str) {
				if (substrRegex.test(str)) {
					matches.push(str);
				}
			});
			alert(matches);
			cb(matches);
		};
	},
	clearFocus: function(item) {
		switch (item) {
		case 'submitButton' :
			this.refs.submitButton.blur();
			break;
		default:
			break;
		}
	},
	render: function () {
		
		var inputs = [];
		
		
		return (
				<div className="row clearfix">
					<div className="col-md-12 column">
						<div className="row clearfix">
							<div className="col-md-8 col-md-offset-2 column">
							
								<div className="add-header">
									<form className="form-horizontal" role="form">

										<div className="form-group">
											<label className="col-md-2 control-label">PDO</label>
											<div className="col-md-10" id="pdo-dropdown-menu" ref="bottomStopMenu">
												<span className="glyphicon glyphicon-search form-control-feedback" style={{color:'#1986B4',left:20}}></span>
												<input ref="pdoSearch" autoComplete="off" type="text" className="form-control" style={{paddingLeft:40, paddingRight:40}} placeholder="请输入关键字，以空格分开" />
												<img className="form-control-feedback" src={require('../../imgs/spinner.gif')} style={{display: 'normal',width: '20px', height: '20px', top:7, right:30}} />
											</div>
										</div>
										
										<div className="form-group">
											<label className="col-md-2 control-label">PDO</label>
											<div className="col-md-10">
												<div className="form-control" style={{paddingLeft:40}}>
													<span className="glyphicon glyphicon-tag form-control-feedback" style={{color:'#1986B4', left:20}}></span>
													<span className="label" style={{backgroundColor: '#ededed', color: '#556', fontWeight: 'normal'}}>信息标签信息标签<a href="javascript:void(0)" tabIndex="-1" style={{textDecoration: 'none'}}>&nbsp;×</a></span>
												</div>
											</div>
										</div>
										
									</form>
								</div>
									
								<div className="add-body">
									<div className="add-body-block">
										<form className="form-horizontal" role="form">

											<div className="form-group">
												<label className="col-md-2 control-label">起点</label>
												<div className="col-md-10">
													<span className="glyphicon glyphicon-edit form-control-feedback" style={{color:'#1986B4', left:20}}></span>
													<input type="text" className="form-control" placeholder="必填" style={{paddingLeft:40}}/>
												</div>
											</div>
											
											<div className="form-group">
												<label className="col-md-2 control-label">终点</label>
												<div className="col-md-10">
													<span className="glyphicon glyphicon-edit form-control-feedback" style={{color:'#1986B4', left:20}}></span>
													<input type="text" className="form-control" placeholder="必填" style={{paddingLeft:40}}/>
												</div>
											</div>
											
											<div className="form-group">
												<label className="col-md-2 control-label">金额</label>
												<div className="col-md-10">
													<span className="glyphicon glyphicon-edit form-control-feedback" style={{color:'#1986B4', left:20}}></span>
													<input type="text" className="form-control" placeholder="必填" style={{paddingLeft:40}}/>
												</div>
											</div>
											
										</form>	
									</div>
									
									<div className="add-body-block">
										<form className="form-horizontal" role="form">
										
											<div className="form-group">
												<label className="col-md-2 control-label">日期</label>
												<div className="col-md-10 clockpicker">
													<div className="row clearfix">
														<div className="col-md-6 column">
															<span className="glyphicon glyphicon-calendar form-control-feedback" style={{color:'#1986B4', left:20}}></span>
															<input ref="dateTest" type="text" className="form-control" placeholder="选择日期" style={{paddingLeft:40}}/>
														</div>
														<div className="col-md-6 column">
															<div className="row clearfix">
																<label className="col-md-4 control-label">时间</label>
																<div className="col-md-8">
																	<span className="glyphicon glyphicon-time form-control-feedback" style={{color:'#1986B4', left:20}}></span>
																	<input ref="clockTest" type="text" className="form-control" placeholder="选择时间" style={{paddingLeft:40}}/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

										</form>	
									</div>
									
									<div className="add-body-block">
										<form className="form-horizontal" role="form">
										
											<div className="form-group">
												<label className="col-md-2 control-label">关联</label>
												<div className="col-md-10">
													<div className="form-control" style={{paddingLeft:40}}>
														<span className="glyphicon glyphicon-paperclip form-control-feedback" style={{color:'#1986B4', left:20}}></span>
														<span className="label" style={{backgroundColor: '#ededed', color: '#556', fontWeight: 'normal'}}>信息标签信息标签<a href="javascript:void(0)" tabIndex="-1" style={{textDecoration: 'none'}}>&nbsp;×</a></span>
													</div>
												</div>
											</div>
											
											<div className="form-group">
												<label className="col-md-2 control-label"></label>
												<div className="col-md-10">
													<div className="form-control" style={{paddingLeft:40}}>
														<span className="glyphicon glyphicon-paperclip form-control-feedback" style={{color:'#1986B4', left:20}}></span>
														<span className="label" style={{backgroundColor: '#ededed', color: '#556', fontWeight: 'normal'}}>信息标签信息标签<a href="javascript:void(0)" tabIndex="-1" style={{textDecoration: 'none'}}>&nbsp;×</a></span>
													</div>
												</div>
											</div>
											
											<div className="form-group">
												<label className="col-md-2 control-label"></label>
												<div className="col-md-10" id="data-dropdown-menu" ref="topStopMenu">
													<span className="glyphicon glyphicon-search form-control-feedback" style={{color:'#1986B4',left:20}}></span>
													<input ref="dataSearch" autoComplete="off" type="text" className="form-control" style={{paddingLeft:40, paddingRight:40}} placeholder="请输入关键字，以空格分开" />
													<img className="form-control-feedback" src={require('../../imgs/spinner.gif')} style={{display: 'normal',width: '20px', height: '20px', top:7, right:30}} />
												</div>
											</div>

										</form>
									</div>
									
									
									
								</div>
									
								<div className="add-footer">
									<button type="button" className="btn btn-default">重置</button>
									<button type="button" className="btn btn-primary">提交</button>
								</div>
								
							</div>
						</div>
					</div>
				</div>
		);
	}
});

module.exports = AddContent;