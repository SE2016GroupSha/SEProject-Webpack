require('../../css/lx/add.css');

var AddBodyFields = React.createClass({
	propTypes: {
		selectPDO: React.PropTypes.object.isRequired,
		valuesChangeHandle: React.PropTypes.func.isRequired,
		values: React.PropTypes.array.isRequired
	},
	render: function () {
		
		var items = [];
		var fields = this.props.selectPDO['fields'];
		for (var i=0; i<fields.length; i++) {
			var value = this.props.values[i];
			
			if (value=='') {
				items.push(
						<div key={i} className="form-group has-error">
							<label className="col-md-2 control-label">{fields[i]}</label>
							<div className="col-md-10">
								<span className="glyphicon glyphicon-edit form-control-feedback" style={{color:'#a94442', left:20}}></span>
								<input type="text" className="form-control invalid" placeholder="必填" style={{paddingLeft:40}} 
								       value={value} onChange={this.props.valuesChangeHandle.bind(null, i)}/>
							</div>
						</div>
				);
			}
			else {
				items.push(
						<div key={i} className="form-group">
							<label className="col-md-2 control-label">{fields[i]}</label>
							<div className="col-md-10">
								<span className="glyphicon glyphicon-edit form-control-feedback" style={{color:'#1986B4', left:20}}></span>
								<input type="text" className="form-control" placeholder="必填" style={{paddingLeft:40}} 
								       value={typeof(value)=='undefined'?'':value} onChange={this.props.valuesChangeHandle.bind(null, i)}/>
							</div>
						</div>
				);
			}
			
			
		}
		
		return (
				<div className="add-body-block">
					<form className="form-horizontal" role="form">

					{items}
											
					</form>	
				</div>
		);
	}
});

module.exports = AddBodyFields;