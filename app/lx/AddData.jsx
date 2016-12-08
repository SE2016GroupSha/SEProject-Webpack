require('../../resource/css/lx/lx.css');
var AddDataPDO = require('./AddDataPDO');
var AddDataData = require('./AddDataData');
var AddDataRelated = require('./AddDataRelated');

var AddData = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {
			currentPDO: {},
			relatedClearSignal: 0,
			relatedData: []
        };
    },
    componentDidMount: function() {
		
    },
	AddDataPDOHandle: function(msg, param) {
		switch (msg) {
		case 'pdo_change':
			console.log('pdo_change');
			if (this.state.currentPDO.id != param.id) {
				var newSignal = this.state.relatedClearSignal+1;
				this.setState({
					currentPDO: param,
					relatedClearSignal: newSignal, //清空关联状态
					relatedData: []
				});
			}
			break;
		default:
			break;
		}
    },
	AddDataDataHandle: function(msg, param) {
		switch (msg) {
		case 'add_ok':
			console.log('add_ok');
			var newSignal = this.state.relatedClearSignal+1;
			this.setState({
				relatedClearSignal: newSignal, //清空关联状态
				relatedData: []
			});
			break;
		default:
			break;
		}
    },
	AddDataRelatedHandle: function(msg, param) {
		switch (msg) {
		case 'update_related':
			console.log('update_related');
			console.log(param);
			this.setState({
				relatedData: param
			});
			break;
		default:
			break;
		}
    },
    render: function() {
		return (
			  <div className="app-content h-full">
				<div className="app-content-body app-content-full fade-in-up h-full">
					<div className="hbox hbox-auto-xs hbox-auto-sm bg-light">
						<AddDataPDO AddDataPDOHandle={this.AddDataPDOHandle}/>
						<AddDataData AddDataDataHandle={this.AddDataDataHandle} currentPDO={this.state.currentPDO} relatedData={this.state.relatedData}/>
						<AddDataRelated AddDataRelatedHandle={this.AddDataRelatedHandle} currentPDO={this.state.currentPDO} relatedClearSignal={this.state.relatedClearSignal}/>
					</div>
				</div>
			  </div>
		);
    }
});

module.exports = AddData;
