var Add = require('../containers/Add');
var PDO = require('../containers/PDO');
var View = require('../containers/View');
var Test = require('../containers/Test');

var App = React.createClass({
	getInitialState: function () {
		return { 	
				index: 0
		};
	},
	indexClickHandle: function (n) {
		this.setState({
			index: n
		});
	},
	render: function () {
		var indexTag = ['查看数据', '添加数据', '数据模板', '测试压面'];
		var indexs = [];
		var items = [];
		
		for (var i=0; i<4; i++) {
			if (this.state.index == i) {
				indexs.push(<li key={i} className="active"><a href="javascript:void(0)" onClick={this.indexClickHandle.bind(this, i)}>{indexTag[i]}</a></li>);
			} else {
				indexs.push(<li key={i}><a href="javascript:void(0)" onClick={this.indexClickHandle.bind(this, i)}>{indexTag[i]}</a></li>);
			}
		}
		
		switch (this.state.index) {
		case 0: 
			items.push(<View key={0} />);
			break;
		case 1: 
			items.push(<Add key={1} />);
			break;
		case 2: 
			items.push(<PDO key={2} />);
			break;
		case 3: 
			items.push(<Test key={3} />);
			break;
		}
		
		return (
				<div style={{backgroundColor: "#fff"}}>
				<div className="container">
					<div className="row clearfix">
						<div className="col-xs-12 column">
							<div className="row clearfix">
							{/*<div className="col-xs-1 column">
							</div>*/}
								<div className="col-xs-10 column">
									<div className="row clearfix">
										<div className="col-xs-12 column">
											<div className="page-header">
												<h1>
													项目<small>原型版本</small>
												</h1>
											</div>
										</div>
									</div>
									<div className="row clearfix">
										<div className="col-xs-2 column">
											<ul className="nav nav-stacked nav-pills">
												{indexs}
											</ul>
										</div>
										<div className="col-xs-10 column">
											{items}
										</div>
                                </div>
								</div>
								<div className="col-xs-1 column">
								</div>
							</div>
						</div>
					</div>
				</div>
				</div>
		);
	}
});

module.exports = App;
