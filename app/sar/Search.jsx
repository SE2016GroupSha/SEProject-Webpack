var Search_result = require("./Search_result.jsx");
var Search = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {
			searchKeys:[],
			datas:[],
			pdos:[],
			dmap:[],
			pmap:[],
			pcolor:[],
			isLoading: true
        };
    },
	getSearchData: function(){
		var self = this;
		var key = {"keys":[""]};
		$.ajax({
			async: true,
			type: "post",
			cache: false,
			url: "api/search/fuzzy",
			data: {"params":JSON.stringify(key)},
			dataType: "json",
			success: function(receivedData, textStatus){
				self.init(receivedData.datas, receivedData.pdos);
			}
		});
	},
	init: function(_datas, _pdos){		
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
		
		// var _pnum = [];
		// for(var i = 0; i < _pdos.length; i++)
		// {
			// _pnum[i] = 0;
		// }
		
		// var _tl_list = [];
		// for(var i = 0; i < _datas.length; i++)
		// {
			// var _tl_item = new Array();
			// var _pdo = _pdos[_pmap[_datas[i].pdo]];
			// var _datetime = new Date(_datas[i].time).toString().split(" ");
			// _pnum[_pmap[_datas[i].pdo]] ++;
			
			// _tl_item["isLeft"] = (_pmap[_datas[i].pdo] % 2 == 0) ? true : false;
			// _tl_item["date"] = _datetime[1] + " " +_datetime[2];// + " " + _datetime[3];
			// _tl_item["time"] = _datetime[4];
			// _tl_item["pdoName"] = _pdo.name;
			// _tl_item["pdoColor"] = _pmap[_datas[i].pdo];
			// _tl_item["pdoDisplayTag"] = {"name":_pdo.fields[0],"value":_datas[i].values[0]};
			// _tl_item["instanceNumber"] = _pnum[_pmap[_datas[i].pdo]];
			
			// _tl_list.push(_tl_item);
		// }
		
		this.setState({
			datas: _datas,
			pdos: _pdos,
			dmap: _dmap,
			pmap: _pmap,
			isLoading: false
		});
	},
    render: function() {
		return (
			<div className="app-content">
				<div className="app-content-body fade-in-up">
					<div className="fade-in-down ">
						<div className="bg-light lter b-b wrapper-md">
						  <h1 className="m-n font-thin h3">
						  <i className="icon-magnifier i-sm m-r-sm"></i> 搜索
						  </h1>
						</div>
					</div>
					
					<div className="wrapper-md">
					  <form className="m-b-md">
						<div className="input-group">
						  <input type="text" className="form-control input-lg" placeholder="输入关键字" />
						  <span className="input-group-btn">
							<button className="btn btn-lg btn-default" type="button">给我搜</button>
						  </span>
						</div>
					  </form>
					  <p className="m-b-md">
						在<strong>n</strong>个PDO中共找到了<strong>m</strong>条结果
					  </p>
					</div>
					
					<Search_result />
					<Search_result />
				</div>
		    </div>
		);
    }
});

module.exports = Search;