var md5 = require('js-md5');

var Login = React.createClass( {
    propTypes: {
		LoginHandle: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
			username: '',
			password: '',
			isMsg: false,
			msgStr: '',
			isQuerying: false
        };
    },
    componentDidMount: function() {

    },
	inputHandle: function(id, event) {
		switch (id) {
		case 'username':
			this.setState({
				username: event.target.value
			});
			break;
		case 'password':
			this.setState({
				password: event.target.value
			});
			break;
		default:
			break;
		}
	},
	regButtonHandle: function() {
		$(this.refs.loginDOM1).addClass('animated flipOutY');
		$(this.refs.loginDOM2).addClass('animated flipOutY');
		$(this.refs.loginDOM3).addClass('animated flipOutY');
		$(this.refs.loginDOM4).addClass('animated flipOutY');
		$(this.refs.loginDOM5).addClass('animated flipOutY');
		$(this.refs.loginDOM6).addClass('animated fadeOut');
		$(this.refs.loginDOM5).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.props.LoginHandle.bind(null, 'switch_reg'));
	},
	loginButtonHandle: function() {
		var self = this;
		self.props.LoginHandle('login_success');
		//判断空用户名，空密码
		if (this.state.username=='') {
			this.setState({
				isMsg: true,
				msgStr: '用户名不能为空'
			});
			return;
		}
		if (this.state.password=='') {
			this.setState({
				isMsg: true,
				msgStr: '密码不能为空'
			});
			return;
		}
		
		//从这里开始，是异步调用
		
		//1.开始用户登录
		userLogin();
		
		//用户登录
		function userLogin() {
			//禁按钮
			self.setState({
				isQuerying: true
			});
			//构造参数
			//{"id":"-1", "time":1480703552089, "name":"白爷", "pwhash":"5e007e7046425c92111676b1b0999f12"}
			var userParam = {};
			var user = {'id':'-1'};
			user['time'] = (new Date()).getTime();
			user['name'] = self.state.username;
			user['pwhash'] = md5(self.state.password);
			userParam['user'] = user;
			$.ajax({
				async: true,//异步
				type:"POST",
				cache: false,
				url: "api/user/login",
				data: {'params':JSON.stringify(userParam)},
				dataType: "json",
				success: function(data) {
					if (data['state']=='failed') {
						self.setState({
							isMsg: true,
							msgStr: '用户名或密码错误',
							isQuerying: false //开按钮
						});
					} else {
						//2.开始提示登录成功
						regSuccess();
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
		
		
		//提示登录成功
		function regSuccess() {
			setTimeout(function() {
				self.setState({
					isMsg: true,
					msgStr: '登录成功!'
				});
				$(self.refs.loginDOM2).addClass('animated flipInY');
			}, 0);
			
			setTimeout(function() {
				self.props.LoginHandle('login_success');
			}, 1500);
		}
	},
	enterHandle: function(event) {
		if(event.keyCode==13)
        {
            this.loginButtonHandle();
        }
	},
    render: function() {
		return (
			<div className="app-header-fixed">
			  <div className="fade-in-right-big smooth ng-scope">
				<div className="container w-xxl w-auto-xs">
				  <a href="javascript:void(0)" className="navbar-brand block m-t" style={{fontSize:'30px',fontWeight:'normal'}}><i className="fa fa-cube" style={{color:'#7266BA'}}></i>&nbsp;应用名</a>
				  <div className="m-b-lg">
					<div className="wrapper text-center">
					  <strong></strong>
					</div>
					<form name="form" className="form-validation" onKeyDown={this.enterHandle}>
					  <div className="list-group list-group-sm animated flipInY" ref='loginDOM1'>
						<div className="list-group-item">
						   <input type="text" placeholder="用户名" className="form-control no-border" onChange={this.inputHandle.bind(null, 'username')}></input>
						</div>
						<div className="list-group-item">
						   <input type="password" placeholder="密码" className="form-control no-border" onChange={this.inputHandle.bind(null, 'password')}></input>
						</div>
					  </div>
					  <div className={(this.state.isMsg?'':'hide')+" "} style={{marginBottom:'15px'}} ref='loginDOM2'>
						  <i className="fa fa-exclamation-circle" style={{color:'#7266BA'}}></i>
						  <span style={{color:'#7266BA'}}>&nbsp;&nbsp;{this.state.msgStr}</span>
					  </div>
					  <button type="button" className="btn btn-lg btn-primary btn-block animated flipInY" style={{cursor:'pointer'}} disabled={this.state.isQuerying?'disabled':''} onClick={this.state.isQuerying?null:this.loginButtonHandle} ref='loginDOM3'>登录</button>
					  <div className="line line-dashed" style={{paddingBottom:'20px'}}></div>
				  
					  <p className="text-center animated flipInY" ref='loginDOM4'><small>还没有帐号?</small></p>
					  <a className="btn btn-lg btn-default btn-block animated flipInY" style={{cursor:'pointer'}} disabled={this.state.isQuerying?'disabled':''} onClick={this.state.isQuerying?null:this.regButtonHandle} ref='loginDOM5'>注册</a>
					</form>
				  </div>
				  <div className="text-center" style={{fontFamily:'Source Sans Pro'}}>
					<p className="animated fadeIn" ref='loginDOM6'>
					  <small className="text-muted">SEGroup Sha 2016-2017</small>
					</p>
				  </div>
				</div>
			  </div>
			</div>
		);
    }
});

module.exports = Login;
