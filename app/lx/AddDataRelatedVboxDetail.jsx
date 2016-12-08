var AddDataRelatedVboxDetail = React.createClass( {
    propTypes: {
		AddDataRelatedVboxDetailHandle: React.PropTypes.func.isRequired,
		detailData: React.PropTypes.object.isRequired,
		isHide: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        return {

        };
    },
    componentDidMount: function() {
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
	backClickHandle: function() {
		this.props.AddDataRelatedVboxDetailHandle('toBack');
    },
    render: function() {
		
		var head = [];
		if (typeof(this.props.detailData.values)!='undefined' && this.props.detailData.values.length > 0) {
			head.push(
				<tr key={0}>
				  <th style={{fontWeight:'normal'}}>{this.props.detailData.pdoObj.fields[0]}</th>
				  <th style={{fontWeight:'normal'}}>{this.props.detailData.values[0]}</th>                    
				</tr>
			);
		}
		
		var items = [];
		if (typeof(this.props.detailData.values)!='undefined' && this.props.detailData.values.length > 1) {
			for (var i=1; i<this.props.detailData.values.length; i++) {
				items.push(
						<tr key={i}>
						  <td>{this.props.detailData.pdoObj.fields[i]}</td>
						  <td>{this.props.detailData.values[i]}</td>                    
						</tr>
				);
			}
		}
		
		return (
				<div className={"vbox "+(this.props.isHide?'hide':'')}>

				  <div className="wrapper-sm b-b">
					<i className="fa fa-ellipsis-v fa-fw m-r-xs"></i>
					<a href="javascript:void(0)" style={{fontSize:'15px'}}>数据详情</a>
					<a href="javascript:void(0)" className="pull-right btn btn-xs btn-default" style={{marginBottom:'-3px',backgroundColor:'#f5f5f5'}} onClick={this.backClickHandle}><i className="fa fa-chevron-left fa-fw m-r-xs"></i>返回&nbsp;</a>
				  </div>
				 
				  <div className="wrapper animated flipInY">
					<div className="panel panel-default" style={{marginTop:'30px'}}>
						<div className="panel-heading font-bold"><span>{typeof(this.props.detailData.pdoObj)=='undefined'?'':this.props.detailData.pdoObj.name}</span></div>
						<table className={"table table-striped m-b-none "+(head.length==0?'hide':'')}>
						  <thead>
							{head}
						  </thead>
						  <tbody>
							{items}
							<tr>                    
							  <td>时间</td>
							  <td>{typeof(this.props.detailData.time)=='undefined'?'':(new Date(this.props.detailData.time).format("yyyy年MM月dd日 hh:mm"))}</td>
							</tr>
						  </tbody>
						</table>
					</div>
				  </div>

				</div>
		);
    }
});

module.exports = AddDataRelatedVboxDetail;
