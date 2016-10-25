var SearchBar = React.createClass({
	getInitialState: function () {
		return{
			showSearch: false
		};
	},
	
	handleClick: function (e) {
		this.setState({showSearch: !this.state.showSearch});
	},
	
	handleChange: function (e) {
		alert('1');
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
		return (
			<div className='row'>
				<div className='col-xs-6'>
					<button className='btn btn-primary' onClick={this.handleClick}>
						<i className='glyphicon glyphicon-search' style={{paddingRight: '10px'}}></i>
						搜索
					</button>
					{this.state.showSearch &&(
					<div style = {{margin: '20px 5px'}}>
						<label htmlFor="searchInput">模糊搜索</label>
						<input type="text" className="form-control" id="searchInput" onChange={this.handleChange}/>
					</div>)}

				</div>
				<div className='col-xs-6'></div>
			</div>
		);	
	}
});

module.exports = SearchBar;