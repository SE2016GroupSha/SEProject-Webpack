require('../../css/lx/add.css');

var AddHeader = require('./AddHeader');
var AddBodyFields = require('./AddBodyFields');
var AddBodyDateTime = require('./AddBodyDateTime');
var AddBodyRelatedData = require('./AddBodyRelatedData');
var AddFooter = require('./AddFooter');

var AddContent = React.createClass({
	propTypes: {
		
	},
	getInitialState: function () {
		return {
				
		};
	},
	componentDidMount: function () {
		
		//Date的format添加
		this.dateFormatInject();

	},
	dateFormatInject: function () {
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
	},
	render: function () {
		return (
				<div className="row clearfix">
					<div className="col-md-12 column">
						<div className="row clearfix">
							<div className="col-md-8 col-md-offset-2 column">
							
								<AddHeader limit={2}/>
									
								<div className="add-body">
									<AddBodyFields />
									<AddBodyDateTime />
									<AddBodyRelatedData limit={4}/>
								</div>
									
								<AddFooter />
								
							</div>
						</div>
					</div>
				</div>
		);
	}
});

module.exports = AddContent;