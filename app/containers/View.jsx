var DisplayData = require('./DisplayData');
var SearchBar = require('./SearchBar');

var View = React.createClass({
	getInitialState: function () {
		return {
			
		}
	},
	
	render: function () {	
		return (
			<div className = 'container-fluid'>
				<SearchBar />
				<DisplayData />
			</div>
		);
	}
});

module.exports = View;