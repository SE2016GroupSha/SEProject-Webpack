﻿require('../../css/lx/add.css');
var Handlebars = require('../../node_modules/handlebars/dist/handlebars.js');

var AddBodyRelatedData = React.createClass({
	propTypes: {
		limit: React.PropTypes.number.isRequired
	},
	getInitialState: function () {
		return {
				
		};
	},
	componentDidMount: function () {
		
		//保存当前作用域的this
		var self = this;

		//Handlebars注册新Helper
		Handlebars.registerHelper("hidden-data-search", function(n, options){
		   if(n > self.props.limit){ //在typeahead中做了修改
			 return options.fn(this);
		   }else{
			 return options.inverse(this);
		  }
		});

		//Handlebars注册新Helper
		Handlebars.registerHelper('remain-data-search', function (n, options) {
		  return n - self.props.limit;
		});
		
		//dataSearch的typeahead
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
		  limit: self.props.limit,
		  source: function(q, sync, async) {
			  
			var array = q.split(/\s+/);
			//array.push(q);
			array = array.filter(function(e){return e!="";});
			if (array.length==0) {
				array.push("");
			}
			var httpParams = {keys:array};
			
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
			footer: Handlebars.compile('<div class="search-footer">{{#hidden-data-search length}}<i>还有{{remain-data-search length}}条结果未显示</i>{{else}}<i>已显示全部结果</i>{{/hidden-data-search}}</div>'),
			empty: '<div class="empty-message" style="text-align: center;">没有符合条件的数据</div>',
			suggestion: Handlebars.compile('<div class="search-card u-cf"><div class="search-card-content"><div class="search-card-title">{{name}}</div><div class="search-card-details">{{#each values}}<strong>{{@key}}</strong>:&nbsp;{{this}}&nbsp;&nbsp;&nbsp;{{/each}}</div></div><div class="search-card-attachs"><div class="search-card-time"><span class="search-card-time-label">时间：</span> {{time}}</div></div></div>')
		    /* render template ...*/
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
		  self.refs.dataSearch.blur();
		});
		
		
		//dataSearch的typeahead的下拉菜单，滚动条到顶部不影响body
		function topStopScroll(e) {
			var box = $(this).get(0);
			if(box.scrollTop === 0){
				if(e.deltaY > 0) {
					e.preventDefault();
					return false;
				}
			}
		}
		$(this.refs.topStopMenu).find('.tt-menu').on('mousewheel', topStopScroll);
	},
	clearFocus: function(item) {
		switch (item) {
		case 'dataSelectRemove1' :
			this.refs.dataSelectRemove1.blur();
			break;
		case 'dataSelectRemove2' :
			this.refs.dataSelectRemove2.blur();
			break;
		default:
			break;
		}
	},
	render: function () {
		return (
				<div className="add-body-block">
					<form className="form-horizontal" role="form">
										
						<div className="form-group">
							<label className="col-md-2 control-label">关联</label>
							<div className="col-md-10">
								<div className="form-control" style={{paddingLeft:40}}>
									<span className="glyphicon glyphicon-paperclip form-control-feedback" style={{color:'#1986B4', left:20}}></span>
									<span className="label" style={{backgroundColor: '#ededed', color: '#556', fontWeight: 'normal'}}>信息标签信息标签<a href="javascript:void(0)" onClick={alert.bind(null, 'dataSelectRemove1')} onFocus={this.clearFocus.bind(null, 'dataSelectRemove1')} tabIndex="-1" style={{textDecoration: 'none'}} ref="dataSelectRemove1">&nbsp;×</a></span>
								</div>
							</div>
						</div>
											
						<div className="form-group">
							<label className="col-md-2 control-label"></label>
							<div className="col-md-10">
								<div className="form-control" style={{paddingLeft:40}}>
									<span className="glyphicon glyphicon-paperclip form-control-feedback" style={{color:'#1986B4', left:20}}></span>
									<span className="label" style={{backgroundColor: '#ededed', color: '#556', fontWeight: 'normal'}}>信息标签信息标签<a href="javascript:void(0)" onClick={alert.bind(null, 'dataSelectRemove2')} onFocus={this.clearFocus.bind(null, 'dataSelectRemove2')} tabIndex="-1" style={{textDecoration: 'none'}} ref="dataSelectRemove2">&nbsp;×</a></span>
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
		);
	}
});

module.exports = AddBodyRelatedData;