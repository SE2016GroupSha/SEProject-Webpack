require('../../css/lx/add.css');

var AddFooter = React.createClass({
	propTypes: {
		resetHandle: React.PropTypes.func.isRequired,
		submitHandle: React.PropTypes.func.isRequired
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
					<button type="button" className="btn btn-default" onClick={this.props.resetHandle} onFocus={this.clearFocus.bind(null, 'resetButton')} ref="resetButton">重置</button>
					<button type="button" className="btn btn-primary" onClick={this.props.submitHandle} onFocus={this.clearFocus.bind(null, 'submitButton')} ref="submitButton">提交</button>
				</div>

		);
	}
});

module.exports = AddFooter;