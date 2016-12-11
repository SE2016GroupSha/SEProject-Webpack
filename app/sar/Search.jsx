var Search_result = require("./Search_result.jsx");
var Search = React.createClass( {
    propTypes: {

    },
	getDefaultProps: function() {
		return {
			nColor: 11
		}
	},
    getInitialState: function() {
        return {
			searchKeys:[],
			datas:[],
			pdos:[],
			dmap:[],
			pmap:[],
			result:[],
			isLoading: true
        };
    },
	componentWillMount: function(){
		this.getSearchData();
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
		
		var _result = [];
		for(var i = 0; i < _pdos.length; i++)
		{
			_result[i] = [];
		}
		for(var i = 0; i < _datas.length; i++)
		{
			_result[_pmap[_datas[i].pdo]].push(_datas[i]);
		}
		
		this.setState({
			datas: _datas,
			pdos: _pdos,
			dmap: _dmap,
			pmap: _pmap,
			result: _result,
			isLoading: false
		});
	},
    render: function() {
		var result_list = [];
		for(var i = 0; i < this.state.result.length; i++)
		{
			result_list.push(
			<Search_result
			key={"result_pdo_"+i}
			cn={i % this.props.nColor}
			pdoName={this.state.pdos[i].name}
			pdoFields={this.state.pdos[i].fields} 
			datas={this.state.result[i]} />
			);
		}
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
						在<strong>{this.state.pdos.length}</strong>个PDO中共找到了<strong>{this.state.datas.length}</strong>条结果
					  </p>
					</div>
					{this.state.isLoading && <div className="text-center"><img src={require("./../../resource/img/sar/loading.jpg")}/></div>}
					{!this.state.isLoading && result_list}
				</div>
		    </div>
		);
    }
});

module.exports = Search;