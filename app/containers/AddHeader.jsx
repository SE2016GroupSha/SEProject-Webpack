require('../../css/lx/add.css');
var Handlebars = require('../../node_modules/handlebars/dist/handlebars.js');

var AddHeader = React.createClass({
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
			return param['name'];
		  },
		  limit: self.props.limit,
		  source: function(q, sync, async) {
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
		})
		.on('typeahead:asynccancel', function() {
			console.log('pdo asynccancel');
		})
		.on('typeahead:asyncreceive', function() {
			console.log('pdo asyncreceive');
		})
		.bind('typeahead:select', function(ev, suggestion) {
		  console.log('PDO Selection: ' + JSON.stringify(suggestion));
		  self.refs.pdoSearch.blur();
		});
		

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
	render: function () {
		return (
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
									<span className="label" style={{backgroundColor: '#ededed', color: '#556', fontWeight: 'normal'}}>信息标签信息标签<a href="javascript:void(0)" onClick={alert.bind(null, 'pdoSelectRemove')} onFocus={this.clearFocus.bind(null, 'pdoSelectRemove')} tabIndex="-1" style={{textDecoration: 'none'}} ref="pdoSelectRemove">&nbsp;×</a></span>
								</div>
							</div>
						</div>
										
					</form>
				</div>
		);
	}
});

module.exports = AddHeader;