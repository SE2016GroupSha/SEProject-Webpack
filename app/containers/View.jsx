var DisplayData = require('./DisplayData');
var SearchBar = require('./SearchBar');

var View = React.createClass({
	getInitialState: function () {
		return {
			searchKey:[],
			datas:[{"id":"4", "date":"2020-15-37", "time":"13:56:39", "pdo":"1", "values":["家", "学校", "10分钟"]},
					  {"id":"4", "date":"2020-15-37", "time":"13:56:90", "pdo":"1", "values":["家", "学校", "10分钟"]}],
			pdos:[{"id":"1", "time":1477410877415, "user":"0", "name":"坐车", "fields":["始点","终点","耗时"]}]
		}
	},
	
	handleSearchClick: function(e) {
		var httpParams = {"keys":this.state.searchKey};
		$.ajax({
			async: false,
			type: "post",
			cache: false,
			url: "api/search/fuzzy",
			data: {"params":JSON.stringify(httpParams)},
			dataType: "json",
			success: function(data, textStatus){
				console.log("success");
				console.log(data);
				console.log(textStatus);
				var rawdatas = data.datas;
				var rawpdos = data.pdos;
				for
			}
		});
		return false;
	},
	
	handleSearchInput: function(e) {
		this.state.searchKey = e.target.value.split(" ");
		console.log(this.state.searchKey);
		return false;
	},
	
	handleEnterPress: function(e) {
		if(e.key == "Enter")
		{
			e.preventDefault()
			document.getElementById("searchInput").blur();
			this.handleSearchClick(e);
		}
	},
	
	handleShowDetailedData: function(e) {
	},

	render: function () {	
		return (
			<div className = 'container-fluid'>
				<SearchBar onBlur={this.handleSearchInput} onClick={this.handleSearchClick} cancelEnter={this.handleEnterPress}/>
				<DisplayData datas={this.state.datas} pdos={this.state.pdos} onClick={this.handleShowDetailedData}/>
			</div>
		);
	}
});

module.exports = View;