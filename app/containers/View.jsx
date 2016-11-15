var DisplayData = require('./DisplayData');
var SearchBar = require('./SearchBar');

var View = React.createClass({
	getInitialState: function () {
		return {
			searchKey:[""],
			datas:[],
			pdos:[]
		}
	},
	
	componentWillMount: function(){
		this.getData();
	},
	
	getData: function() {
		var httpParams = {"keys":this.state.searchKey};
		var tdatas;
		var tpdos;
		$.ajax({
			async: false,
			type: "post",
			cache: false,
			url: "api/search/fuzzy",
			data: {"params":JSON.stringify(httpParams)},
			dataType: "json",
			success: function(data, textStatus){
				console.log(data);
				console.log(textStatus);
				tdatas = data.datas;
				tpdos = data.pdos;
				for(var i = 0; i < tdatas.length; i++)
				{
					var datetime = new Date(data.datas[i].time).toString().split(" ");
					tdatas[i].date = datetime[1] + " " + datetime[2] + " " + datetime[3];
					tdatas[i].time = datetime[4];
					for(var j = 0; j < tpdos.length; j++)
					{
						if (tdatas[i].pdo == tpdos[j].id)
						{
							tdatas[i].pdofields = tpdos[j].fields;
							tdatas[i].pdoname = tpdos[j].name;
							break;
						}
					}
				}
			}
		});
		this.setState({
			datas:tdatas,
			pdos:tpdos
		});
	},
	
	handleSearchClick: function(e) {
		this.getData();
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
				<DisplayData datas={this.state.datas} onClick={this.handleShowDetailedData}/>
			</div>
		);
	}
});

module.exports = View;