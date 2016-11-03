require('./css/searchBar.css');
var SearchBar = React.createClass({	
	render: function () {
		return (
			<div className='row'>
				<div className='col-xs-8'>
					<h3> 查看个人数据 <i className = 'small glyphicon glyphicon-th'></i></h3>
				</div>
				
				<div className='col-xs-4'>
					<div className='searchBarBody'>
						<form role="form">
							<div className="form-group">
								<div className="input-group">
									<input type="text" className="form-control" onBlur={this.props.onBlur}/>
									<span className="input-group-btn">
										<button type="button" className="btn btn-info" onClick={this.props.onClick}>搜索</button>
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>
				
			</div>
		);	
	}
});

module.exports = SearchBar;