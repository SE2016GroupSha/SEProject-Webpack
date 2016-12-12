var md5 = require('js-md5');

var Reg = React.createClass( {
    propTypes: {
		RegHandle: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
			username: '',
			password1: '',
			password2: '',
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
		case 'password1':
			this.setState({
				password1: event.target.value
			});
			break;
		case 'password2':
			this.setState({
				password2: event.target.value
			});
			break;
		default:
			break;
		}
	},
	loginButtonHandle: function() {
		$(this.refs.regDOM1).addClass('animated flipOutY');
		$(this.refs.regDOM2).addClass('animated flipOutY');
		$(this.refs.regDOM3).addClass('animated flipOutY');
		$(this.refs.regDOM4).addClass('animated flipOutY');
		$(this.refs.regDOM5).addClass('animated flipOutY');
		$(this.refs.regDOM6).addClass('animated fadeOut');
		$(this.refs.regDOM5).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.props.RegHandle.bind(null, 'switch_login'));
	},
	regButtonHandle: function() {
		var self = this;
		
		//判断空用户名，空密码，不相符密码
		if (this.state.username=='') {
			this.setState({
				isMsg: true,
				msgStr: '用户名不能为空'
			});
			return;
		}
		if (this.state.password1=='') {
			this.setState({
				isMsg: true,
				msgStr: '密码不能为空'
			});
			return;
		}
		if (this.state.password1!=this.state.password2) {
			this.setState({
				isMsg: true,
				msgStr: '两次输入的密码不一致'
			});
			return;
		}
		
		//从这里开始，是一串丑陋的异步调用，以数字为起始的注释下面的语句，是真正的函数调用，分为3步
		
		//1.开始判断重复用户名
		checkName();
		
		//判断重复用户名
		function checkName() {
			//禁按钮
			self.setState({
				isQuerying: true
			});
			//构造参数
			var nameParam = {'name': self.state.username};
			$.ajax({
				async: true,//异步
				type:"POST",
				cache: false,
				url: "api/user/checkname",
				data: {'params':JSON.stringify(nameParam)},
				dataType: "json",
				success: function(data) {
					if (data['valid']=='false') {
						self.setState({
							isMsg: true,
							msgStr: '用户名已存在',
							isQuerying: false //开按钮
						});
					} else {
						//2.开始新用户注册
						reg();
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
		
		
		
		//新用户注册
		function reg() {
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
			user['pwhash'] = md5(self.state.password1);
			userParam['user'] = user;
			$.ajax({
				async: true,//异步
				type:"POST",
				cache: false,
				url: "api/user/reg",
				data: {'params':JSON.stringify(userParam)},
				dataType: "json",
				success: function(data) {
					if (data['state']=='failed') {
						self.setState({
							isMsg: true,
							msgStr: '注册失败',
							isQuerying: false //开按钮
						});
					} else {
						//3.开始提示注册成功
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
		
		
		//提示注册成功
		function regSuccess() {
			setTimeout(function() {
				self.setState({
					isMsg: true,
					msgStr: '注册成功!'
				});
				$(self.refs.regDOM2).addClass('animated flipInY');
			}, 0);
			
			setTimeout(function() {
				$(self.refs.regDOM1).addClass('animated flipOutY');
				$(self.refs.regDOM2).addClass('animated flipOutY');
				$(self.refs.regDOM3).addClass('animated flipOutY');
				$(self.refs.regDOM4).addClass('animated flipOutY');
				$(self.refs.regDOM5).addClass('animated flipOutY');
				$(self.refs.regDOM6).addClass('animated fadeOut');
				$(self.refs.regDOM5).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', self.props.RegHandle.bind(null, 'reg_success'));
			}, 1500);
		}
	},
	enterHandle: function(event) {
		if(event.keyCode==13)
        {
            this.regButtonHandle();
        }
	},
    render: function() {
		return (
			<div className="app-header-fixed">
			  <div className="fade-in-right-big smooth ng-scope">
				<div className="container w-xxl w-auto-xs">
				  <a href="javascript:void(0)" className="navbar-brand block m-t" style={{fontSize:'30px',fontWeight:'normal'}}><i className="fa fa-cube" style={{color:'#7266BA'}}></i>&nbsp;足迹</a>
				  <div className="m-b-lg">
					<div className="wrapper text-center">
					  <strong></strong>
					</div>
					<form name="form" className="form-validation" onKeyDown={this.enterHandle}>
					  <div className="list-group list-group-sm animated flipInY" ref='regDOM1'>
						<div className="list-group-item">
						  <input type="text" placeholder="用户名" className="form-control no-border" onChange={this.inputHandle.bind(null, 'username')}></input>
						</div>
						<div className="list-group-item">
						  <input type="password" placeholder="密码" className="form-control no-border" onChange={this.inputHandle.bind(null, 'password1')}></input>
						</div>
						<div className="list-group-item">
						   <input type="password" placeholder="重复密码" className="form-control no-border" onChange={this.inputHandle.bind(null, 'password2')}></input>
						</div>
					  </div>
					  <div className={(this.state.isMsg?'':'hide')+" "} style={{marginBottom:'15px'}} ref='regDOM2'>
						  <i className="fa fa-exclamation-circle" style={{color:'#7266BA'}}></i>
						  <span style={{color:'#7266BA'}}>&nbsp;&nbsp;{this.state.msgStr}</span>
					  </div>
					  <button type="button" className="btn btn-lg btn-primary btn-block animated flipInY" style={{cursor:'pointer'}} disabled={this.state.isQuerying?'disabled':''} onClick={this.state.isQuerying?null:this.regButtonHandle} ref='regDOM3'>注册</button>
					  <div className="line line-dashed" style={{paddingBottom:'20px'}}></div>
				  
					  <p className="text-center animated flipInY" ref='regDOM4'><small>已经拥有帐号?</small></p>
					  <a className="btn btn-lg btn-default btn-block animated flipInY" style={{cursor:'pointer'}} disabled={this.state.isQuerying?'disabled':''} onClick={this.state.isQuerying?null:this.loginButtonHandle} ref='regDOM5'>登录</a>
					</form>
				  </div>
				  <div className="text-center" style={{fontFamily:'Source Sans Pro'}}>
					<p className="animated fadeIn" ref='regDOM6'>
					  <small className="text-muted">SEGroup Sha 2016-2017</small>
					</p>
				  </div>
				</div>
			  </div>
			</div>
		);
    }
});

module.exports = Reg;