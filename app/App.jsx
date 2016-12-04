//var Add = require( '../containers/Add' );

var App = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {
			
        };
    },
    componentDidMount: function() {
		for (var i=1; i<=4; i++) {
			$(this.refs['dataToggleClass' + i]).bind("click", this.dataToggleClassBind);
		}
		for (var i=1; i<=9; i++) {
			$(this.refs['navA' + i]).bind("click", this.navCollapseBind);
		}
    },
	dataToggleClassBind: function(e) {
        e && e.preventDefault();
        var $this = $(e.target), $class , $target, $tmp, $classes, $targets;
        !$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
        $class = $this.data()['toggle'];
        $target = $this.data('target') || $this.attr('href');
        $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
        $target && ($targets = $target.split(','));
        $classes && $classes.length && $.each($targets, function(index, value) {
			if ($classes[index].indexOf('*') !== -1) {
				var patt = new RegExp('\\s' + $classes[index].replace( /\*/g, '[A-Za-z0-9-_]+' ).split( ' ' ).join( '\\s|\\s' ) + '\\s', 'g');
				$($this).each(function (i, it) {
					var cn = ' ' + it.className + ' ';
					while (patt.test(cn)) {
					  cn = cn.replace(patt, ' ');
					}
					it.className = $.trim(cn);
				});
			}
			($targets[index] !='#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
		});
        $this.toggleClass('active');
    },
	navCollapseBind: function(e) {
        var $this = $(e.target), $active;
        $this.is('a') || ($this = $this.closest('a'));
        $active = $this.parent().siblings( ".active" );
        $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
        ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
        $this.parent().toggleClass('active');
        $this.next().is('ul') && e.preventDefault();
        setTimeout(function(){ $(document).trigger('updateNav'); }, 300);
    },
    render: function() {
		return(
		  <div className="app-header-fixed">

			{/* navbar */}
			<div className="app-header navbar">
			
			  {/* navbar header */}
			  <div className="navbar-header bg-dark">
				<button className="pull-right visible-xs dk" data-toggle="class:show" data-target=".navbar-collapse" ref="dataToggleClass1">
				  <i className="glyphicon glyphicon-cog"></i>
				</button>
				<button className="pull-right visible-xs" data-toggle="class:off-screen" data-target=".app-aside" ref="dataToggleClass2">
				  <i className="glyphicon glyphicon-align-justify"></i>
				</button>
				{/* brand */}
				<a href="javascript:void(0)" className="navbar-brand text-lt">
				  <i className="fa fa-btc"></i>
				  <img src={require('../resource/img/logo.png')} alt="." className="hide"></img>
				  <span className="hidden-folded m-l-xs">项目主页</span>
				</a>
				{/* /brand */}
			  </div>
			  {/* /navbar header */}

			  {/* navbar collapse */}
			  <div className="collapse pos-rlt navbar-collapse box-shadow bg-white-only">
				{/* buttons */}
				<div className="nav navbar-nav hidden-xs">
				  <a href="javascript:void(0)" className="btn no-shadow navbar-btn" data-toggle="class:app-aside-folded" data-target=".app" ref="dataToggleClass3">
					<i className="fa fa-dedent fa-fw text"></i>
					<i className="fa fa-indent fa-fw text-active"></i>
				  </a>
				  <a href className="btn no-shadow navbar-btn" data-toggle="class:show" data-target="#aside-user" ref="dataToggleClass4">
					<i className="icon-user fa-fw"></i>
				  </a>
				</div>
				{/* /buttons */}

				{/* nabar right */}
				<ul className="nav navbar-nav navbar-right">
				  <li className="dropdown">
					<a href="javascript:void(0)" className="dropdown-toggle clear" data-toggle="dropdown">
					  <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
						<img src={require('../resource/img/user.jpg')} alt="..."></img>
					  </span>
					  <span className="hidden-sm hidden-md">sesha</span> <b className="caret"></b>
					</a>
					{/* dropdown */}
					<ul className="dropdown-menu animated fadeInRight w">
					  <li>
						<a>帐号与安全</a>
					  </li>
					  <li className="divider"></li>
					  <li>
						<a>退出</a>
					  </li>
					</ul>
					{/* /dropdown */}
				  </li>
				</ul>
				{/* /navbar right */}
			  </div>
			  {/* /navbar collapse */}
			  
			</div>
			{/* /navbar */}

			{/* menu */}
			<div className="app-aside hidden-xs bg-dark">
			  <div className="aside-wrap">
				<div className="navi-wrap">
				  {/* user */}
				  <div className="clearfix hidden-xs text-center hide" id="aside-user">
					<div className="dropdown wrapper">
					  <a>
						<span className="thumb-lg w-auto-folded avatar m-t-sm">
						  <img src={require('../resource/img/user.jpg')} className="img-full" alt="..."></img>
						</span>
					  </a>
					  <a href="javascript:void(0)" className="hidden-folded">
						<span className="clear">
						  <span className="block m-t-sm">
							<strong className="font-bold text-lt">sesha</strong> 
						  </span>
						</span>
					  </a>
					</div>
					<div className="line dk hidden-folded"></div>
				  </div>
				  {/* /user */}

				  {/* 左侧树形菜单 */}
				  <nav className="navi">
					<ul className="nav">
					  <li className="hidden-folded padder m-t m-b-sm text-muted text-xs">
						<span>操作中心</span>
					  </li>
					  <li>
						<a ref="navA1">
						  <i className="glyphicon glyphicon-calendar icon text-info-dker"></i>
						  <span>轨迹</span>
						</a>
					  </li>
					  <li>
						<a ref="navA2">
						  <i className="glyphicon glyphicon-envelope icon text-info-lter"></i>
						  <span>查找</span>
						</a>
					  </li>
					  <li>
						<a href className="auto" ref="navA3">      
						  <span className="pull-right text-muted">
							<i className="fa fa-fw fa-angle-right text"></i>
							<i className="fa fa-fw fa-angle-down text-active"></i>
						  </span>
						  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>
						  <span>记录</span>
						</a>
						<ul className="nav nav-sub dk">
						  <li>
							<a ref="navA4">
							  <span>添加记录</span>
							</a>
						  </li>
						  <li>
							<a ref="navA5">
							  <span>查看记录</span>
							</a>
						  </li>
						</ul>
					  </li>
					  <li>
						<a href className="auto" ref="navA6">
						  <span className="pull-right text-muted">
							<i className="fa fa-fw fa-angle-right text"></i>
							<i className="fa fa-fw fa-angle-down text-active"></i>
						  </span>
						  <i className="glyphicon glyphicon-th-large icon text-success"></i>
						  <span>模板</span>
						</a>
						<ul className="nav nav-sub dk">
						  <li>
							<a ref="navA7">
							  <span>添加模板</span>
							</a>
						  </li>
						  <li>
							<a ref="navA8">
							  <span>查看模板</span>
							</a>
						  </li>
						</ul>
					  </li>

					  <li className="line dk hidden-folded"></li>

					  <li className="hidden-folded padder m-t m-b-sm text-muted text-xs">          
						<span>用户中心</span>
					  </li>  
					  <li>
						<a ref="navA9">
						  <i className="icon-user icon text-success-lter"></i>
						  <span>帐号与安全</span>
						</a>
					  </li>
					</ul>
				  </nav>
				  {/*nav */}
				  
				</div>
			  </div>
			</div>
			{/* /menu */}

			{/* content */}
			<div className="app-content">
			  <div className="app-content-body fade-in-up">
				  <div className="hbox hbox-auto-xs hbox-auto-sm">
				  
				  </div>
			  </div>
			</div>
			{/* /content */}

			{/* footer */}
			<div className="app-footer wrapper b-t bg-light">
			  <span className="pull-right"><a href="#app" className="m-l-sm text-muted"><i className="fa fa-long-arrow-up"></i></a></span>
			  <center>&copy; 2016 Copyright</center>
			</div>
			{/* /footer */}
		  </div>
		);
    }
});

module.exports = App;
