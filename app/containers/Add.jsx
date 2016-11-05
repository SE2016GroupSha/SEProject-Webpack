var AddContent = require('./AddContent');

var Add = React.createClass({
	componentDidMount: function () {
		var panelDOM = this.refs.panelElement;
		$(panelDOM).collapse('toggle');
	},
	render: function () {
		return (
				<div className="row clearfix">
					<div className="col-xs-12 column">
						<div className="panel-group" id="panel-add-data">
						
							<div className="panel panel-info">
								<div className="panel-heading">
									 <a className="panel-title collapsed" data-toggle="collapse" data-parent="#panel-add-data" href="#panel-element-add-data">添加数据</a>
								</div>
								<div ref="panelElement" id="panel-element-add-data" className="panel-collapse collapse">
									<div className="panel-body">
										<AddContent />
									</div>
								</div>
							</div>
					
						</div>
					</div>
				</div>
		);
	}
});

module.exports = Add;