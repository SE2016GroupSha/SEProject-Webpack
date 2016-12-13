var AddDataRelatedVboxAdd = React.createClass( {
    propTypes: {
		AddDataRelatedVboxAddHandle: React.PropTypes.func.isRequired,
		searchKey: React.PropTypes.string.isRequired,
		searchClearSignal: React.PropTypes.number.isRequired,
		currentPDO: React.PropTypes.object.isRequired,
		relatedData: React.PropTypes.array.isRequired,
		isHide: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        return {
			searchData: []
        };
    },
	componentWillReceiveProps: function(nextProps) {
		console.log("1");
		console.log(nextProps.currentPDO);
		if (this.props.searchClearSignal != nextProps.searchClearSignal) {
			console.log("2");
			console.log(nextProps.currentPDO);
			//手动投递一个空字符串key
			var event = {};
			event['target'] = {};
			event['target']['value'] = '';
			this.inputChangeHandle(nextProps.currentPDO, event);
		}
	},
    componentDidMount: function() {

    },
	viewClickHandle: function(index, event) {
		console.log('Add: viewClickHandle');
		this.props.AddDataRelatedVboxAddHandle('toView');
	},
	itemDetailClickHandle: function(index, data, event) {
		console.log('Add: itemDetailClickHandle');
		this.props.AddDataRelatedVboxAddHandle('toDetail', data);
	},
	itemAddClickHandle: function(index, data, event) {
		function stopPropagation(e) {  
			e = e || window.event;  
			if(e.stopPropagation) { //W3C阻止冒泡方法  
				e.stopPropagation();  
			} else {  
				e.cancelBubble = true; //IE阻止冒泡方法  
			}  
		}
		
		stopPropagation(event);
		
		this.props.AddDataRelatedVboxAddHandle('itemAdd', data);
				
		console.log('Add: itemAddClickHandle');
	},
	inputChangeHandle: function(pdo, event) {
		var self = this;
		
		var newKey = event.target.value;
		this.props.AddDataRelatedVboxAddHandle('keyChange', newKey);
		
		if (newKey=='') {
			//推荐
			
			//构造参数
			var id = pdo==null?self.props.currentPDO.id:pdo.id;
			var httpParams = {pdo:id};
			
			$.ajax({
				async: true,//异步
				type:"POST",
				cache: false,
				url: "api/data/redata",
				//data: {'params':id},
				data: {'params':JSON.stringify(httpParams)},
				dataType: "json",
				success: function(data) {
					//开始生成数据
					regSuccess(data['datas'], data['pdos']);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					self.setState({
						searchData: []
					});
				}
			});
		} else {
			//搜索
			
			//空格分割关键字，生成http参数
			var array = newKey.split(/\s+/);
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
					//开始生成数据
					regSuccess(data['datas'], data['pdos']);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					self.setState({
						searchData: []
					});
				}
			});
		}
		
		//生成数据
		function regSuccess(datas, pdos) {
			//建立pdo的id索引
			var pdosIndex = {};
			for (var i=0; i<pdos.length; i++) {
				var id = pdos[i]['id'];
				pdosIndex[id] = pdos[i];
			}
			
			//data添加新字段，pdoObj
			for (var i=0; i<datas.length; i++) {
				datas[i]['pdoObj'] = pdosIndex[datas[i]['pdo']];
			}
			
			//更新状态
			self.setState({
				searchData: datas
			});
		}
		
		console.log(newKey);
	},
    render: function() {
		
		//搜索和已添加的基本关系：
		//1.存储的搜索是完整的，渲染时过滤掉已添加的
		//2.relatedData的添加或删除，都会使搜索重新渲染，但搜索本身不变
		//3.添加过的永远不会显示，显示的都是未添加的
		
		//建立relatedData索引
		var relatedIndex = {};
		for (var i=0; i<this.props.relatedData.length; i++) {
			var id = this.props.relatedData[i]['id'];
			relatedIndex[id] = this.props.relatedData[i];
		}
		
		//建立items
		var items = [];
		var datas = this.state.searchData;
		var color = ['b-l-primary', 'b-l-success', 'b-l-info', 'b-l-warning'];
		for (var i=0; i<datas.length; i++) {
			var id = datas[i]['id'];
			if (typeof(relatedIndex[id])!='undefined') {
				continue;
			}
			var info = '';
			for (var j=0; j<datas[i]['values'].length; j++) {
				info += datas[i]['pdoObj']['fields'][j];
				info += ':';
				info += datas[i]['values'][j];
				info += '  ';
			}
			var time;
			var ms = (new Date()).getTime()-datas[i]['time'];
			var isFuture = (ms < 0);
			if (isFuture) {
				ms = -1.0 * ms;
			}
			var s = ms/1000.0;
			var min = s/60.0;
			var hour = min/60.0;
			var day = hour/24.0;
			var mon = day/30.0;
			var year = mon/12.0;
			if (year >= 1) {
				time = parseInt(year)+'年'+(isFuture?'后':'前');
			} else if (mon >= 1) {
				time = parseInt(mon)+'个月'+(isFuture?'后':'前');
			} else if (day >= 1) {
				time = parseInt(day)+'天'+(isFuture?'后':'前');
			} else if (hour >= 1) {
				time = parseInt(hour)+'小时'+(isFuture?'后':'前');
			} else if (min >= 1) {
				time = parseInt(min)+'分钟'+(isFuture?'后':'前');
			} else {
				time = isFuture?'即将':'刚刚';
			}
			items.push(
				<a key={i} className={"list-group-item b-l-3x "+color[i%4]} onClick={this.itemDetailClickHandle.bind(null, i, datas[i])}>
				  <span className="block text-ellipsis" style={{fontSize:'15px'}}>{datas[i]['pdoObj']['name']}</span>
				  <span className="pull-right text-muted my-mid " onClick={this.itemAddClickHandle.bind(null, i, datas[i])}>
					<i className="fa fa-plus my-hover" style={{fontSize:'20px'}}></i>
				  </span>
				  <span className="block text-sm text-muted my-mid" style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',whiteSpace:'pre'}}>{info}</span>
				  <small className="text-muted">{time}</small>
				</a>
			);
		}
		
		return (
				<div className={"vbox "+(this.props.isHide?'hide':'')}>

				  <div className="wrapper-sm b-b">
					<i className="fa fa-plus fa-fw m-r-xs"></i>
					<a href="javascript:void(0)" style={{fontSize:'15px'}}>添加关联</a>
					<a href="javascript:void(0)" className="pull-right btn btn-xs btn-default" style={{marginBottom:'-3px',backgroundColor:'#f5f5f5'/*,fontSize:'14px'*/}} onClick={this.viewClickHandle}>&nbsp;&nbsp;已关联数据&nbsp;<i className="fa fa-chevron-right fa-fw m-r-xs"></i></a>
				  </div>
				 
				  <div className="wrapper b-t m-t-xxs" style={{marginTop:'0px',borderTopWidth:'0px'}}>
					<div className="input-group" style={{marginTop:'10px'}}>
					  <span className="input-group-addon input-sm"><i className="fa fa-search"></i></span>
					  <input type="text" className="form-control input-sm" placeholder="搜索数据，多关键字以空格分开" value={this.props.searchKey} onChange={this.inputChangeHandle.bind(null, null)}></input>
					</div>
				  </div>
				  
				  <div className="row-row">
					<div className="cell scrollable hover">
					  <div className="cell-inner">
						<div className={"padder "+(this.props.searchKey==''?'':'hide')}>
							<span className="block text-sm text-muted" style={{marginTop:'5px'}}><em>以下为系统推荐的关联数据</em></span>
						<br/>
						</div>
						<div className="padder" style={{marginBottom:'80px'}}>
						  <div className="list-group">
							{items}
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				  <div className={"text-center pos-abt w-full "+(items.length==0?'':'hide')} style={{top:'50%'}}><span>没有符合的数据</span></div>
				</div>
		);
    }
});

module.exports = AddDataRelatedVboxAdd;
