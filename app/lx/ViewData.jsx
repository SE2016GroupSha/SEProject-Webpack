var ViewDataSelect = require('./ViewDataSelect');
var ViewDataView = require('./ViewDataView');

var ViewData = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {
			initFlag: 0,
			allDataIdMap: {},
			allPDOIdMap: {},
			selectedDataId: 'blank'
        };
    },
	componentWillMount: function() {
		var self = this;
		
		//ajax获取全部data和pdo
		var httpParams = {keys:['']};
		$.ajax({
			async: true,//异步
			type:"POST",
			cache: false,
			url: "api/search/fuzzy",
			data: {'params':JSON.stringify(httpParams)},
			dataType: "json",
			success: function(data) {
				//生成data的map
				var datas = data['datas'];
				var dataIdMap = {};
				for (var i=0; i<datas.length; i++) {
					dataIdMap[datas[i]['id']] = datas[i];
				}
				//生成pdo的map
				var pdos = data['pdos'];
				var pdoIdMap = {};
				for (var i=0; i<pdos.length; i++) {
					pdoIdMap[pdos[i]['id']] = pdos[i];
				}
				//更新状态
				var reinitFlag = self.state.initFlag+1;
				self.setState({
					initFlag: reinitFlag,
					allDataIdMap: dataIdMap,
					allPDOIdMap: pdoIdMap,
					selectedDataId: 'blank'
				});
			},
			error: function (jqXHR, textStatus, errorThrown) {
				//更新状态
				var reinitFlag = self.state.initFlag+1;
				self.setState({
					initFlag: reinitFlag,
					allDataIdMap: {},
					allPDOIdMap: {},
					selectedDataId: 'blank'
				});
			}
		});
    },
	ViewDataSelectHandle: function(msg, param) {
		switch(msg) {
		case 'select':
			this.setState({
				selectedDataId: param
			});
			break;
		default:
			break;
		}
	},
	ViewDataViewHandle: function(msg, param) {
		//未使用
	},
    render: function() {
		return (
			<div className="app-content h-full">
			  <div className="app-content-body app-content-full fade-in-up h-full">
				  <div className="hbox hbox-auto-xs hbox-auto-sm bg-light">
					<ViewDataSelect ViewDataSelectHandle={this.ViewDataSelectHandle} 
									initFlag={this.state.initFlag}
									allDataIdMap={this.state.allDataIdMap}
									allPDOIdMap={this.state.allPDOIdMap}
									selectedDataId={this.state.selectedDataId}
					/>
					<ViewDataView   ViewDataViewHandle={this.ViewDataViewHandle} 
									allDataIdMap={this.state.allDataIdMap}
									allPDOIdMap={this.state.allPDOIdMap}
									selectedDataId={this.state.selectedDataId}
									test={this.state.test}
					/>
				  </div>
			  </div>
		    </div>
		);
    }
});

module.exports = ViewData;