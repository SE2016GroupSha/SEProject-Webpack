require('./css/searchBar.css');
var SearchBar = React.createClass({
	getInitialState: function () {
		return{
			showSearchText: false,
			showSearch: false,
			color: 'none'
		};
	},
	
	handleClick: function (e) {
		this.setState({showSearch: !this.state.showSearch});
	},
	
	handleMouseEnter: function (e) {
		this.setState({showSearchText: true});
		this.setState({color: '#d9edf7'});
	},
	
	handleMouseLeave: function (e) {
		this.setState({showSearchText: false});
		this.setState({color: this.state.showSearch ? '#d9edf7' : 'white'});
	},
	
	handleChange: function (e) {
		$.ajax({
			async: false,
			type: 'POST',
			cache: false,
			url: "api/hello",
			data: {'search': JSON.stringify(e.target.value)},
			dataType: "json",
			success: function(data) {
				alert('success');
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert('环境异常');
			}
		});
	},
	
	render: function () {
		
		var searchBarIconClass = this.state.showSearch ? 
		'searchBarIcon bg-info glyphicon glyphicon-chevron-down' : 
		'searchBarIcon bg-info glyphicon glyphicon-search';
		
		return (
			<div className='row'>
				<div className='col-xs-8'>
					<h3> 查看个人数据 <i className = 'small glyphicon glyphicon-list'></i></h3>
				</div>
				
				<div className='col-xs-4'>
					<div className='searchBarBody'>
						<form role="form">
							<div className="form-group">
								<div className="input-group">
									<input type="text" className="form-control" />
									<span className="input-group-btn">
										<button type="button" className="btn btn-info">搜索</button>
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>
				
				{
					/*<div className='col-xs-2'>
						<div className='searchBarDiv' style={{backgroundColor: this.state.color}}
						onClick={this.handleClick} 
						onMouseEnter={this.handleMouseEnter} 
						onMouseLeave={this.handleMouseLeave}>
						<i className={searchBarIconClass}></i>
							{(this.state.showSearchText || this.state.showSearch) && <i className='searchBarText'>搜索</i>}
						</div>
					</div>*/
				}
			</div>
		);	
	}
});

module.exports = SearchBar;