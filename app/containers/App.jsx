var Add = require( '../containers/Add' );
var PDO = require( '../containers/PDO' );
var View = require( '../containers/View' );
var Test = require( '../containers/Test' );
require( './new_css/style.css' );
require( './new_css/animate.css' );
var AddPDO_new = require( '../containers/AddPDO_new' );

var oneImage = require( './new_images/logo.png' );
var twoImage = require( './new_images/scroll.png' );
var Image3 = require( './new_images/shape.png' );

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

        return (
            <div>
                <header id="HOME" style={{ 'backgroundPosition': "50%  -125px" }}>

                    <div className="section_overlay">
                        <nav className="navbar navbar-default navbar-fixed-top">
                            <div className="container">

                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                    <a className="navbar-brand" href="#"><img src={oneImage} alt=""/></a>
                                </div>


                                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <ul className="nav navbar-nav navbar-right">
                                        <li><a href="#View">展示数据 </a></li>
                                        <li><a href="#Add">添加数据</a></li>
                                        <li><a href="#Show-PDO">展示PDO</a></li>
                                        <li><a href="#Add-PDO">添加PDO</a></li>
                                        <li><a href="#WORK"> </a></li>
                                        <li><a href="#CONTACT"> </a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <div className="home_text wow fadeInUp animated">
                                        <h2>it’s abdullah noman</h2>
                                        <p>a user interface and user experience specialist</p>
                                        <img src={Image3} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <div className="scroll_down">
                                        <a href="#View"><img src={twoImage} alt=""/></a>
                                        <h4>Scroll Down</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>
                <section className="services" id="View">
                    <div className="container">
                        <div className="col-md-12 text-center">
                            <div className="about_title">
                                <h2>展示数据</h2>
                                <img src={Image3} alt=""/>
                            </div>
                        </div>
                        <View/>
                    </div>
                </section>

                <section className="services" id="Add">
                    <div className="container">
                        <div className="col-md-12 text-center">
                            <div className="about_title">
                                <h2>添加数据</h2>
                                <img src={Image3} alt=""/>
                            </div>
                        </div>
                        <Add/>
                    </div>
                </section>
                <section className="services" id="Show-PDO">
                    <div className="container">
                        <div className="col-md-12 text-center">
                            <div className="about_title">
                                <h2>展示PDO</h2>
                                <img src={Image3} alt=""/>
                            </div>
                        </div>
                        <PDO/>
                    </div>
                </section>
                <section className="services" id="Add-PDO">
                    <div className="container">
                        <div className="col-md-12 text-center">
                            <div className="about_title">
                                <h2>添加PDO</h2>
                                <img src={Image3} alt=""/>
                            </div>
                        </div>
                        <AddPDO_new/>
                    </div>
                </section>
                {/*<section className="services" id="SERVICE">
                    <div className="container">
                        <div className="col-md-12 text-center">
                            <div className="about_title">
                                <h2>测试压面</h2>
                                <img src={Image3} alt=""/>
                            </div>
                        </div>
                        <Test key={3} /> 
                    </div>
                </section>*/}
                <footer>
                    <div className="container">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <div className="footer_logo   wow fadeInUp animated">
                                        <img src={oneImage} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center   wow fadeInUp animated">
                                    <div className="social">
                                        <h2>Follow Me on Here</h2>
                                        <ul className="icon_list">
                                            <li><a href=""target="_blank">
                                                <span className="glyphicon glyphicon-home" />
                                            </a></li>
                                            <li><a href=""target="_blank">
                                                <span className="glyphicon glyphicon-envelope" />
                                            </a></li>
                                            <li><a href="">
                                                <span className="glyphicon glyphicon-user" />
                                            </a></li>
                                            <li><a href="">
                                                <span className="glyphicon glyphicon-tags" />
                                            </a></li>
                                            <li><a href=""target="_blank">
                                                <span className="glyphicon glyphicon-registration-mark" />
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </footer>
            </div>
        );
    }
});

module.exports = App;
