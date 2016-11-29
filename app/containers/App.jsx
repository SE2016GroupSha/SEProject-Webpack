var Add = require( '../containers/Add' );
var PDO = require( '../containers/PDO' );
var View = require( '../containers/View' );
var Test = require( '../containers/Test' );
var AddPDO_new = require('../containers/AddPDO_new')
require( './new_css/animate.css' );
require( './new_css/font-awesome.min.css' );
require( './new_css/simple-line-icons.css' );
require( './new_css/font.css' );
require( './new_css/app.css' );
require( './vendor/jquery/jquery.min.js' );
require( './vendor/jquery/bootstrap.js' );
require( './new_css/wxl_new.css' )
var LOGOImage = require( './img/logo.png' );
var A0 = require( './img/a0.jpg' );
var A1 = require( './img/a1.jpg' );
var A2 = require( './img/a2.jpg' );
var A5 = require( './img/a5.jpg' );
var A3 = require( './img/a3.jpg' );
var A9 = require( './img/a9.jpg' );
var A6 = require( './img/a6.jpg' );
var A7 = require( './img/a7.jpg' );
var A4 = require( './img/a4.jpg' );
//var C4 = require( './img/c4.jpg' );
var C5 = require( './img/c5.jpg' );
/*
 * 
 * <link rel="stylesheet" href="css/bootstrap.css" type="text/css" />*/
