var DisplayData = require('./DisplayData');
var SearchBar = require('./SearchBar');

var View = React.createClass({
	getInitialState: function () {
		return {
			searchKey:[],
			data:[{title:"陆神和他的女朋友们一起吃饭", date:"2020-15-37", time:"13:25:14", place: "哈尔滨工业大学黑店"},
				  {title:"陆神和他的女朋友们一起吃饭", date:"2020-15-37", time:"18:25:14", place: "江南豪华酒店"},
				  {title:"陆神和他的女朋友们一起睡觉", date:"2020-15-37", time:"23:25:14", place: "江南豪华酒店"}]
		}
	},
	
	handleSearchClick: function(e) {
		
	},
	
	handleSearchInput: function(e) {
		this.state.searchKey = e.target.value.split(" ");
		console.log(this.state.searchKey);
	},
	
	handleShowDetailedData: function(e) {
	},

	render: function () {	
		return (
			<div className = 'container-fluid'>
				<SearchBar onBlur={this.handleSearchInput} onClick={this.handleSearchClick}/>
				<DisplayData data={this.state.data} onClick={this.handleShowDetailedData}/>
			</div>
		);
	}
});

module.exports = View;