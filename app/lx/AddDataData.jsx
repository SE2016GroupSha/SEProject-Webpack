var AddDataData = React.createClass( {
    propTypes: {
		AddDataDataHandle: React.PropTypes.func.isRequired,
		currentPDO: React.PropTypes.object.isRequired,
		relatedData: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
			values: [],
			datetime: {},
			isMsg: false,
			msgStr: '',
			isQuerying: false
        };
    },
	componentWillReceiveProps: function(nextProps) {
		if (this.props.currentPDO.id != nextProps.currentPDO.id) {
			console.log('AddDataData componentWillReceiveProps');
			console.log(nextProps.currentPDO);
			this.clearState();
		}
	},
    componentDidMount: function() {
		var self = this;
		
		$(this.refs.dateInput).datepicker({
			language: "zh-CN",
			orientation: "bottom auto",
			autoclose: true,
			todayHighlight: true
		})
		.on('changeDate', function() {
			self.dateTimeChangeHandle('date', $(self.refs.dateInput).val());
		})
		.on('changeMonth', function() {
			self.dateTimeChangeHandle('date', $(self.refs.dateInput).val());
		})
		.on('changeYear', function() {
			self.dateTimeChangeHandle('date', $(self.refs.dateInput).val());
		});
		
		$(this.refs.timeInput).clockpicker({
			default: 'now',
			autoclose: true,
			afterDone: function() {
				self.dateTimeChangeHandle('time', $(self.refs.timeInput).val());
			}
		});
    },
	clearState: function () {
		var self = this;
		
		$(this.refs.dateInput).datepicker('clearDates');
		$(this.refs.timeInput).clockpicker('remove');
		$(this.refs.timeInput).val('');
		$(this.refs.timeInput).clockpicker({
			default: 'now',
			autoclose: true,
			afterDone: function() {
				self.dateTimeChangeHandle('time', $(self.refs.timeInput).val());
			}
		});
		
		this.setState({
			values: [],
			datetime: {},
			isMsg: false,
			msgStr: '',
			isQuerying: false
		});
	},
	valuesChangeHandle: function (index, event) {
		var newValues = this.state.values;
		newValues[index] = event.target.value;
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
	addHandle: function () {
		var self = this;
		
		console.log(this.state.values);
		console.log(this.state.datetime);
		console.log(this.props.relatedData);
		
		if (typeof(this.props.currentPDO['id'])=='undefined' || typeof(this.props.currentPDO['fields'])=='undefined') {
			//这是不可能发生的
			return;
		}
		
		var pdoId = this.props.currentPDO['id'];
		var fields = this.props.currentPDO['fields'];
		
		for (var i=0; i<fields.length; i++) {
			if (typeof(this.state.values[i])=='undefined' || this.state.values[i]==null || this.state.values[i]=='') {
				this.setState({
					isMsg: true,
					msgStr: fields[i] + '不能为空'
				});
				return;
			}
		}
		
		if (typeof(this.state.datetime['date'])=='undefined' || this.state.datetime['date']==null || this.state.datetime['date']=='') {
			this.setState({
				isMsg: true,
				msgStr: '请选择日期'
			});
			return;
		}
		
		if (typeof(this.state.datetime['time'])=='undefined' || this.state.datetime['time']==null || this.state.datetime['time']=='') {
			this.setState({
				isMsg: true,
				msgStr: '请选择时间'
			});
			return;
		}
		
		
		//从这里开始，是异步调用
		
		//1.开始添加数据
		addData();
		
		//添加数据
		function addData() {
			//禁按钮
			self.setState({
				isQuerying: true
			});
			
			//构造data结构，参考：{"id":"4", "time":1477412545804, "pdo": "1", "values": ["家", "学校", "10分钟"], "related_data": ["5", "6"]}
			var data = {};
			
			data['id'] = "-1";
			var date = self.state.datetime['date'];
			var time = self.state.datetime['time'];
			data['time'] = Date.parse(date.substring(5,7)+'-'+date.substring(8,10)+'-'+date.substring(0,4)+' '+time+':00');
			data['pdo'] = self.props.currentPDO['id'];
			
			data['values'] = [];
			self.state.values.forEach(
				function (value) {
					data['values'].push(value);
				}
			);
			
			data['related_data'] = [];
			
			var reDataSet = new Set();
			self.props.relatedData.forEach(
				function (reData) {
					reDataSet.add(reData['id']);
				}
			);
			reDataSet.forEach(
				function (id) {
					data['related_data'].push(id);
				}
			);

			
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
						//2.开始提示添加记录成功
						addSuccess();
					} else {
						self.setState({
							isMsg: true,
							msgStr: '添加失败',
							isQuerying: false //开按钮
						});
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
		
		
		//提示添加记录成功
		function addSuccess() {
			setTimeout(function() {
				self.setState({
					isMsg: true,
					msgStr: '添加记录成功!'
				});
				$(self.refs.msgDOM).addClass('animated bounceIn');
			}, 0);
			
			
			setTimeout(function() {
				self.clearState();
				self.props.AddDataDataHandle('add_ok');
			}, 2000);
			
		}
		
	},
    render: function() {
		
		var items = [];
		if (typeof(this.props.currentPDO['fields'])!='undefined') {
			var fields = this.props.currentPDO['fields'];
			for (var i=0; i<fields.length; i++) {

				items.push(
					<div key={i} className="form-group">
						<label><span>{fields[i]}</span></label>
						<input type="text" className="form-control" placeholder="必填" value={(typeof(this.state.values[i])=='undefined')?'':this.state.values[i]} onChange={this.valuesChangeHandle.bind(null, i)}></input>
					</div>
				);
			}
		}
		
		return (
			  <div className="col bg-white-only">
				<div className="vbox">
				  <div className="wrapper-sm b-b">
					<i className="fa fa-plus fa-fw m-r-xs"></i>
					<a href="javascript:void(0)" style={{fontSize:'15px'}}>添加记录</a>
					
					<a href="javascript:void(0)" className="pull-right btn btn-xs btn-default btn-addon-xs" style={{backgroundColor:'#F6F8F8'}}>
						<i className="fa fa-plus fa-fw m-r-xs"></i>
						<span style={{borderLeft:'1px solid #dee5e7',paddingLeft:'5px'}}>Excel导入</span>
					</a>
						
					<a href="javascript:void(0)" className="pull-right btn btn-xs btn-default btn-addon-xs" style={{backgroundColor:'#F6F8F8',marginRight:'8px'}}>
						<i className="fa fa-download fa-fw m-r-xs"></i>
						<span style={{borderLeft:'1px solid #dee5e7',paddingLeft:'5px'}}>Excel模板</span>
					</a>
				  </div>
				  <div className="row-row">                 {/**/}
					<div className="cell scrollable hover"> {/**/}
					  <div className="cell-inner">          {/**/}
					  <div className="row" style={{marginBottom:'50px'}}>
						<div className={"col-sm-10 col-sm-offset-1 "+(typeof(this.props.currentPDO['fields'])=='undefined'?'hide':'')}>
							<div className="panel panel-default" style={{marginTop:'30px'}}>
								<div className="panel-heading font-bold"><span>{typeof(this.props.currentPDO['fields'])=='undefined'?'':this.props.currentPDO['name']}</span></div>
								<div className="panel-body">
									<div className="col-sm-10 col-sm-offset-1">
									  <form role="form" className="ng-pristine ng-valid">
									  
										{items}
										
										<div className="form-group pull-in clearfix">
										  <div className="col-sm-6">
											<label><span>日期</span></label>
											<input type="text" className="form-control" readOnly="true" style={{backgroundColor:'#fff'}} placeholder="选择日期" ref="dateInput"></input> 
										  </div>
										  <div className="col-sm-6">
											<label><span>时间</span></label>
											<input type="text" className="form-control" readOnly="true" style={{backgroundColor:'#fff'}} placeholder="选择时间" ref="timeInput"></input>
										  </div>
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
										<button type="button" className="btn btn-sm btn-primary" style={{cursor:'pointer'}} disabled={this.state.isQuerying?'disabled':''} onClick={this.addHandle}>确认添加</button>
									  </form>
									</div>
								</div>
							</div>
						</div>
					  </div>
				  </div>{/**/}
				  </div>{/**/}
				  </div>{/**/}
				</div>
			  </div>
		);
    }
});

module.exports = AddDataData;
