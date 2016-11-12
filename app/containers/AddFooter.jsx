require('../../css/lx/add.css');

var AddFooter = React.createClass({
	propTypes: {
		
	},
	getInitialState: function () {
		return {
				
		};
	},
	componentDidMount: function () {

	},
	clearFocus: function(item) {
		switch (item) {
		case 'submitButton' :
			this.refs.submitButton.blur();
			break;
		case 'resetButton' :
			this.refs.resetButton.blur();
			break;
		default:
			break;
		}
	},
	render: function () {
		return (
				<div className="add-footer">
					<button type="button" className="btn btn-default" onClick={alert.bind(null, 'resetButton')} onFocus={this.clearFocus.bind(null, 'resetButton')} ref="resetButton">重置</button>
					<button type="button" className="btn btn-primary" onClick={alert.bind(null, 'submitButton')} onFocus={this.clearFocus.bind(null, 'submitButton')} ref="submitButton">提交</button>
				</div>

		);
	}
});

module.exports = AddFooter;