var Orbit = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {
			datas: [],
			dataIdMap: {},
			pdoIdMap: {},
			isView: false,
			msg: '正在加载',
			days: 0,
			username: '-'
        };
    },
    componentWillMount: function() {
		var self = this;
		var key = {"keys":[""]};
		$.ajax({
			async: true,
			type: "post",
			cache: false,
			url: "api/search/fuzzy",
			data: {"params":JSON.stringify(key)},
			dataType: "json",
			success: function(data){
				var pdoIdMap = {};
				for (var i=0; i<data['pdos'].length; i++) {
					pdoIdMap[data['pdos'][i]['id']] = data['pdos'][i];
				}
				var dataIdMap = {};
				for (var i=0; i<data['datas'].length; i++) {
					dataIdMap[data['datas'][i]['id']] = data['datas'][i];
				}

				self.setState({
					datas: data['datas'],
					dataIdMap: dataIdMap,
					pdoIdMap: pdoIdMap,
					isView: true,
					msg: '结束'
				});
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.setState({
					isView: false,
					msg: '网络未连通'
				});
			}
		});
		//获取登录用户名
		$.ajax({
			async: true,//异步
			type:"POST",
			cache: false,
			url: "api/user/username",
			data: {'params':'{}'},
			dataType: "json",
			success: function(data) {
				if (data['state']=='failed') {
					self.setState({
						username: '-'
					});
				} else {
					self.setState({
						username: data['username']
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.setState({
					username: '-'
				});
			}
		});
		//获取注册天数
		$.ajax({
			async: true,//异步
			type:"POST",
			cache: false,
			url: "api/user/regdays",
			data: {'params':'{}'},
			dataType: "json",
			success: function(data) {
				if (data['state']=='failed') {
					self.setState({
						days: 0
					});
				} else {
					self.setState({
						days: data['regdays']
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.setState({
					days: 0
				});
			}
		});
    },
    render: function() {
		
		var datas = this.state.datas;
		var dataIdMap = this.state.dataIdMap;
		var pdoIdMap = this.state.pdoIdMap;
		
		var colors = ['#fad733', '#23b7e5', '#27c24c', '#7266ba', 'rgba(255,79,0,0.76)'];
		var pdoColorMap = {};
		var colorIndex = 0;
		var colorMax = 5;
		
		var itemArray = [];
		for (var i=0; i<datas.length; i++) {
			var item = {};
			var subItemArray = [];
			var data = datas[i];
			
			for (var j=0; j<data['related_data'].length; j++) {
				var reId = data['related_data'][j];
				var reData = dataIdMap[reId];
				var reInfo = '';
				for (var k=0; k<reData['values'].length; k++) {
					reInfo += pdoIdMap[reData['pdo']]['fields'][k];
					reInfo += ': ';
					reInfo += reData['values'][k];
					reInfo += '　';
				}
				var relatedTime = '';
				var ms = (new Date()).getTime()-reData['time'];
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
				subItemArray.push(
					<div className="m-l-lg" key={(i+'')+(j+'')}>
					  <a className="pull-left thumb-sm avatar">
						
						<img src={require('../../resource/img/user.jpg')} alt="..." />
					  </a>          
					  <div className="m-l-xxl panel b-a">
						<div className="panel-heading pos-rlt b-b b-light">
						  <span className="arrow left"></span>                    
						  <a href="javascript:void(0)">
							  <span className="block" style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',whiteSpace:'pre'}}>关联数据{j+1}——
								  <span style={{color:'#58666e'}}>
								    {pdoIdMap[reData['pdo']]['name']}　{reInfo}
								  </span>
								  <span className="text-muted m-l-sm pull-right">
									<i className="fa fa-clock-o"></i>
									&nbsp;{relatedTime}
								  </span>
							  </span> 
						  </a>
						</div>
					  </div>
					</div>
				);
			}
			
			var info = '';
			for (var j=0; j<data['values'].length; j++) {
				info += pdoIdMap[data['pdo']]['fields'][j];
				info += ': ';
				info += data['values'][j];
				info += '　';
			}
			var time = '';
			var ms = (new Date()).getTime()-data['time'];
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
			
			var color = '';
			if (typeof pdoColorMap[pdoIdMap[data['pdo']]['name']] == 'undefined') {
				pdoColorMap[pdoIdMap[data['pdo']]['name']] = colors[(colorIndex++)%(colorMax)];
			}
			var color = pdoColorMap[pdoIdMap[data['pdo']]['name']];
			
			itemArray.push(
				<div key={i+''}>
					<div>
					  <a className="pull-left thumb-sm avatar m-l-n-md">
						<img src={require('../../resource/img/user.jpg')} alt="..." />
					  </a>          
					  <div className="m-l-lg panel b-a">
						<div className="panel-heading pos-rlt b-b b-light" style={{backgroundColor:color}}>
						  <span className="arrow left"></span>                    
						  <a href="javascript:void(0)" style={{color:'#fff'}}>{pdoIdMap[data['pdo']]['name']}</a>
						  <span className="text-muted m-l-sm pull-right" style={{color:'#fff'}}>
							<i className="fa fa-clock-o"></i>
							&nbsp;{time}
						  </span>
						</div>
						<div className="panel-body">
						  <div><span className="block" style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',whiteSpace:'pre'}}>{info}</span></div>
						</div>  
					  </div>
					</div>
					{subItemArray}
				</div>
			);
		}
		var day = this.state.days;
		var mon = day/30.0;
		var year = mon/12.0;
		if (year >= 1) {
			time = parseInt(year)+'年前';
		} else if (mon >= 1) {
			time = parseInt(mon)+'个月前';
		} else if (day >= 2) {
			time = parseInt(day)+'天前';
		} else {
			time = '今天';
		}
		itemArray.push(
				<div key={'-1'}>
					<div>
					  <a className="pull-left thumb-sm avatar m-l-n-md">
						<img src={require('../../resource/img/user.jpg')} alt="..." />
					  </a>          
					  <div className="m-l-lg panel b-a">
						<div className="panel-heading pos-rlt b-b b-light" style={{backgroundColor:'#7266ba'}}>
						  <span className="arrow left"></span>                    
						  <a href="javascript:void(0)" style={{color:'#fff'}}>你好，{this.state.username}</a>
						  <span className="text-muted m-l-sm pull-right" style={{color:'#fff'}}>
							<i className="fa fa-clock-o"></i>
							&nbsp;{time}
						  </span>
						</div>
						<div className="panel-body">
						  <div><span className="block" style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',whiteSpace:'pre'}}>{this.state.days==1?'今天':((this.state.days-1)+'天前')}，你来到了足迹</span></div>
						</div>  
					  </div>
					</div>
				</div>
		);
		
		return (
		  <div className="app-content">
			<div className="app-content-body fade-in-up">
				<div className="hbox hbox-auto-xs hbox-auto-sm">

				    <div className="wrapper-md bg-light b-b">
					  <h6 className="m-n font-thin h3"><i className="fa fa-clock-o"></i>&nbsp;&nbsp;轨迹</h6>
				    </div>
					
					<div className="col-lg-1">
					</div>
					<div className="col-lg-9">
						{this.state.isView?
						<div className="m-b b-l m-l-md streamline b-info padder-v" style={{paddingTop:'25px'}}>
							{itemArray}
						</div>
						:
						null
						}
						<div className="text-center">
						    <p className="ng-scope ">
						      <small className="text-muted">·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;{this.state.msg}&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;</small>
						    </p>
						</div>
					
					</div>
					<div className="col-lg-2">
					</div>
				</div>
			</div>
		  </div>
		);
    }
});

module.exports = Orbit;