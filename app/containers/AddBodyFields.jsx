require('../../css/lx/add.css');

var AddBodyFields = React.createClass({
	propTypes: {
		
	},
	getInitialState: function () {
		return {
				
		};
	},
	componentDidMount: function () {

	},
	render: function () {
		return (
				<div className="add-body-block">
					<form className="form-horizontal" role="form">

						<div className="form-group">
							<label className="col-md-2 control-label">起点</label>
							<div className="col-md-10">
								<span className="glyphicon glyphicon-edit form-control-feedback" style={{color:'#1986B4', left:20}}></span>
								<input type="text" className="form-control" placeholder="必填" style={{paddingLeft:40}}/>
							</div>
						</div>
											
						<div className="form-group has-error">
							<label className="col-md-2 control-label">终点</label>
							<div className="col-md-10">
								<span className="glyphicon glyphicon-edit form-control-feedback" style={{color:'#a94442', left:20}}></span>
								<input type="text" className="form-control" placeholder="必填" style={{paddingLeft:40}}/>
							</div>
						</div>
											
						<div className="form-group">
							<label className="col-md-2 control-label">金额</label>
							<div className="col-md-10">
								<span className="glyphicon glyphicon-edit form-control-feedback" style={{color:'#1986B4', left:20}}></span>
								<input type="text" className="form-control" placeholder="必填" style={{paddingLeft:40}}/>
							</div>
						</div>
											
					</form>	
				</div>
		);
	}
});

module.exports = AddBodyFields;