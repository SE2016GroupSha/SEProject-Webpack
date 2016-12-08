var AddDataRelatedVboxAdd = require('./AddDataRelatedVboxAdd');
var AddDataRelatedVboxView = require('./AddDataRelatedVboxView');
var AddDataRelatedVboxDetail = require('./AddDataRelatedVboxDetail');

var AddDataRelated = React.createClass( {
    propTypes: {
		AddDataRelatedHandle: React.PropTypes.func.isRequired,
		currentPDO: React.PropTypes.object.isRequired,
		relatedClearSignal: React.PropTypes.number.isRequired
    },
    getInitialState: function() {
        return {
			isAddHide: false,
			isViewHide: true,
			isDetailHide: true,
			searchKey: '',
			searchClearSignal: 0,
			detailFrom: 'none',
			detailData: {},
			relatedData: [] //渲染的核心枢纽
        };
    },
	componentWillReceiveProps: function(nextProps) {
		if (this.props.relatedClearSignal != nextProps.relatedClearSignal) {
			this.clearState();
		}
	},
    componentDidMount: function() {

    },
	componentDidUpdate: function(prevProps, prevState) {

    },
	clearState: function () {
		var newSignal = this.state.searchClearSignal+1;
		this.setState({
			isAddHide: false,
			isViewHide: true,
			isDetailHide: true,
			searchKey: '',
			searchClearSignal: newSignal, //重置搜索状态
			detailFrom: 'none',
			detailData: {},
			relatedData: [] //渲染的核心枢纽
		});
	},
	AddDataRelatedVboxAddHandle: function(msg, param) {
		switch (msg) {
		case 'toView':
			this.setState({
				isAddHide: true,
				isViewHide: false,
				isDetailHide: true
			});
			break;
		case 'toDetail':
			this.setState({
				isAddHide: true,
				isViewHide: true,
				isDetailHide: false,
				detailFrom: 'add',
				detailData: param
			});
			break;
		case 'itemAdd':
			var newRelatedData = this.state.relatedData;
			newRelatedData.push(param);
			this.setState({
				relatedData: newRelatedData
			});
			this.props.AddDataRelatedHandle('update_related', newRelatedData);
			break;
		case 'keyChange':
			this.setState({
				searchKey: param
			});
			break;
		default:
			break;
		}
	},
	AddDataRelatedVboxViewHandle: function(msg, param) {
		switch (msg) {
		case 'toAdd':
			this.setState({
				isAddHide: false,
				isViewHide: true,
				isDetailHide: true
			});
			break;
		case 'toDetail':
			this.setState({
				isAddHide: true,
				isViewHide: true,
				isDetailHide: false,
				detailFrom: 'view',
				detailData: param
			});
			break;
		case 'itemRemove':
			var oldRelatedData = this.state.relatedData;
			var newRelatedData = [];
			for (var i=0; i<oldRelatedData.length; i++) {
				if (oldRelatedData[i]['id'] != param['id']) {
					newRelatedData.push(oldRelatedData[i]);
				}
			}
			this.setState({
				relatedData: newRelatedData
			});
			this.props.AddDataRelatedHandle('update_related', newRelatedData);
			break;
		default:
			break;
		}
	},
	AddDataRelatedVboxDetailHandle: function(msg, param) {
		switch (msg) {
		case 'toBack':
			if (this.state.detailFrom=='add') {
				this.setState({
					isAddHide: false,
					isViewHide: true,
					isDetailHide: true,
					detailFrom: 'none',
					detailData: {}
				});
			} else if (this.state.detailFrom=='view') {
				this.setState({
					isAddHide: true,
					isViewHide: false,
					isDetailHide: true,
					detailFrom: 'none',
					detailData: {}
				});
			} else {
				//不可能发生,处理为add
				this.setState({
					isAddHide: false,
					isViewHide: true,
					isDetailHide: true,
					detailFrom: 'none',
					detailData: {}
				});
			}
			break;
		default:
			break;
		}
	},
    render: function() {
		return (
			  <div className={"col w-xl lter b-l "+(typeof(this.props.currentPDO['fields'])=='undefined'?'hide':'')}>
				  <AddDataRelatedVboxAdd AddDataRelatedVboxAddHandle={this.AddDataRelatedVboxAddHandle} 
										 searchKey={this.state.searchKey}
										 searchClearSignal={this.state.searchClearSignal}
										 currentPDO={this.props.currentPDO}
										 relatedData={this.state.relatedData}
										 isHide={this.state.isAddHide} 
				  />
				  <AddDataRelatedVboxView AddDataRelatedVboxViewHandle={this.AddDataRelatedVboxViewHandle} 
										  relatedData={this.state.relatedData}
										  isHide={this.state.isViewHide} 
				  />
				  <AddDataRelatedVboxDetail AddDataRelatedVboxDetailHandle={this.AddDataRelatedVboxDetailHandle} 
											detailData={this.state.detailData}
											isHide={this.state.isDetailHide} 
				  />
			  </div>
		);
    }
});

module.exports = AddDataRelated;
