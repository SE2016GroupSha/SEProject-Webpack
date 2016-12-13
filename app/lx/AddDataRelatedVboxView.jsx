var AddDataRelatedVboxView = React.createClass( {
    propTypes: {
		AddDataRelatedVboxViewHandle: React.PropTypes.func.isRequired,
		relatedData: React.PropTypes.array.isRequired,
		isHide: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        return {

        };
    },
    componentDidMount: function() {
		
    },
	addClickHandle: function(event) {
		console.log('Related: addClickHandle');
		this.props.AddDataRelatedVboxViewHandle('toAdd');
	},
	itemDetailClickHandle: function(index, data, event) {
		console.log('Related: itemDetailClickHandle');
		this.props.AddDataRelatedVboxViewHandle('toDetail', data);
	},
	itemRemoveClickHandle: function(index, data, event) {
		function stopPropagation(e) {  
			e = e || window.event;  
			if(e.stopPropagation) { //W3C阻止冒泡方法  
				e.stopPropagation();  
			} else {  
				e.cancelBubble = true; //IE阻止冒泡方法  
			}  
		}
		
		stopPropagation(event);
		
		this.props.AddDataRelatedVboxViewHandle('itemRemove', data);
				
		console.log('Related: itemRemoveClickHandle');
	},
    render: function() {
		
		//建立items
		var items = [];
		var datas = this.props.relatedData;
		var color = ['b-l-primary', 'b-l-success', 'b-l-info', 'b-l-warning'];
		for (var i=0; i<datas.length; i++) {
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
				  <span className="pull-right text-muted my-mid " onClick={this.itemRemoveClickHandle.bind(null, i, datas[i])}>
					<i className="fa fa-times my-hover" style={{fontSize:'20px'}}></i>
				  </span>
				  <span className="block text-sm text-muted my-mid" style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',whiteSpace:'pre'}}>{info}</span>
				  <small className="text-muted">{time}</small>
				</a>
			);
		}
		
		return (
				<div className={"vbox "+(this.props.isHide?'hide':'')}>

				  <div className="wrapper-sm b-b">
					<i className="fa fa-ellipsis-v fa-fw m-r-xs"></i>
					<a href="javascript:void(0)" style={{fontSize:'15px'}}>已关联数据</a>
					<a href="javascript:void(0)" className="pull-right btn btn-xs btn-default" style={{marginBottom:'-3px',backgroundColor:'#f5f5f5'}}  onClick={this.addClickHandle}><i className="fa fa-chevron-left fa-fw m-r-xs"></i>返回&nbsp;</a>
				  </div>
				  
				  <div className="wrapper b-t m-t-xxs" style={{marginTop:'0px',borderTopWidth:'0px'}}>
					<div className="input-group" style={{marginTop:'10px'}}>
					</div>
				  </div>
				 
				  <div className="row-row">
					<div className="cell scrollable hover">
					  <div className="cell-inner">

						<div className="padder">
						  <div className="list-group">
						  {items}
						  </div>
						</div>
						
					  </div>
					</div>
				  </div>
				  <div className={"text-center pos-abt w-full "+(this.props.relatedData.length==0?'':'hide')} style={{top:'50%'}}><span>未关联任何数据</span></div>
				</div>
		);
    }
});

module.exports = AddDataRelatedVboxView;
