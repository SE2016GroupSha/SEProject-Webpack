var Test = React.createClass({
	getInitialState: function () {
		return {
				getInput: '',
				postInput: ''
		};
	},
	inputChangeHandle: function (changeType, event) {
		if (changeType=='get') {
			this.setState({
				getInput: event.target.value
			});
		} else if (changeType=='post') {
			this.setState({
				postInput: event.target.value
			});
		}
	},
	testButtonClickHandle: function (type) {
		var self = this;
		$.ajax({
			async: false,
			type: type=='get'?'GET':'POST',
			cache: false,
			url: "api/hello",
			data: {'key': type=='get'?self.state.getInput:self.state.postInput},
			dataType: "json",
			success: function(data) {
				alert(data.message);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert('环境异常');
			}
		});
	},
	render: function () {
		return (
				<div className="row clearfix">
					<div className="col-md-12 column">
						<div className="row clearfix">
							<div className="col-md-4 column">
							</div>
							<div className="col-md-4 column">
								<h3>
									开发环境测试
								</h3>
								<br/>
								<form role="form">
									<div className="form-group">
										<label>GET测试</label>
										<div className="input-group">
											<input type="text" className="form-control" onChange={this.inputChangeHandle.bind(null, 'get')}/>
											<span className="input-group-btn">
												<button type="button" className="btn btn-success" onClick={this.testButtonClickHandle.bind(null, 'get')}>测试</button>
											</span>
										</div>
										<br/>
										<label>POST测试</label>
										<div className="input-group">
											<input type="text" className="form-control" onChange={this.inputChangeHandle.bind(null, 'post')}/>
											<span className="input-group-btn">
												<button type="button" className="btn btn-success" onClick={this.testButtonClickHandle.bind(null, 'post')}>测试</button>
											</span>
										</div>
									</div>
								</form>
							</div>
							<div className="col-md-4 column">
							</div>
						</div>
					</div>
				</div>
		);
	}
});

module.exports = Test;