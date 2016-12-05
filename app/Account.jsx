var AccountPassword = require('./AccountPassword');
var AccountInfo = require('./AccountInfo');

var Account = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {
			currentViewIndex: 0,
			views: [<AccountInfo/>, <AccountPassword/>]
        };
    },
    componentDidMount: function() {
		$(this.refs.optButton).bind('click', this.dropdownMenuBind);
    },
	dropdownMenuBind: function(e) {
        e && e.preventDefault();
		var button = $(this.refs.optButton);
		var menu = $(this.refs.optMenu);
        if (button.hasClass('active')) {
		    button.removeClass('active');
			menu.removeClass('show');
		} else {
		    button.addClass('active');
		    menu.addClass('show');
		}
    },
	menuHandle: function(index) {
		this.setState({
			currentViewIndex: index
		});
	},
    render: function() {
		return (
		  <div className="app-content">
			<div className="app-content-body fade-in-up">
				<div className="hbox hbox-auto-xs hbox-auto-sm">
				  <div className="col w-md bg-light dk b-r bg-auto">
					<div className="wrapper b-b bg">
					  <button className="btn btn-sm btn-default pull-right visible-sm visible-xs" ref="optButton"><i className="fa fa-bars"></i></button>
					  <div className="h4"><span>选项</span></div>
					</div>
					<div className="wrapper hidden-sm hidden-xs" ref="optMenu">
					  <ul className="nav nav-pills nav-stacked nav-sm">
						<li className={this.state.currentViewIndex==0?'active':''}>
						  <a className="" href="javascript:void(0)" onClick={this.menuHandle.bind(null, 0)}>
							帐号信息
						  </a>
						</li>
						<li className={this.state.currentViewIndex==1?'active':''}>
						  <a className="" href="javascript:void(0)" onClick={this.menuHandle.bind(null, 1)}>
							修改密码
						  </a>
						</li>
					  </ul>
					</div>
				  </div>
				  
				  {this.state.views[this.state.currentViewIndex]}

				</div>
			</div>
		  </div>
		);
    }
});

module.exports = Account;