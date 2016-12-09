var Orbit_TimelineDataDisplay = require('./Orbit_TimelineDataDisplay.jsx');
var Orbit_DetailedDataDisplay = require("./Orbit_DetailedDataDisplay.jsx");
var Orbit = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {
			datas:[], //保存所有数据
			pdos:[],  //保存所有PDO
			dmap:[],  //数据id和数据位置的对应关系
			pmap:[],  //pdoid和pdo位置的对应关系
			pnum:[],  //当前pdo的实例数
			tl_list:[],//时间轴上显示的数据
			currentItem:[],  //当前详细展示的数据
				   //primary   success   info      warning   danger
			pcolors:["#7266ba","#27c24c","#23b7e5","#fad733","#f05050",
					"#631A86","#8A6552","#985F99","#F39237","#A2D729","#414066"]
        };
    },
    componentWillMount: function() {
		this.init();
    },
	init: function(){
		var key = {"keys":[""]};
		var _datas;
		var _pdos;

		$.ajax({
			async: false,
			type: "post",
			cache: false,
			url: "api/search/fuzzy",
			data: {"params":JSON.stringify(key)},
			dataType: "json",
			success: function(receivedData, textStatus){
				_datas = receivedData.datas;
				_pdos = receivedData.pdos;
			}
		});
		
		var _dmap = [];
		for(var i = 0; i < _datas.length; i++)
		{
			_dmap[_datas[i].id] = i;
		}
		
		var _pmap = [];
		for(var i = 0; i < _pdos.length; i++)
		{
			_pmap[_pdos[i].id] = i;
		}
		
		var _pnum = [];
		for(var i = 0; i < _pdos.length; i++)
		{
			_pnum[i] = 0;
		}
		
		var _tl_list = [];
		for(var i = 0; i < _datas.length; i++)
		{
			var _tl_item = new Array();
			var _pdo = _pdos[_pmap[_datas[i].pdo]];
			var _datetime = new Date(_datas[i].time).toString().split(" ");
			_pnum[_pmap[_datas[i].pdo]] ++;
			
			_tl_item["isLeft"] = (_pmap[_datas[i].pdo] % 2 == 0) ? true : false;
			_tl_item["date"] = _datetime[1] + " " +_datetime[2];// + " " + _datetime[3];
			_tl_item["time"] = _datetime[4];
			_tl_item["pdoName"] = _pdo.name;
			_tl_item["pdoColor"] = _pmap[_datas[i].pdo];
			_tl_item["pdoDisplayTag"] = {"name":_pdo.fields[0],"value":_datas[i].values[0]};
			_tl_item["instanceNumber"] = _pnum[_pmap[_datas[i].pdo]];
			
			_tl_list.push(_tl_item);
		}
		
		this.setState({
			datas: _datas,
			pdos: _pdos,
			dmap: _dmap,
			pmap: _pmap,
			pnum: _pnum,
			tl_list: _tl_list,
		});
	},
	handleTimelineClick: function(e){
		console.log(e.target);
		var id = e.target.id.split("_")[1];
		var _cur_item = [];
		var _data = this.state.datas[id];
		var _pdo = this.state.pdos[this.state.pmap[_data.pdo]];
		var _datetime = new Date(_data.time).toString().split(" ");
		
		_cur_item["datetime"] = _datetime;
		_cur_item["pdoName"] = _pdo.name;
		_cur_item["pdoFields"] = _pdo.fields;
		_cur_item["values"] = _data.values;
		_cur_item["pdoColor"] = this.state.pmap[_data.pdo];
		_cur_item["instanceNumber"] = this.state.tl_list[id].instanceNumber;
		_cur_item["relatedDatas"] = [];
		for(var i = 0; i < _data.related_data.length; i++)
		{
			_cur_item.relatedDatas.push(this.state.tl_list[this.state.dmap[_data.related_data[i]]]);
		}
		
		this.setState({
			currentItem: _cur_item
		});
		
	},
    render: function() {
		return (
			<div className="app-content">
				<div className="app-content-body app-content-full fade-in-up" >
					<div className="hbox hbox-auto-xs hbox-auto-sm">
					  <div className="col">
						<Orbit_TimelineDataDisplay 
						items={this.state.tl_list} 
						colors={this.state.pcolors}
						onClick = {this.handleTimelineClick}/>
					  </div>
					  <div  className="col w-lg bg-light dk b-r bg-auto">
						<Orbit_DetailedDataDisplay 
						item={this.state.currentItem}
						colors={this.state.pcolors}/>
					  </div>
					</div>
				</div>
			</div>
		);
    }
});

module.exports = Orbit;