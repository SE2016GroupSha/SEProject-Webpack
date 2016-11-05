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

		
		$(this.refs.pdoSearch).typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 1
		},
		{
		  name: 'pdoSearch',
		  displayKey: 'name',
		  source: function(q, sync, async) {
			sync([
			{"name":"上学","fields":["始点","终点","耗时"],"time":"2016/11/30 15:40"},
			{"name":"出行","fields":["始点","终点","耗时"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"},
			{"name":"吃饭","fields":["地点","人数","有点长长长长长长长长"],"time":"2014/03/24 00:40"}
			]);
		  },
		  templates: {
			header: '<div class="search-card">全部搜索结果</div>',
			empty: '<div class="empty-message" style="text-align: center;">没有符合条件的数据</div>',
			suggestion: Handlebars.compile('<div class="search-card u-cf"><div class="search-card-content"><div class="search-card-title">{{name}}</div><div class="search-card-details">{{#each fields}}<span class="label label-info">{{this}}</span>&nbsp;&nbsp;&nbsp;{{/each}}</div></div><div class="search-card-attachs"><div class="search-card-time"><span class="search-card-time-label">时间：</span> {{time}}</div></div></div>')
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
		});
		$(this.refs.pdoSearch).bind('typeahead:select', function(ev, suggestion) {
		  console.log('PDO Selection: ' + suggestion);
		});
		
		
		$(this.refs.dataSearch).typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 1
		},
		{
		  name: 'dataSearch',
		  displayKey: 'name',
		  source: function(q, sync, async) {
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
		  },
		  templates: {
			header: '<div class="search-card">全部搜索结果</div>',
			empty: '<div class="empty-message" style="text-align: center;">没有符合条件的数据</div>',
			suggestion: Handlebars.compile('<div class="search-card u-cf"><div class="search-card-content"><div class="search-card-title">{{name}}</div><div class="search-card-details">{{#each values}}<span class="label label-success">{{@key}}</span>&nbsp;{{this}}&nbsp;&nbsp;&nbsp;{{/each}}</div></div><div class="search-card-attachs"><div class="search-card-time"><span class="search-card-time-label">时间：</span> {{time}}</div></div></div>')
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
		});
		$(this.refs.dataSearch).bind('typeahead:select', function(ev, suggestion) {
		  console.log('Data Selection: ' + suggestion);
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
												<input ref="pdoSearch" autoComplete="off" type="text" className="form-control" style={{paddingLeft:40, paddingRight:40}} placeholder="请输入关键字" />
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
													<input ref="dataSearch" autoComplete="off" type="text" className="form-control" style={{paddingLeft:40, paddingRight:40}} placeholder="请输入关键字" />
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