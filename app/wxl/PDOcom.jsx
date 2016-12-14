var PDOcom = React.createClass( {
    propTypes: {
        pdos: React.PropTypes.array.isRequired,
		index: React.PropTypes.number.isRequired,
		downloadHandle: React.PropTypes.func.isRequired,
    },
    componentWillMount: function() {
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
    render: function() {
		
		var colorname='panel-heading text-center no-border ';// bg-info
		var i = this.props.index;	
		var colortext='icon-pin m-r-xs ';//text-info 
		var colordownload='btn font-bold m ';// 
		if(i%6 == 0){
			colorname+='bg-primary';
			colortext+='text-primary';
			colordownload+='btn-primary';
		}else if(i%6 == 1){
			colorname+='bg-info';
			colortext+='text-info';
			colordownload+='btn-info';
		}else if(i%6 == 2){
			colorname+='bg-success';
			colortext+='text-success';
			colordownload+='btn-success';
		}else if(i%6 == 3){
			colorname+='bg-warning';
			colortext+='text-warning';
			colordownload+='btn-warning';
		}else if(i%6 == 4){
			colorname+='bg-danger';
			colortext+='text-danger';
			colordownload+='btn-danger';
		}else{
			colorname+='bg-dark';
			colortext+='text-dark';
			colordownload+='btn-dark';
		}
		
		var datetime = new Date(this.props.pdos[this.props.index].time);
        // var year = datetime.getFullYear();
        // var month = datetime.getMonth()+1;
        // var day = datetime.getDate();
        // var hour = datetime.getHours();
        // var min = datetime.getMinutes();
        // var second = datetime.getSeconds();
		
		var fieldsarray=[];
		for(var j=0;j<this.props.pdos[this.props.index].fields.length;j++){
			fieldsarray.push(
							<li key={j} className="list-group-item">
								&nbsp;<i className={colortext}>&nbsp;</i>  {this.props.pdos[this.props.index].fields[j]}
							</li>
			);
		}
		
		
        return (
             <div className="panel b-a">
				<div className={colorname}>
				  <h4 className="text-u-c m-b-none">{this.props.pdos[this.props.index].name}</h4>
				  <h2 className="m-t-none">
					<span className="text-xs">{datetime.format("yyyy/")}</span>
					<span className="new1 text-lt">{datetime.format("MM/dd")}</span>
						&nbsp;
					<span className="text-xs"> {datetime.format("hh:mm")} </span>
				  </h2>
				</div>
				<ul className="list-group">
				{fieldsarray}
				</ul>
				<div className="panel-footer text-center">
				  <a  className={colordownload} onClick={this.props.downloadHandle.bind(null, this.props.index)}>下载模板</a>
				</div>
			  </div>
        );
    }
});

module.exports = PDOcom;