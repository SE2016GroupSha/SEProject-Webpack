var md5 = require('js-md5');

var AccountPassword = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {
			oldPassword: '',
			newPassword1: '',
			newPassword2: '',
			isMsg: false,
			msgStr: '',
			isQuerying: false
        };
    },
    componentDidMount: function() {
		
    },
	changeButtonHandle: function() {
		var self = this;
		
		//判断空原密码，空新密码，不相符新密码
		if (this.state.oldPassword=='') {
			this.setState({
				isMsg: true,
				msgStr: '原密码不能为空'
			});
			return;
		}
		if (this.state.newPassword1=='') {
			this.setState({
				isMsg: true,
				msgStr: '新密码不能为空'
			});
			return;
		}
		if (this.state.newPassword1!=this.state.newPassword2) {
			this.setState({
				isMsg: true,
				msgStr: '两次输入的新密码不一致'
			});
			return;
		}
		
		//从这里开始，是异步调用，以数字为起始的注释下面的语句，是真正的函数调用，分为2步
		
		//1.开始修改密码
		changePassword();
		
		//修改密码
		function changePassword() {
			//禁按钮
			self.setState({
				isQuerying: true
			});
			//构造参数
			var pwhashParam = {};
			pwhashParam['oldpwhash'] = md5(self.state.oldPassword);
			pwhashParam['newpwhash'] = md5(self.state.newPassword1);
			$.ajax({
				async: true,//异步
				type:"POST",
				cache: false,
				url: "api/user/changepasswd",
				data: {'params':JSON.stringify(pwhashParam)},
				dataType: "json",
				success: function(data) {
					if (data['state']=='failed') {
						self.setState({
							isMsg: true,
							msgStr: '原密码错误',
							isQuerying: false //开按钮
						});
					} else {
						//2.开始提示修改密码成功
						changePasswordSuccess();
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					self.setState({
						isMsg: true,
						msgStr: '网络连接失败',
						isQuerying: false //开按钮
					});
				}
			});
		}
		
		//提示修改密码成功
		function changePasswordSuccess() {
			setTimeout(function() {
				self.setState({
					isMsg: true,
					msgStr: '修改成功!'
				});
				$(self.refs.msgDOM).addClass('animated bounceIn');
			}, 0);
			
			setTimeout(function() {
				self.setState({
					oldPassword: '',
					newPassword1: '',
					newPassword2: '',
					isMsg: false,
					msgStr: '',
					isQuerying: false
				});
			}, 2000);
		}
	},
	inputHandle: function(id, event) {
		switch (id) {
		case 'oldPassword':
			this.setState({
				oldPassword: event.target.value
			});
			break;
		case 'newPassword1':
			this.setState({
				newPassword1: event.target.value
			});
			break;
		case 'newPassword2':
			this.setState({
				newPassword2: event.target.value
			});
			break;
		default:
			break;
		}
	},
	enterHandle: function(event) {
		if(event.keyCode==13)
        {
            this.changeButtonHandle();
        }
	},
    render: function() {
		return (
			  <div className="col">
				<div className="wrapper b-b bg hidden-sm hidden-xs">
				  <div className="h4"><span>修改密码</span></div>
				</div>
				<div className="wrapper">
				  <div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<div className="panel panel-default">
							<div className="panel-heading font-bold"><span>修改密码</span></div>
							<div className="panel-body">
								<div className="col-sm-10 col-sm-offset-1">
								  <form role="form" className="ng-pristine ng-valid" onKeyDown={this.enterHandle}>
									<div className="form-group">
									  <label><span>原密码</span></label>
									  <input type="password" className="form-control" value={this.state.oldPassword} onChange={this.inputHandle.bind(null, 'oldPassword')}></input>
									</div>
									<div className="form-group">
									  <label><span>新密码</span></label>
									  <input type="password" className="form-control" value={this.state.newPassword1} onChange={this.inputHandle.bind(null, 'newPassword1')}></input>
									</div>
									<div className="form-group">
									  <label><span>再次输入</span></label>
									  <input type="password" className="form-control" value={this.state.newPassword2} onChange={this.inputHandle.bind(null, 'newPassword2')}></input>
									</div>
									{this.state.isMsg?null:
									<br/>
									}
									<div className={"form-group "+(this.state.isMsg?'':'hide')} ref='msgDOM'>
										<label>
											<i className="fa fa-exclamation-circle" style={{color:'#7266BA'}}></i>
											<span style={{color:'#7266BA'}}>&nbsp;{this.state.msgStr}</span>
										</label>
									</div>
									<button type="button" className="btn btn-sm btn-primary" style={{cursor:'pointer'}} disabled={this.state.isQuerying?'disabled':''} onClick={this.state.isQuerying?null:this.changeButtonHandle}>确认修改</button>
								  </form>
								</div>
							</div>
						</div>
					</div>
				  </div>
				</div>
			  </div>
		);
    }
});

module.exports = AccountPassword;