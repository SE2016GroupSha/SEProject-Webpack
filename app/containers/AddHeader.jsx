require('../../css/lx/add.css');
var Handlebars = require('../../node_modules/handlebars/dist/handlebars.js');

var AddHeader = React.createClass({
	propTypes: {
		limit: React.PropTypes.number.isRequired,
		pdoChangeHandle: React.PropTypes.func.isRequired,
		isPDOInputView: React.PropTypes.bool.isRequired,
		selectPDO: React.PropTypes.object.isRequired,
		allpdos: React.PropTypes.array.isRequired,
		subStrMap: React.PropTypes.object.isRequired
	},
	componentDidMount: function () {
		
		//保存当前作用域的this
		var self = this;
		
		//Handlebars注册新Helper
		Handlebars.registerHelper("hidden-pdo-search", function(n, options){
		   if(n > self.props.limit){ //在typeahead中做了修改
			 return options.fn(this);
		   }else{
			 return options.inverse(this);
		  }
		});

		//Handlebars注册新Helper
		Handlebars.registerHelper('remain-pdo-search', function (n, options) {
		  return n - self.props.limit;
		});
		
		//pdoSearch的typeahead
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
			//return param['name'];
			return '';
		  },
		  limit: self.props.limit,
		  source: function(q, sync, async) {
			//0s异步执行
			setTimeout(function () {
				
				//获取pdos以及索引
				var pdos = self.props.allpdos;
				var subMap = self.props.subStrMap;
				
				//空格分割关键字
				var keyArray = q.split(/\s+/);
				keyArray = keyArray.filter(function(e){return e!="";});
				if (keyArray.length==0) {
					keyArray.push("");
				}
				
				//若不存在的关键字，直接空
				var flag = true;
				keyArray.forEach(
					function (key) {
						if (typeof(subMap[key])=='undefined') {
							flag = false;
						}
					}
				);
				if (flag == false) {
					async([]);
					return;
				}
				
				//计算交集
				var indexSet = new Set();
				var baseKey = keyArray[0];
				subMap[baseKey].forEach(
					function (index) {
						var indexFlag = true;
						for (var i=0; i<keyArray.length; i++) {
							if (!subMap[keyArray[i]].has(index)) {
								indexFlag = false;
								break;
							}
						}
						if (indexFlag) {
							indexSet.add(index);
						}
					}
				);
				
				//生成过滤的pdos结果
				var filterPdos = [];
				indexSet.forEach(
					function (index) {
						filterPdos.push(pdos[index]);
					}
				);
				
				//异步返回
				async(filterPdos);
				return;
				
			}, 0);
		  },
		  templates: {
			header: '<div class="search-header"><i>符合条件的结果</i></div>',
			footer: Handlebars.compile('<div class="search-footer">{{#hidden-pdo-search length}}<i>还有{{remain-pdo-search length}}条结果未显示</i>{{else}}<i>已显示全部结果</i>{{/hidden-pdo-search}}</div>'),
			empty: '<div class="empty-message" style="text-align: center;">没有符合条件的数据</div>',
			suggestion: Handlebars.compile('<div class="search-card u-cf"><div class="search-card-content"><div class="search-card-title">{{name}}</div><div class="search-card-details">{{#each fields}}<strong>{{this}}</strong>&nbsp;&nbsp;&nbsp;{{/each}}</div></div><div class="search-card-attachs"><div class="search-card-time"><span class="search-card-time-label">时间：</span> {{time}}</div></div></div>')
			/* render template ...*/
		  }
		})
		.on('typeahead:asyncrequest', function() {
			console.log('pdo asyncrequest');
			$(self.refs.spinner).css('display', 'inline');
		})
		.on('typeahead:asynccancel', function() {
			console.log('pdo asynccancel');
			$(self.refs.spinner).css('display', 'none');
		})
		.on('typeahead:asyncreceive', function() {
			console.log('pdo asyncreceive');
			$(self.refs.spinner).css('display', 'none');
		})
		.bind('typeahead:select', self.selectCallback);
		

		//pdoSearch的typeahead的下拉菜单，滚动条到底部不影响body
		function bottomStopScroll(e) {
			var box = $(this).get(0);
			if (box.scrollTop + $(box).height() + 
				Number($(box).css('padding-top').replace('px', '')) + 
				Number($(box).css('padding-bottom').replace('px', '')) >= box.scrollHeight) {
				if(e.deltaY < 0) {
					e.preventDefault();
					return false;
				}
			}
		}
		$(this.refs.bottomStopMenu).find('.tt-menu').on('mousewheel', bottomStopScroll);
	},
	clearFocus: function(item) {
		switch (item) {
		case 'pdoSelectRemove' :
			this.refs.pdoSelectRemove.blur();
			break;
		default:
			break;
		}
	},
	selectCallback: function(ev, suggestion) {
		console.log('PDO Selection: ' + JSON.stringify(suggestion));
		this.refs.pdoSearch.blur();
		this.props.pdoChangeHandle('selectPDO', suggestion);
	},
	removeCallback: function() {
		this.props.pdoChangeHandle('removePDO');
	},
	render: function () {
		return (
				<div className="add-header">
					<form className="form-horizontal" role="form">

						{/*没办法，只能先这么凑合一下，typeahead那库把input的父元素改了，脱离了React的正常DOM管理*/}
						<div className="form-group" hidden={this.props.isPDOInputView?"":"hidden"}>
							<label className="col-md-2 control-label">模板</label>
							<div className="col-md-10" id="pdo-dropdown-menu" ref="bottomStopMenu">
								<span className="glyphicon glyphicon-search form-control-feedback" style={{color:'#1986B4',left:20}}></span>
								<input ref="pdoSearch" autoComplete="off" type="text" className="form-control" style={{paddingLeft:40, paddingRight:40}} placeholder="请输入关键字，以空格分开" />
								<img ref="spinner" className="form-control-feedback" src={require('../../imgs/spinner.gif')} style={{display: 'normal',width: '20px', height: '20px', top:7, right:30, display:'none'}} />
							</div>
						</div>

						<div className="form-group" hidden={this.props.isPDOInputView?"hidden":""}>
							<label className="col-md-2 control-label">模板</label>
							<div className="col-md-10">
								<div className="form-control" style={{paddingLeft:40}}>
									<span className="glyphicon glyphicon-tag form-control-feedback" style={{color:'#1986B4', left:20}}></span>
									<span className="label" style={{backgroundColor: '#ededed', color: '#556', fontWeight: 'normal'}}>{this.props.selectPDO['name']}<a href="javascript:void(0)" onClick={this.removeCallback} onFocus={this.clearFocus.bind(null, 'pdoSelectRemove')} tabIndex="-1" style={{textDecoration: 'none'}} ref="pdoSelectRemove">&nbsp;×</a></span>
								</div>
							</div>
						</div>
		
					</form>
				</div>
		);
	}
});

module.exports = AddHeader;