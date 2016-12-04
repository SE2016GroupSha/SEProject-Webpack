var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var Basic = require('./Basic');
var Login = require('./Login');
var Reg = require('./Reg');

var App = React.createClass({
    getInitialState: function() {
        return {
			isView: false,
			isLogin: false,
			isReg: false
        };
    },
    componentDidMount: function() {
		if (this.checkLogin()) {
			this.setState({
				isView: true,
				isLogin: false,
				isReg: false
			});
		} else {
			this.setState({
				isView: false,
				isLogin: true,
				isReg: false
			});
		}
    },
	checkLogin: function() {
		var state = false;
		$.ajax({
			async: false,//阻塞
			type:"POST",
			cache: false,
			url: "api/user/checklogin",
			data: {'params':'{}'},
			dataType: "json",
			success: function(data) {
				if (data['state']=='success') {
					state = true;
				} else {
					state = false;
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				state = false;
			}
		});
		return state;
	},
	BasicHandle: function(msg) {
		switch (msg) {
		case 'logout': 
			this.setState({
				isView: false,
				isLogin: true,
				isReg: false
			});
			break;
		default:
			break;
		}
	},
	LoginHandle: function(msg) {
		switch (msg) {
		case 'switch_reg': 
			this.setState({
				isView: false,
				isLogin: false,
				isReg: true
			});
			break;
		case 'login_success': 
			this.setState({
				isView: true,
				isLogin: false,
				isReg: false
			});
			break;
		default:
			break;
		}
	},
	RegHandle: function(msg) {
		switch (msg) {
		case 'switch_login': 
			this.setState({
				isView: false,
				isLogin: true,
				isReg: false
			});
			break;
		case 'reg_success': 
			this.setState({
				isView: false,
				isLogin: true,
				isReg: false
			});
			break;
		default:
			break;
		}
	},
    render: function() {
		var item = {};
		if (this.state.isView) {
			item = (<Basic BasicHandle={this.BasicHandle}/>);
		} else if (this.state.isLogin) {
			item = (<Login LoginHandle={this.LoginHandle}/>);
		} else if (this.state.isReg) {
			item = (<Reg RegHandle={this.RegHandle}/>);
		} else {
			item = (<div>Error</div>);
		}
		return (
			<div>
				{item}
			</div>
		);
    }
});

module.exports = App;
