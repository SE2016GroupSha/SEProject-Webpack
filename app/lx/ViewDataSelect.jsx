var ViewDataSelect = React.createClass( {
    propTypes: {
		ViewDataSelectHandle: React.PropTypes.func.isRequired,
		initFlag: React.PropTypes.number.isRequired,
		allDataIdMap: React.PropTypes.object.isRequired,
		allPDOIdMap: React.PropTypes.object.isRequired,
		selectedDataId: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
			renderDataIds: []
        };
    },
	componentWillReceiveProps: function(nextProps) {
		//变化的是allDataIdMap或allPDOIdMap
		if (this.props.initFlag != nextProps.initFlag) {
			var dataIds = [];
			for (var id in nextProps.allDataIdMap) {
				dataIds.push(id);
			}
			this.setState({
				renderDataIds: dataIds
			});
		}
	},
	itemClickHandle: function(dataId, event) {
		for (var i=0; i<this.state.renderDataIds.length; i++) {
			var key = "view-item-" + this.state.renderDataIds[i];
			$(this.refs[key]).removeClass('my-background-color');
		}
		$(this.refs["view-item-"+dataId]).addClass('my-background-color');
		this.props.ViewDataSelectHandle('select', dataId);
	},
	inputChangeHandle: function(event) {
		
		//清除选择
		for (var i=0; i<this.state.renderDataIds.length; i++) {
			var key = "view-item-" + this.state.renderDataIds[i];
			$(this.refs[key]).removeClass('my-background-color');
		}
		
		var self = this;
		var keyString = event.target.value;
		
		if (keyString=='') {
			//空字符串直接用allDataIdMap生成
			var dataIds = [];
			for (var id in this.props.allDataIdMap) {
				dataIds.push(id);
			}
			this.setState({
				renderDataIds: dataIds
			});
		} else {
			//空格分割关键字，生成http参数
			var array = keyString.split(/\s+/);
			array = array.filter(function(e){return e!="";});
			if (array.length==0) {
				array.push("");
			}
			var httpParams = {keys:array};
			
			//异步获取数据
			$.ajax({
				async: true,//异步
				type:"POST",
				cache: false,
				url: "api/search/fuzzy",
				data: {'params':JSON.stringify(httpParams)},
				dataType: "json",
				success: function(data) {
					var dataIds = [];
					var datas = data['datas'];
					for (var i=0; i<datas.length; i++) {
						dataIds.push(datas[i]['id']);
					}
					self.setState({
						renderDataIds: dataIds
					});
				},
				error: function (jqXHR, textStatus, errorThrown) {
					self.setState({
						renderDataIds: []
					});
				}
			});
		}
	},
    render: function() {
		var items = [];
		for (var i=0; i<this.state.renderDataIds.length; i++) {
			var dataId = this.state.renderDataIds[i];
			var pdoId = this.props.allDataIdMap[dataId]['pdo'];
			var dataObj = this.props.allDataIdMap[dataId];
			var pdoObj = this.props.allPDOIdMap[pdoId];
			var color = ['b-l-primary', 'b-l-success', 'b-l-info', 'b-l-warning'];
			var info = '';
			for (var j=0; j<dataObj['values'].length; j++) {
				info += pdoObj['fields'][j];
				info += ':';
				info += dataObj['values'][j];
				info += '  ';
			}
			var time = '';
			var ms = (new Date()).getTime()-dataObj['time'];
			var s = ms/1000.0;
			var min = s/60.0;
			var hour = min/60.0;
			var day = hour/24.0;
			var mon = day/30.0;
			var year = mon/12.0;
			if (year >= 1) {
				time = parseInt(year)+'年前';
			} else if (mon >= 1) {
				time = parseInt(mon)+'个月前';
			} else if (day >= 1) {
				time = parseInt(day)+'天前';
			} else if (hour >= 1) {
				time = parseInt(hour)+'小时前';
			} else if (min >= 1) {
				time = parseInt(min)+'分钟前';
			} else {
				time = '刚刚';
			}
			items.push(
				<a key={i} className={"list-group-item b-l-3x "+color[i%4]} ref={"view-item-"+dataId} onClick={this.itemClickHandle.bind(null, dataId)}>
					<span className="block text-ellipsis" style={{fontSize: '15px'}}>{pdoObj['name']}</span>
					<span className="block text-sm text-muted my-mid" style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',whiteSpace:'pre'}}>{info}</span>
					<small className="text-muted">{time}</small>
				</a>
			);
		}

		
		return (
			  <div className="col w-xl lter b-r">
				<div className="vbox">

				  <div className="wrapper-sm b-b">
				 
				      <i className="fa fa-thumb-tack fa-fw m-r-xs"></i>
					  <a href="javascript:void(0)" style={{fontSize: '15px'}}>选择数据</a>

				  </div>
				 
				  <div className="wrapper b-t m-t-xxs" style={{marginTop: '0px', borderTopWidth: '0px'}}>
					<div className="input-group" style={{marginTop: '10px'}}>
					  <span className="input-group-addon input-sm"><i className="fa fa-search"></i></span>
					  <input type="text" className="form-control input-sm ng-pristine ng-untouched ng-valid" placeholder="搜索数据, 多关键字以空格分隔" onChange={this.inputChangeHandle}/>
					</div>
				  </div>
				  
				  <div className="row-row">
					<div className="cell scrollable hover">
					  <div className="cell-inner">
						<div className="padder" style={{marginBottom: '80px'}}>
						  <div className="list-group">
						    {items}
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				  <div className={"text-center pos-abt w-full "+(this.state.renderDataIds.length==0?'':'hide')} style={{top: '50%'}}><span>没有符合的数据</span></div>
				</div>
			  </div>
		);
    }
});

module.exports = ViewDataSelect;