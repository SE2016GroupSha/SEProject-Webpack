require('../../css/lx/add.css');

var AddBodyDateTime = React.createClass({
	propTypes: {
		
	},
	getInitialState: function () {
		return {
				
		};
	},
	componentDidMount: function () {
		$(this.refs.clockTest).clockpicker({
			default: 'now',
			autoclose: true
		});
		
		
		$(this.refs.dateTest).datepicker({
			language: "zh-CN",
			orientation: "bottom auto",
			autoclose: true,
			todayHighlight: true
		});
	},
	render: function () {
		return (
				<div className="add-body-block">
					<form className="form-horizontal" role="form">
										
						<div className="form-group">
							<label className="col-md-2 control-label">日期</label>
							<div className="col-md-10 clockpicker">
								<div className="row clearfix">
									<div className="col-md-6 column">
										<span className="glyphicon glyphicon-calendar form-control-feedback" style={{color:'#1986B4', left:20}}></span>
										<input ref="dateTest" type="text" className="form-control" placeholder="选择日期" style={{paddingLeft:40}}/>
									</div>
									<div className="col-md-6 column">
										<div className="row clearfix">
											<label className="col-md-4 control-label">时间</label>
											<div className="col-md-8">
												<span className="glyphicon glyphicon-time form-control-feedback" style={{color:'#1986B4', left:20}}></span>
												<input ref="clockTest" type="text" className="form-control" placeholder="选择时间" style={{paddingLeft:40}}/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</form>	
				</div>
		);
	}
});

module.exports = AddBodyDateTime;