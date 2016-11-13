require('../../css/lx/add.css');

var AddHeader = require('./AddHeader');
var AddBodyFields = require('./AddBodyFields');
var AddBodyDateTime = require('./AddBodyDateTime');
var AddBodyRelatedData = require('./AddBodyRelatedData');
var AddFooter = require('./AddFooter');

var AddContent = React.createClass({
	propTypes: {
		
	},
	getInitialState: function () {
		return {
			allpdos: [],
			subStrMap: {},
			//-------------------
			isPDOInputView: true,
			selectPDO: {},
			values: [],
			datetime: {},
			selectDatas: []
		};
	},
	componentDidMount: function () {
		
		//保存当前作用域的this
		var self = this;
		
		//Date的format添加
		this.dateFormatInject();
		
		//请求获取全部pdo，建立索引
		$.ajax({
			async: true,//异步
			type:"POST",
			cache: false,
			url: "api/pdo/all",
			dataType: "json",
			success: function(data) {
				
				var pdos = data['pdos'];
				var subMap = {};
				
				//pdo的time重新格式化
				for (var i=0; i<pdos.length; i++) {
					pdos[i]['time'] = new Date(pdos[i]['time']).format("yyyy/MM/dd hh:mm");
				}
				
				//建立subMap
				for (var i=0; i<pdos.length; i++) {
					
					//name全部子串
					var name = pdos[i]['name'];
					for (var m=0; m<name.length; m++) {
						for (var n=0; n<name.length+1; n++) {
							var subStr = name.substring(m, n);
							if (typeof(subMap[subStr])=='undefined') {
								subMap[subStr] = new Set();
							}
							subMap[subStr].add(i);
						}
					}
					
					
					//全部field的全部子串
					var fields = pdos[i]['fields'];
					for (var j=0; j<fields.length; j++) {
						var field = fields[j];
						for (var m=0; m<field.length; m++) {
							for (var n=0; n<field.length+1; n++) {
								var subStr = field.substring(m, n);
								if (typeof(subMap[subStr])=='undefined') {
									subMap[subStr] = new Set();
								}
								subMap[subStr].add(i);
							}
						}
					}
					
				}

				//更新state
				self.setState({
					allpdos: pdos,
					subStrMap: subMap
				});
				
				//alert(Array.from(subMap['车']));
				
			},
			error: function (jqXHR, textStatus, errorThrown) {
				//待拓展
			}
		});

	},
	dateFormatInject: function () {
		Date.prototype.format = function(fmt)   
		{ //author: meizz   
		  var o = {   
			"M+" : this.getMonth()+1,                 //月份   
			"d+" : this.getDate(),                    //日   
			"h+" : this.getHours(),                   //小时   
			"m+" : this.getMinutes(),                 //分   
			"s+" : this.getSeconds(),                 //秒   
			"q+" : Math.floor((this.getMonth()+3)/3), //季度   
			"S"  : this.getMilliseconds()             //毫秒   
		  };   
		  if(/(y+)/.test(fmt))   
			fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
		  for(var k in o)   
			if(new RegExp("("+ k +")").test(fmt))   
		  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		  return fmt;   
		};
	},
	pdoChangeHandle: function (reason, value) {
		switch (reason) {
		case 'selectPDO':
			this.setState({
				isPDOInputView: false,
				selectPDO: value
			});
			break;
		case 'removePDO':
			this.setState({
				isPDOInputView: true,
				selectPDO: {},
				values: [],
				datetime: {},
				selectDatas: []
			});
			break;
		default:
			break;
		}
	},
	valuesChangeHandle: function (index, e) {
		var newValues = this.state.values;
		newValues[index] = e.target.value;
		this.setState({
			values: newValues
		});
	},
	dateTimeChangeHandle: function (type, e) {
		var newDateTime = this.state.datetime;
		
		if (type=='date') {
			newDateTime['date'] = e;
		} else if (type=='time') {
			newDateTime['time'] = e;
		}
		
		this.setState({
			datetime: newDateTime
		});
	},
	relatedDataChangeHandle: function (reason, value) {
		switch (reason) {
		case 'selectData':
			var newSelectDatas = this.state.selectDatas;
			newSelectDatas.push(value);
			this.setState({
				selectDatas: newSelectDatas
			});
			break;
		case 'removeData':
			var newSelectDatas = this.state.selectDatas;
			newSelectDatas.splice(value, 1);
			this.setState({
				selectDatas: newSelectDatas
			});
			break;
		default:
			break;
		}
	},
	resetHandle: function () {
		this.setState({
			values: [],
			datetime: {},
			selectDatas: []
		});
	},
	submitHandle: function () {
		var self = this;
		
		//检验表单数据
		var flag = true;
		
		var checkValues = this.state.values;
		var checkDatetime = this.state.datetime;
		
		for (var i=0; i<this.state.selectPDO['fields'].length; i++) {
			if (typeof(checkValues[i])=='undefined' || checkValues[i]=='') {
				checkValues[i] = '';
				this.setState({
					values: checkValues
				});
				flag = false;
			}
		}
		
		if (typeof(checkDatetime['date'])=='undefined' || checkDatetime['date']=='') {
			checkDatetime['date'] = '';
			this.setState({
				datetime: checkDatetime
			});
			flag = false;
		}
		
		if (typeof(checkDatetime['time'])=='undefined' || checkDatetime['time']=='') {
			checkDatetime['time'] = '';
			this.setState({
				datetime: checkDatetime
			});
			flag = false;
		}
		
		//表单验证合法
		if (flag==true) {

			//构造data结构，参考：{"id":"4", "time":1477412545804, "pdo": "1", "values": ["家", "学校", "10分钟"], "related_data": ["5", "6"]}
			var data = {};
			
			data['id'] = "-1";
			
			var date = this.state.datetime['date'];
			var time = this.state.datetime['time'];
			data['time'] = Date.parse(date.substring(5,7)+'-'+date.substring(8,10)+'-'+date.substring(0,4)+' '+time+':00');
			
			data['pdo'] = this.state.selectPDO['id'];
			
			data['values'] = [];
			this.state.values.forEach(
				function (value) {
					data['values'].push(value);
				}
			);
			
			var reDataSet = new Set();
			this.state.selectDatas.forEach(
				function (reData) {
					reDataSet.add(reData['id']);
				}
			);
			data['related_data'] = Array.from(reDataSet);;
			
			//构造参数
			var dataArray = [];
			dataArray.push(data);
			var httpParams = {'datas': dataArray};
			
			//请求添加数据
			$.ajax({
				async: false,//阻塞
				type:"POST",
				cache: false,
				url: "api/data/add",
				data: {'params':JSON.stringify(httpParams)},
				dataType: "json",
				success: function(data) {
					if (data['state']=='success') {
						//弹成功modal
						$("#data-add-success-modal").modal('show');
						self.setState({
							values: [],
							datetime: {},
							selectDatas: []
						});
					} else {
						//弹失败modal
						$("#data-add-failed-modal").modal('show');
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					//弹失败modal
					$("#data-add-failed-modal").modal('show');
				}
			});

		}
		
	},
	render: function () {
		return (
				<div className="row clearfix">
					<div className="col-md-12 column">
						<div className="row clearfix">
							<div className="col-md-8 col-md-offset-2 column">
							
								<AddHeader pdoChangeHandle={this.pdoChangeHandle} 
										   isPDOInputView={this.state.isPDOInputView} 
										   selectPDO={this.state.selectPDO} 
										   allpdos={this.state.allpdos} 
										   subStrMap={this.state.subStrMap} 
										   limit={5} 
								/>
								
								{this.state.isPDOInputView
								?
								null
								:
								<div className="add-body">
									<AddBodyFields valuesChangeHandle={this.valuesChangeHandle} 
												   selectPDO={this.state.selectPDO} 
												   values={this.state.values}
									/>
									
									<AddBodyDateTime dateTimeChangeHandle={this.dateTimeChangeHandle} 
													 datetime={this.state.datetime}
									/>
									
									<AddBodyRelatedData relatedDataChangeHandle={this.relatedDataChangeHandle}
														selectDatas={this.state.selectDatas}
														limit={4}
									/>
								</div>
								}
								
								{this.state.isPDOInputView
								?
								null
								:
								<AddFooter resetHandle={this.resetHandle} 
										   submitHandle={this.submitHandle}
								/>
								}

							</div>
						</div>
					</div>
					<div className="modal fade" id="data-add-success-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									<h4 className="modal-title" style={{textAlign: 'center'}}>
										添加结果
									</h4>
								</div>
								<div className="modal-body" style={{textAlign: 'center'}}>
									数据添加成功！
								</div>
								<div className="modal-footer">
									 <button type="button" className="btn btn-primary" data-dismiss="modal">确定</button>
								</div>
							</div>
						</div>
					</div>
					<div className="modal fade" id="data-add-failed-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									<h4 className="modal-title" style={{textAlign: 'center'}}>
										添加结果
									</h4>
								</div>
								<div className="modal-body" style={{textAlign: 'center'}}>
									数据添加失败！
								</div>
								<div className="modal-footer">
									 <button type="button" className="btn btn-primary" data-dismiss="modal">确定</button>
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
});

module.exports = AddContent;