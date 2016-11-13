require('../../css/lx/add.css');

var AddBodyDateTime = React.createClass({
	propTypes: {
		datetime: React.PropTypes.object.isRequired,
		dateTimeChangeHandle: React.PropTypes.func.isRequired
	},
	componentDidMount: function () {
		var self = this;
		
		$(this.refs.clockTest).clockpicker({
			default: 'now',
			autoclose: true,
			afterDone: function() {
				self.props.dateTimeChangeHandle('time', $(self.refs.clockTest).val());
			}
		});
		
		$(this.refs.dateTest).datepicker({
			format: "yyyy/mm/dd",
			language: "zh-CN",
			orientation: "bottom auto",
			autoclose: true,
			todayHighlight: true
		})
		.on('changeDate', function() {
			self.props.dateTimeChangeHandle('date', $(self.refs.dateTest).val());
		})
		.on('changeMonth', function() {
			self.props.dateTimeChangeHandle('date', $(self.refs.dateTest).val());
		})
		.on('changeYear', function() {
			self.props.dateTimeChangeHandle('date', $(self.refs.dateTest).val());
		});
	},
	render: function () {
		
		var dateItem, timeItem;
		var date = this.props.datetime['date'];
		var time = this.props.datetime['time'];
		
		if (date=='') {
			dateItem = (
							<div className="col-md-6 column">
								<div className="form-group has-error">
									<label className="col-md-4 control-label">日期</label>
									<div className="col-md-8">
										<span className="glyphicon glyphicon-calendar form-control-feedback" style={{color:'#a94442', left:20}}></span>
										<input ref="dateTest" readOnly="true" type="text" className="form-control invalid read-only-input" placeholder="选择日期" style={{paddingLeft:40}}
											value={date}/>
									</div>
								</div>
							</div>
			);
		} else {
			dateItem = (
							<div className="col-md-6 column">
								<div className="form-group">
									<label className="col-md-4 control-label">日期</label>
									<div className="col-md-8">
										<span className="glyphicon glyphicon-calendar form-control-feedback" style={{color:'#1986B4', left:20}}></span>
										<input ref="dateTest" readOnly="true" type="text" className="form-control read-only-input" placeholder="选择日期" style={{paddingLeft:40}}
											value={typeof(date)=='undefined'?'':date}/>
									</div>
								</div>
							</div>
			);
		}

		
		if (time=='') {
			timeItem = (
							<div className="col-md-6 column">
								<div className="form-group has-error">
									<label className="col-md-4 control-label">时间</label>
									<div className="col-md-8">
										<span className="glyphicon glyphicon-time form-control-feedback" style={{color:'#a94442', left:20}}></span>
										<input ref="clockTest" readOnly="true" type="text" className="form-control invalid read-only-input" placeholder="选择时间" style={{paddingLeft:40}}
											value={time}/>
									</div>
								</div>
							</div>
			);
		} else {
			timeItem = (
							<div className="col-md-6 column">
								<div className="form-group">
									<label className="col-md-4 control-label">时间</label>
									<div className="col-md-8">
										<span className="glyphicon glyphicon-time form-control-feedback" style={{color:'#1986B4', left:20}}></span>
										<input ref="clockTest" readOnly="true" type="text" className="form-control read-only-input" placeholder="选择时间" style={{paddingLeft:40}}
											value={typeof(time)=='undefined'?'':time}/>
									</div>
								</div>
							</div>
			);
		}

		
		return (
				<div className="add-body-block">
					<form className="form-horizontal" role="form">	
						<div className="form-group">
							{dateItem}
							{timeItem}
						</div>
					</form>	
				</div>
		);
	}
});

module.exports = AddBodyDateTime;