var App = React.createClass( {
    getInitialState: function() {
        return {
            index: 0
        };
    },
    indexClickHandle: function( n ) {
        this.setState( {
            index: n
        });
    },
    render: function() {
        var indexTag = ['查看数据', '添加数据', '查看PDO', '添加PDO'];
        var indexs = [];
        var items = [];
        var imag=[];
        var re = require('./img/c4.jpg');
        var p = 'http://http://localhost:8080/'+re;
        //var c4_import = './img/c4.jpg';
        imag.push(<span className="glyphicon glyphicon-road" style={{'color':'rgb(159, 131, 227)'}}> </span>);
        imag.push(<span className="glyphicon glyphicon-edit" style={{'color':'rgb(98, 131, 182)'}}> </span>);
        imag.push(<span className="glyphicon glyphicon-film" style={{'color':'rgb(50, 178, 255)'}}> </span>);
        imag.push(<span className="glyphicon glyphicon-tree-deciduous" style={{'color':'rgb(127, 223, 46)'}}> </span>);
        for ( var i = 0; i < 4; i++ ) {
            indexs.push(
                        <li key={i}>
                        <a  href="javascript:void(0)" onClick={this.indexClickHandle.bind( this, i ) }>
                            <span className="pull-right text-muted">
                                <i className="fa fa-fw fa-angle-right text"></i>
                                <i className="fa fa-fw fa-angle-down text-active"></i>
                            </span>
                            {imag[i]}
                            <span className="font-bold">{indexTag[i]}</span>
                        </a>
                    </li>
           );
            
        }

        switch ( this.state.index ) {
            case 0:
                items.push( <View key={0} /> );
                break;
            case 1:
                items.push( <Add key={1} /> );
                break;
            case 2:
                items.push( <PDO key={2} /> );
                break;
            case 3:
                items.push( <AddPDO_new key={3} /> );
                break;
        }
        +function ($) {
            $(function(){
              // class
              $(document).on('click', '[data-toggle^="class"]', function(e){
                e && e.preventDefault();
                console.log('abc');
                var $this = $(e.target), $class , $target, $tmp, $classes, $targets;
                !$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
                $class = $this.data()['toggle'];
                $target = $this.data('target') || $this.attr('href');
                $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
                $target && ($targets = $target.split(','));
                $classes && $classes.length && $.each($targets, function( index, value ) {
                  if ( $classes[index].indexOf( '*' ) !== -1 ) {
                    var patt = new RegExp( '\\s' + 
                        $classes[index].
                          replace( /\*/g, '[A-Za-z0-9-_]+' ).
                          split( ' ' ).
                          join( '\\s|\\s' ) + 
                        '\\s', 'g' );
                    $($this).each( function ( i, it ) {
                      var cn = ' ' + it.className + ' ';
                      while ( patt.test( cn ) ) {
                        cn = cn.replace( patt, ' ' );
                      }
                      it.className = $.trim( cn );
                    });
                  }
                  ($targets[index] !='#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
                });
                $this.toggleClass('active');
              });

              // collapse nav
              $(document).on('click', 'nav a', function (e) {
                var $this = $(e.target), $active;
                $this.is('a') || ($this = $this.closest('a'));
                
                $active = $this.parent().siblings( ".active" );
                $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
                
                ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
                $this.parent().toggleClass('active');
                
                $this.next().is('ul') && e.preventDefault();

                setTimeout(function(){ $(document).trigger('updateNav'); }, 300);      
              });
            });
          }(jQuery);
        return (
          <div>  
          {/*****************************分割线******************************/}  
          {/************************头部有效展示部分******开始****************/} 
            <nav className="navbar-fixed-top">
                <div className="app-header navbar" style={{ 'backgroundPosition': "50%  -125px" }}>
                    <div className="navbar-header bg-dark">
                        <button className="pull-right visible-xs dk" data-toggle="class:show" data-target=".navbar-collapse">
                            <i className="gclassNamecon glyphicon-cog"></i>
                        </button>
                        <button className="pull-right visible-xs" data-toggle="class:off-screen" data-target=".app-aside" >
                            <i className="glyphicon glyphicon-align-justify"></i>
                        </button>
                        
                        <a href="#/" className="navbar-brand text-lt">
                            <i className="fa-btc"></i>
                            <img src={LOGOImage} alt="." className="hide"/>
                            <span className="hidden-folded m-l-xs">Angulr</span>
                        </a>

                    </div>
                    <div className="collapse pos-rlt navbar-collapse box-shadow bg-white-only">
                        <div className="nav navbar-nav hidden-xs ">
                            <a href="#" className="btn no-shadow navbar-btn wxl-new3" data-toggle="class:app-aside-folded" data-target=".app">
                                <i className="fa fa-dedent fa-fw text"></i>
                                <i className="fa fa-indent fa-fw text-active"></i>
                            </a>
                            <a href className="btn no-shadow navbar-btn wxl-new4" data-toggle="class:show" data-target="#aside-user">
                                <i className="icon-user fa-fw"></i>
                            </a>
                        </div>                       
                        {/*<!-- / link and dropdown -->*/}

                        {/*<!-- nabar right -->*/}
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown wxl-new6">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="icon-bell fa-fw"></i>
                                    <span className="visible-xs-inline">Notifications</span>
                                    <span className="badge badge-sm up bg-danger pull-right-xs">2</span>
                                </a>

                                <div className="dropdown-menu w-xl animated fadeInUp">
                                    <div className="panel bg-white">
                                        <div className="panel-heading b-light bg-light">
                                            <strong>You have <span>2</span> notifications</strong>
                                        </div>
                                        <div className="list-group">
                                            <a href className="media list-group-item">
                                                <span className="pull-left thumb-sm">
                                                    <img src={A0} alt="..." className="img-circle"/>
                                                </span>
                                                <span className="media-body block m-b-none">
                                                    Use awesome animate.css<br/>
                                                    <small className="text-muted">10 minutes ago</small>
                                                </span>
                                            </a>
                                            <a href className="media list-group-item">
                                                <span className="media-body block m-b-none">
                                                    1.0 initial released<br/>
                                                    <small className="text-muted">1 hour ago</small>
                                                </span>
                                            </a>
                                        </div>
                                        <div className="panel-footer text-sm">
                                            <a href className="pull-right"><i className="fa fa-cog"></i></a>
                                            <a href="#notes" data-toggle="class:show animated fadeInRight">See all the notifications</a>
                                        </div>
                                    </div>
                                </div>

                            </li>
                            <li className="dropdown wxl-new5">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle clear" data-toggle="dropdown">
                                    <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                        <img src={A0}alt="..."/>
                                        <i className="on md b-white bottom"></i>
                                    </span>
                                    <span className="hidden-sm hidden-md">John.Smith</span> <b className="caret"></b>
                                </a>

                                <ul className="dropdown-menu animated fadeInRight w">
                                    <li className="wrapper b-b m-b-sm bg-light m-t-n-xs">
                                        <div>
                                            <p>300mb of 500mb used</p>
                                        </div>
                                        <progressbar value="60" className="progress-xs m-b-none bg-white"></progressbar>
                                    </li>
                                    <li>
                                        <a href>
                                            <span className="badge bg-danger pull-right">30%</span>
                                            <span>Settings</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>Profile</a>
                                    </li>
                                    <li>
                                        <a >
                                            <span className="label bg-info pull-right">new </span>
                                            Help
                                        </a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a>Logout</a>
                                    </li>
                                </ul>

                            </li>
                        </ul>

                    </div>

                </div>
            </nav>
            {/************************头部有效展示部分******结束****************/} 
            {/************************头部无效展示部分******开始****************/} 
            <nav>
                <div className="app-header navbar" style={{ 'backgroundPosition': "50%  -125px" }}>
                    <div className="navbar-header bg-dark">
                        <button className="pull-right visible-xs dk" data-toggle="class:show" data-target=".navbar-collapse">
                            <i className="gclassNamecon glyphicon-cog"></i>
                        </button>
                        <button className="pull-right visible-xs" data-toggle="class:off-screen" data-target=".app-aside" >
                            <i className="glyphicon glyphicon-align-justify"></i>
                        </button>

                        <a href="#/" className="navbar-brand text-lt">
                            <i className="fa-btc"></i>
                            <img src={LOGOImage} alt="." className="hide"/>
                            <span className="hidden-folded m-l-xs">Angulr</span>
                        </a>

                    </div>



                    <div className="collapse pos-rlt navbar-collapse box-shadow bg-white-only">

                        <div className="nav navbar-nav hidden-xs">
                            <a href="#" className="btn no-shadow navbar-btn" data-toggle="class:app-aside-folded" data-target=".app">
                                <i className="fa fa-dedent fa-fw text"></i>
                                <i className="fa fa-indent fa-fw text-active"></i>
                            </a>
                            <a href className="btn no-shadow navbar-btn" data-toggle="class:show" data-target="#aside-user">
                                <i className="icon-user fa-fw"></i>
                            </a>
                        </div>

                        <ul className="nav navbar-nav hidden-sm">
                            <li className="dropdown pos-stc">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                    <span>Mega</span>
                                    <span className="caret"></span>
                                </a>
                                <div className="dropdown-menu wrapper w-full bg-white">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="m-l-xs m-t-xs m-b-xs font-bold">Pages <span className="badge badge-sm bg-success">10</span></div>
                                            <div className="row">
                                                <div className="col-xs-6">
                                                    <ul className="list-unstyled l-h-2x">
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Profile</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Post</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Search</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Invoice</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-xs-6">
                                                    <ul className="list-unstyled l-h-2x">
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Price</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Lock screen</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Sign in</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Sign up</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 b-l b-light">
                                            <div className="m-l-xs m-t-xs m-b-xs font-bold">UI Kits <span className="label label-sm bg-primary">12</span></div>
                                            <div className="row">
                                                <div className="col-xs-6">
                                                    <ul className="list-unstyled l-h-2x">
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Buttons</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Icons <span className="badge badge-sm bg-warning">1000+</span></a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Grid</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Widgets</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-xs-6">
                                                    <ul className="list-unstyled l-h-2x">
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Bootstap</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Sortable</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Portlet</a>
                                                        </li>
                                                        <li>
                                                            <a href><i className="fa fa-fw fa-angle-right text-muted m-r-xs"></i>Timeline</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 b-l b-light">
                                            <div className="m-l-xs m-t-xs m-b-sm font-bold">Analysis</div>
                                            <div className="text-center">
                                                <div className="inline">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="fa fa-fw fa-plus visible-xs-inline-block"></i>
                                    <span >New</span> <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a href="#" >Projects</a></li>
                                    <li>
                                        <a href>
                                            <span className="badge bg-info pull-right">5</span>
                                            <span >Task</span>
                                        </a>
                                    </li>
                                    <li><a href >User</a></li>
                                    <li className="divider"></li>
                                    <li>
                                        <a href>
                                            <span className="badge bg-danger pull-right">4</span>
                                            <span >Email</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        {/*<!-- / link and dropdown -->*/}

                        {/* <!-- search form -->*/}
                        <form className="navbar-form navbar-form-sm navbar-left shift"  data-target=".navbar-collapse" role="search" >
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control input-sm bg-light no-border rounded padder" placeholder="Search projects..."/>
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-sm bg-light rounded"><i className="fa fa-search"></i></button>
                                    </span>
                                </div>
                            </div>
                        </form>
                        {/*<!-- / search form -->*/}
                        {/*<!-- nabar right -->*/}
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="icon-bell fa-fw"></i>
                                    <span className="visible-xs-inline">Notifications</span>
                                    <span className="badge badge-sm up bg-danger pull-right-xs">2</span>
                                </a>

                                <div className="dropdown-menu w-xl animated fadeInUp">
                                    <div className="panel bg-white">
                                        <div className="panel-heading b-light bg-light">
                                            <strong>You have <span>2</span> notifications</strong>
                                        </div>
                                        <div className="list-group">
                                            <a href className="media list-group-item">
                                                <span className="pull-left thumb-sm">
                                                    <img src={A0} alt="..." className="img-circle"/>
                                                </span>
                                                <span className="media-body block m-b-none">
                                                    Use awesome animate.css<br/>
                                                    <small className="text-muted">10 minutes ago</small>
                                                </span>
                                            </a>
                                            <a href className="media list-group-item">
                                                <span className="media-body block m-b-none">
                                                    1.0 initial released<br/>
                                                    <small className="text-muted">1 hour ago</small>
                                                </span>
                                            </a>
                                        </div>
                                        <div className="panel-footer text-sm">
                                            <a href className="pull-right"><i className="fa fa-cog"></i></a>
                                            <a href="#notes" data-toggle="class:show animated fadeInRight">See all the notifications</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle clear" data-toggle="dropdown">
                                    <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                        <img src={A0}alt="..."/>
                                        <i className="on md b-white bottom"></i>
                                    </span>
                                    <span className="hidden-sm hidden-md">John.Smith</span> <b className="caret"></b>
                                </a>
                                <ul className="dropdown-menu animated fadeInRight w">
                                    <li className="wrapper b-b m-b-sm bg-light m-t-n-xs">
                                        <div>
                                            <p>300mb of 500mb used</p>
                                        </div>
                                        <progressbar value="60" className="progress-xs m-b-none bg-white"></progressbar>
                                    </li>
                                    <li>
                                        <a href>
                                            <span className="badge bg-danger pull-right">30%</span>
                                            <span>Settings</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>Profile</a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="label bg-info pull-right">new </span>
                                            Help
                                        </a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a>Logout</a>
                                    </li>
                                </ul>

                            </li>
                        </ul>

                    </div>

                </div>
            </nav>
            {/************************头部无效展示部分******结束****************/} 
            {/*<!-- / navbar -->*/}
            {/* <!-- menu -->*/}
            {/************************左侧菜单*************开始****************/} 
            <div className="app-aside hidden-xs bg-dark">
                <div className="aside-wrap">
                    <div className="navi-wrap">
                    {/* <!-- user -->*/}
                        <div className="clearfix hidden-xs text-center hide" id="aside-user">
                            <div className="dropdown wrapper">
                                <a>
                                     <span className="thumb-lg w-auto-folded avatar m-t-sm">
                                            <img src={A0} className="img-full" alt="..."/>
                                        </span>
                                </a>
                                    <a href="#" data-toggle="dropdown" className="dropdown-toggle hidden-folded">
                                        <span className="clear">
                                            <span className="block m-t-sm">
                                                <strong className="font-bold text-lt">John.Smith</strong>
                                                <b className="caret"></b>
                                            </span>
                                            <span className="text-muted text-xs block">Art Director</span>
                                        </span>
                                    </a>
                                    <ul className="dropdown-menu animated fadeInRight w hidden-folded">
                                        <li className="wrapper b-b m-b-sm bg-info m-t-n-xs">
                                            <span className="arrow top hidden-folded arrow-info"></span>
                                            <div>
                                                <p>300mb of 500mb used</p>
                                            </div>
                                            <progressbar value="60" type="white" className="progress-xs m-b-none dker"></progressbar>
                                        </li>
                                        <li>
                                            <a href>Settings</a>
                                        </li>
                                        <li>
                                            <a>Profile</a>
                                        </li>
                                        <li>
                                            <a href>
                                                <span className="badge bg-danger pull-right">3</span>
                                                Notifications
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <a>Logout</a>
                                        </li>
                                    </ul>

                                </div>
                                <div className="line dk hidden-folded"></div>
                            </div>
                            {/* <!-- 左侧树形菜单 -->*/}
                            <nav>
                                <ul className="nav">
                                    <li className="hidden-folded padder m-t m-b-sm text-muted text-xs">
                                        <span > </span><br/>
                                    </li>
                                    {indexs}
                                </ul>
                            </nav>
                            {/*<!-- nav -->*/}
                        </div>
                    </div>
                </div>
                {/************************左侧菜单*************结束****************/} 
                {/************************右侧容器*************开始****************/} 
               <div className="app-content">
                   <div className="wxl-new1 b-t"></div>
                   <a href className="off-screen-toggle hide" data-toggle="class:off-screen" data-target=".app-aside" ></a>
                   <div className="app-content-body fade-in-up">
                       <div className="hbox hbox-auto-xs hbox-auto-sm">
                
             {/************************中部项目内容位置************开始****************/} 
                       
                           <div className="col">
                           <div className="wrapper">
                               {items}
                            </div>
                            </div>     
            {/************************中部项目内容位置************结束****************/}                    
                                
            {/************************右侧项目内容位置************开始****************/} 
                        <div className="col w-lg bg-light lter b-l bg-auto">
                          <div className="wrapper">
                          {/************右侧提示内容样例***开始****/} 
                            <div className="panel b-a">
                              <h4 className="font-thin padder">Latest Tweets</h4>
                              <ul className="list-group">
                                <li className="list-group-item">
                                    <p>Wellcome <a href className="text-info">@Drew Wllon</a> and play this web application template, have fun1 </p>
                                    <small className="block text-muted"><i className="fa fa-fw fa-clock-o"></i> 2 minuts ago</small>
                                </li>
                                <li className="list-group-item">
                                    <p>Morbi nec <a href className="text-info">@Jonathan George</a> nunc condimentum ipsum dolor sit amet, consectetur</p>
                                    <small className="block text-muted"><i className="fa fa-fw fa-clock-o"></i> 1 hour ago</small>
                                </li>
                                <li className="list-group-item">                     
                                    <p><a href className="text-info">@Josh Long</a> Vestibulum ullamcorper sodales nisi nec adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis</p>
                                    <small className="block text-muted"><i className="fa fa-fw fa-clock-o"></i> 2 hours ago</small>
                                </li>
                              </ul>
                            </div>
                            {/************右侧提示内容样例***结束****/} 
                          </div>
                        </div>
                        
                {/************************右侧项目内容位置************结束****************/} 
                        
                     </div>
                  </div>
                </div>
                {/*<!-- /content -->*/}
               
                    {/*<!-- aside right -->*/}
                <div className="app-aside-right pos-fix no-padder w-md w-auto-xs bg-white b-l animated fadeInRight hide">
                  <div className="vbox">
                    <div className="wrapper b-b b-t b-light m-b">
                      <a href className="pull-right text-muted text-md" data-toggle="class:show" data-target=".app-aside-right"><i className="icon-close"></i></a>
                      Chat
                    </div>
                    <div className="row-row">
                      <div className="cell">
                        <div className="cell-inner padder">
                          
                          <div className="m-b">
                            <a href className="pull-left thumb-xs avatar"><img src={A2} alt="..."/></a>
                            <div className="clear">
                              <div className="pos-rlt wrapper-sm b b-light r m-l-sm">
                                <span className="arrow left pull-up"></span>
                                <p className="m-b-none">Hi John, What's up...</p>
                              </div>
                              <small className="text-muted m-l-sm"><i className="fa fa-ok text-success"></i> 2 minutes ago</small>
                            </div>
                          </div>
                          <div className="m-b">
                            <a href className="pull-right thumb-xs avatar">
                          <img src={A3} className="img-circle" alt="..."/>
                              </a>
                            <div className="clear">
                              <div className="pos-rlt wrapper-sm bg-light r m-r-sm">
                                <span className="arrow right pull-up arrow-light"></span>
                                <p className="m-b-none">Lorem ipsum dolor :)</p>
                              </div>
                              <small className="text-muted">1 minutes ago</small>
                            </div>
                          </div>
                          <div className="m-b">
                            <a href className="pull-left thumb-xs avatar">
                            		<img src={A2} alt="..."/></a>
                            <div className="clear">
                              <div className="pos-rlt wrapper-sm b b-light r m-l-sm">
                                <span className="arrow left pull-up"></span>
                                <p className="m-b-none">Great!</p>
                              </div>
                              <small className="text-muted m-l-sm"><i className="fa fa-ok text-success"></i>Just Now</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wrapper m-t b-t b-light">
                      <form className="m-b-none">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Say something"/>
                          <span className="input-group-btn">
                            <button className="btn btn-default" type="button">SEND</button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
               {/* <!-- / aside right -->*/}
                
             

            </div>


        );

                }
});

module.exports = App;
