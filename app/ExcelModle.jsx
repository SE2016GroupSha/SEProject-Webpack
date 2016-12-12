var ExcelUtils = require('./ExcelUtils.jsx');

var ExcelModle = React.createClass( {
 propTypes: {
		mystate: React.PropTypes.string.isRequired,
		pdos: React.PropTypes.array.isRequired,
		datas: React.PropTypes.array.isRequired,
		msg: React.PropTypes.array.isRequired,
		handleContinue:React.PropTypes.func.isRequired,
		state_pdo_or_data: React.PropTypes.string.isRequired,
 },
	
 render: function() {
	var view=[];
	var button_array=[];
	var title ='';
	var colorname ='';
	var viewdata=[];
	//error rgba(240, 80, 80, 0.83)
	//success rgba(39, 194, 76, 0.78)
	//warning rgba(250, 215, 51, 0.83)
	
	if(this.props.mystate == 'error' ){
		if(this.props.state_pdo_or_data=='pdo'){
			title='导入模板失败：';
		}else{
			title='导入数据失败：';
		}
		
		colorname='rgba(240, 80, 80, 0.83)';
		for(var i=0;i<this.props.msg.length;i++){
			var regx=/格式警告/;
			var spanclassname='pull-right label nline';
			var spanshow='';
			if(regx.exec(this.props.msg[i])== null){
				spanclassname+=' bg-danger';	
				spanshow='danger';
			}else{
				spanclassname+=' bg-warning';
				spanshow='warning';
			}
			
			view.push(
						<li className="list-group-item" key={i}>
							<a href="" className="thumb-sm m-r">
							</a>
							<span className={spanclassname}>{spanshow}</span>
							{this.props.msg[i]}
						</li>
			);
		}
		
	}else if(this.props.mystate == 'warning'){
		title='导入警告：';
		colorname='rgba(250, 215, 51, 0.83)';
		for(var i=0;i<this.props.msg.length;i++){
			view.push(
						<li className="list-group-item" key={i}>
							<a href="" className="thumb-sm m-r">
							</a>
							<span className="pull-right label bg-warning nline">warning</span>
							{this.props.msg[i]}
						</li>
			);
		}
		button_array.push(
						<div key={0} className="panel-footer text-right">
							<button  className="btn btn-danger btn-addon btn-sm" onClick={this.props.handleContinue.bind(null,'continue')}>继续</button>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<button  className="btn btn-info btn-addon btn-sm" onClick={this.props.handleContinue.bind(null,'break')}>放弃</button>
						</div>
						
		);
		
		
	}else if(this.props.mystate == 'success' && this.props.state_pdo_or_data=='pdo'){
		title='添加成功——新增如下模板：';
		colorname='rgba(39, 194, 76, 0.78)';
		for(var i=0;i<this.props.pdos.length;i++){
			view.push(
						<li className="list-group-item" key={i}>
							<a href="" className="thumb-sm m-r">
							</a>
							<span className="pull-right label bg-success nline">success</span>
							{this.props.pdos[i].name}
						</li>
			);
		}
	}else{
		title='添加成功——新增如下模板：';
		colorname='rgba(39, 194, 76, 0.78)';
		for(var i=0;i<this.props.pdos.length;i++){
			view.push(
						<li className="list-group-item" key={i}>
							<a href="" className="thumb-sm m-r">
							</a>
							<span className="pull-right label bg-success nline">success</span>
							{this.props.pdos[i].name}
						</li>
			);
		}
		var liitems=[];
		for(var i=0;i<this.props.datas.length;i++){
			liitems.push(
						<li className="list-group-item" key={i}>
							<a href="" className="thumb-sm m-r">
							</a>
							<span className="pull-right label bg-success nline">success</span>
							{this.props.datas[i].values[0]}，······
						</li>
			);
		}
		viewdata.push(
					
					<div className="panel no-border" key={0}>
						<div className="panel-heading wrapper b-b b-light">
						  <span className="text-xs text-muted pull-right">
							<i className="fa fa-circle text-danger m-r-xs"></i>
							<i className="fa fa-circle text-warning m-r-xs m-l-sm"></i>
							<i className="fa fa-circle text-success m-r-xs m-l-sm"></i>
						  </span>
						  <h4 className="font-thin m-t-none m-b-none " style={{'color':colorname,'fontWeight':'bolder'}}>添加成功——新增如下数据：</h4>              
						</div>
						<ul className="list-group list-group-lg m-b-none">
						{liitems}
						</ul>
					</div>
		);
		
	}


		return (
			 <div className="cell-inner">
				{/*右侧内容*/}
				<div className="wrapper b-t m-t-xxs">
				{/*留白*/}
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-9">
					<div className="panel no-border">
						<div className="panel-heading wrapper b-b b-light">
						  <span className="text-xs text-muted pull-right">
							<i className="fa fa-circle text-danger m-r-xs"></i>
							<i className="fa fa-circle text-warning m-r-xs m-l-sm"></i>
							<i className="fa fa-circle text-success m-r-xs m-l-sm"></i>
						  </span>
						  <h4 className="font-thin m-t-none m-b-none " style={{'color':colorname,'fontWeight':'bolder'}}>{title}</h4>              
						</div>
						<ul className="list-group list-group-lg m-b-none">
						{view}
						</ul>
					{button_array}
					</div>
					{viewdata}
					
					
					
				</div>
					<div className="col-sm-2"></div>
				
				{/*右侧内容结束*/}
			</div>
		);
 }
});

module.exports = ExcelModle;