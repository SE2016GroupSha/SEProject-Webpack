var AccountInfo = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {
			username: '-',
			days: 0
        };
    },
    componentDidMount: function() {
		var self = this;
		
		//获取登录用户名
		$.ajax({
			async: true,//异步
			type:"POST",
			cache: false,
			url: "api/user/username",
			data: {'params':'{}'},
			dataType: "json",
			success: function(data) {
				if (data['state']=='failed') {
					self.setState({
						username: '-'
					});
				} else {
					self.setState({
						username: data['username']
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.setState({
					username: '-'
				});
			}
		});
		//获取注册天数
		$.ajax({
			async: true,//异步
			type:"POST",
			cache: false,
			url: "api/user/regdays",
			data: {'params':'{}'},
			dataType: "json",
			success: function(data) {
				if (data['state']=='failed') {
					self.setState({
						days: 0
					});
				} else {
					self.setState({
						days: data['regdays']
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.setState({
					days: 0
				});
			}
		});
    },
    render: function() {
		return (
			  <div className="col">
				<div className="wrapper b-b bg hidden-sm hidden-xs">
				  <div className="h4"><span>帐号信息</span></div>
				</div>
				<div className="wrapper">
				<div className="row clearfix" style={{marginTop:'100px'}}>
					<center>
						<img src={require("../resource/img/user.jpg")} alt="..." style={{width:'128px',height:'128px',borderRadius:'500px'}}></img> 
						<span className="block m-t-sm">
						  <strong className="font-bold text-lt">{this.state.username}</strong> 
						</span>
						<br/>
						<span className="block m-t-sm">
						  <strong className="font-bold text-lt">我们相识已经{this.state.days}天了</strong> 
						</span>
					</center>
				</div>
				</div>
			  </div>
		);
    }
});

module.exports = AccountInfo;