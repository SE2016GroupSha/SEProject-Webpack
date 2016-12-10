var ViewDataView = React.createClass( {
	/**
	id规则：
		panel: panel-{deep}
		back:  panel-back-{deep}
		data:  panel-data-{deep}-{dataId}
		vbox:  panel-vbox-{deep}
		form:  panel-form-{deep}
	*/
    propTypes: {
		ViewDataViewHandle: React.PropTypes.func.isRequired,
		allDataIdMap: React.PropTypes.object.isRequired,
		allPDOIdMap: React.PropTypes.object.isRequired,
		selectedDataId: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
			stack: []
        };
    },
	componentWillReceiveProps: function(nextProps) {
		if (this.props.selectedDataId != nextProps.selectedDataId) {
			console.log("componentWillReceiveProps");
			//时机：组件selectedDataId参数变化
			//意义：重新初始化stack并push根组件
			if (nextProps.selectedDataId != 'blank') {
				var allDataIdMap = nextProps.allDataIdMap;
				var allPDOIdMap = nextProps.allPDOIdMap;
				var selectedDataId = nextProps.selectedDataId;
				var selectedDataPDOId = allDataIdMap[selectedDataId]['pdo'];
				
				
				//理由：如果两个panel结构完全一致，但事实不是一个panel，在切换时react貌似直接替换值，
				//      这样原来的状态清除的就不够干净，最明显的就是滚动条状态会保留，我们需要的是让
				//      react把原来的旧panel销毁
				var self = this;
				setTimeout(function() {
					self.clear();
				}, 1);
				setTimeout(function() {
					var panel = self.createPanel(0, selectedDataId, selectedDataPDOId, allDataIdMap, allPDOIdMap);
					self.initPush(panel);
				}, 2);
			}
		}
	},
	clear: function() {
		var newStack = [];
		this.setState({
			stack: newStack
		});
	},
	initPush: function(obj) {
		var newStack = [];
		newStack.push(obj);
		this.setState({
			stack: newStack
		});
	},
	push: function(obj) {
		var newStack = this.state.stack;
		newStack.push(obj);
		this.setState({
			stack: newStack
		});
	},
	pop: function() {
		var newStack = this.state.stack;
		if (newStack.length > 1) {
			newStack.pop();
			this.setState({
				stack: newStack
			});
		}
	},
	dataClickHandle: function(deep, dataId, event) {
		console.log('dataClickHandle')
		
		$("[id^='panel-data-"+deep+"-']").removeClass('my-background-color');
		$("#panel-data-"+deep+"-"+dataId).addClass('my-background-color');
		
		//下方元素重新添加hide，清除animated
		$("#panel-"+deep).addClass('hide');
		$("#panel-"+deep).removeClass('animated fadeIn');
		
		var allDataIdMap = this.props.allDataIdMap;
		var allPDOIdMap = this.props.allPDOIdMap;

		//新的栈顶元素默认hide，在update会清除hide并添加animated
		var panel = this.createPanel(deep+1, dataId, allDataIdMap[dataId]['pdo'], allDataIdMap, allPDOIdMap);
		this.push(panel);
	},
	backClickHandle: function(event) {
		console.log('backClickHandle')
		
		this.pop();
	},
	createPanel: function(deep, dataId, pdoId, allDataIdMap, allPDOIdMap) {
		var dataObj = allDataIdMap[dataId];
		var pdoObj = allPDOIdMap[pdoId];
		
		var pdoName = pdoObj['name'];
		var fields = [];
		for (var i=0; i<dataObj['values'].length; i++) {
			fields.push(
				<div key={i} className="form-group">
					<label><span>{pdoObj['fields'][i]}</span></label>
					<input type="text" className="form-control" readOnly="true" style={{backgroundColor: '#fff'}} value={dataObj['values'][i]} />
				</div>
			);
		}
		var date = new Date(dataObj['time']).format("yyyy年MM月dd日");
		var time = new Date(dataObj['time']).format("hh:mm");
		var related = [];
		for (var i=0; i<dataObj['related_data'].length; i++) {
			var relatedDataId = dataObj['related_data'][i];
			var relatedPDOId = allDataIdMap[relatedDataId]['pdo'];
			var relatedDataObj = allDataIdMap[relatedDataId];
			var relatedPDOObj = allPDOIdMap[relatedPDOId];
			var color = ['b-l-primary', 'b-l-success', 'b-l-info', 'b-l-warning'];
			var info = '';
			for (var j=0; j<relatedDataObj['values'].length; j++) {
				info += relatedPDOObj['fields'][j];
				info += ':';
				info += relatedDataObj['values'][j];
				info += '  ';
			}
			var relatedTime = '';
			var ms = (new Date()).getTime()-relatedDataObj['time'];
			var s = ms/1000.0;
			var min = s/60.0;
			var hour = min/60.0;
			var day = hour/24.0;
			var mon = day/30.0;
			var year = mon/12.0;
			if (year >= 1) {
				relatedTime = parseInt(year)+'年前';
			} else if (mon >= 1) {
				relatedTime = parseInt(mon)+'个月前';
			} else if (day >= 1) {
				relatedTime = parseInt(day)+'天前';
			} else if (hour >= 1) {
				relatedTime = parseInt(hour)+'小时前';
			} else if (min >= 1) {
				relatedTime = parseInt(min)+'分钟前';
			} else {
				relatedTime = '刚刚';
			}
			related.push(
				<a key={i} className={"list-group-item b-l-3x "+color[i%4]} id={"panel-data-"+deep+"-"+relatedDataId} onClick={this.dataClickHandle.bind(null, deep, relatedDataId)}>
					<span className="block text-ellipsis" style={{fontSize: '15px'}}>{relatedPDOObj['name']}</span>
					<span className="block text-sm text-muted my-mid" style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',whiteSpace:'pre'}}>{info}</span>
					<small className="text-muted">{relatedTime}</small>
				</a>
			);
		}
		
		var panel = (
				<div key={deep} className="panel panel-default hide" style={{marginTop: '30px',marginBottom: '80px'}} id={"panel-"+deep}>
					<div className="panel-heading font-bold">
						<span>{pdoName}</span>
						<a href="javascript:void(0)" className={"pull-right btn btn-xs btn-default "+(deep==0?'hide':'')} style={{marginBottom: '-3px',backgroundColor: '#f5f5f5'}} id={"panel-back-"+deep} onClick={this.backClickHandle} ><i className="fa fa-chevron-left fa-fw m-r-xs"></i>返回({deep})&nbsp;</a>
					</div>
					<div className="panel-body">
					
						<div className="col-sm-8 b-r" style={{paddingRight: '28px'}}>
						<form role="form" className="ng-pristine ng-valid" id={"panel-form-"+deep} >
							{fields}
							<div className="form-group pull-in clearfix">
								<div className="col-sm-6">
									<label><span>日期</span></label>
									<input type="text" className="form-control" readOnly="true" style={{backgroundColor: '#fff'}} value={date} />
								</div>
								<div className="col-sm-6">
									<label><span>时间</span></label>
									<input type="text" className="form-control" readOnly="true" style={{backgroundColor: '#fff'}} value={time} />
								</div>
							</div>
						</form>
						</div>
						
						<div className="col-sm-4">
						
							<form role="form" className="ng-pristine ng-valid" style={{marginLeft: '15px'}}>
								<div className="form-group">
								<label><span>关联数据</span></label>
								</div>
							</form>
					
							<div className="vbox" style={{marginTop: '-10px',minHeight: '0px'}} id={"panel-vbox-"+deep} >
								<div className="row-row">
									<div className="cell scrollable hover">
									<div className="cell-inner">
										<div className="padder">
										<div className="list-group">
											{related}
										</div>
										
										</div>
									</div>
									</div>
								</div>
								<div className={"text-center pos-abt w-full "+(related.length==0?'':'hide')} style={{top: '45%'}}><span>没有关联的数据</span></div>
							</div>
		
						</div>
					
					</div>
				</div>
		);
		
		return panel;
	},
	componentWillMount: function() {
		//Date的format添加
		dateFormatInject();
		function dateFormatInject() {
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
		}
		
		//时机：组件加载，未渲染
		//意义：初始化stack并push根组件
		if (this.props.selectedDataId != 'blank') {
			var allDataIdMap = this.props.allDataIdMap;
			var allPDOIdMap = this.props.allPDOIdMap;
			var selectedDataId = this.props.selectedDataId;
			var selectedDataPDOId = allDataIdMap[selectedDataId]['pdo'];
			
			var panel = this.createPanel(0, selectedDataId, selectedDataPDOId, allDataIdMap, allPDOIdMap);
			this.push(panel);
		}
    },
    componentDidMount: function() {
		//时机：组件第一次渲染完成，仅执行一次
		//意义：第一次渲染后视图调整，清除栈顶hide，back按钮，height高度，TODO上次选择的关联
		var deep = this.state.stack.length-1;
		$("#panel-"+deep).removeClass('hide');
		$("#panel-vbox-"+deep).height($("#panel-form-"+deep).height()-20);
    },
	componentDidUpdate: function(prevProps, prevState) {
		//时机：组件第n次渲染完成，每当stack有push或pop操作，新渲染完成后执行
		//意义：第n次渲染后视图调整，清除栈顶hide并添加动画，back按钮，height高度，TODO上次选择的关联
		var deep = this.state.stack.length-1;
		if (deep==0) {
			$("#panel-"+deep).removeClass('hide');
			$("#panel-vbox-"+deep).height($("#panel-form-"+deep).height()-20);
		} else {
			$("#panel-"+deep).removeClass('hide');
			$("#panel-"+deep).addClass('animated fadeIn');
			$("#panel-vbox-"+deep).height($("#panel-form-"+deep).height()-20);
		}
		
		
	},
    render: function() {

		return (
			  <div className="col lter">
				<div className="vbox">
				  <div className="wrapper-sm b-b">
					<i className="fa fa-eye fa-fw m-r-xs"></i>
					<a href="javascript:void(0)" style={{fontSize: '15px'}}>查看数据</a>
				  </div>
				  <div className="wrapper">
					  <div className="row">
						<div className="col-sm-10 col-sm-offset-1">
							{this.props.selectedDataId=='blank'?null:this.state.stack}
						</div>
					  </div>
				  </div>
				</div>
			  </div>
		);
    }
});

module.exports = ViewDataView;