var AddPDOdom = require('./AddPDOdom.jsx');
var ExcelUtils = require('./ExcelUtils.jsx');
var ExcelModle = require('./ExcelModle.jsx');


var AddPDO = React.createClass( {
    propTypes: {
		indexfu:React.PropTypes.number.isRequired
    },
    getInitialState: function() {
        return {
			index: this.props.indexfu,
			fileds: [],
			name: '',
			clickNum: 0,
			pdoaddDOM: null,
			message_fileds:[],
			message_name:'',
			message_first:'',
			message:'',
			firstfiled:'',
			msg: [],
			pdos: [],
			files:[],
			rightstate: 'unknown',			
        };
    },
    componentDidMount: function() {
    },
	handleContinue:function(information){
		if(information=='continue'){
			this.addAllPDO(this.state.pdos);
			
			
		}else{
			this.indexClickHandle(0);
		}
	},
	addAllPDO:function(pdos){

		var httpParams = {'pdos': pdos};
		$.ajax( {
			async: false,//阻塞的，保证刷新得到的视图是新的
			type: "POST",
			cache: false,
			url: "api/pdo/add",
			data: {'params':JSON.stringify(httpParams)},
			success:function(data){
						
			}
		});	
		this.setState({
						msg: [],
						pdos: pdos,
						rightstate:'success',
					});
	},
	handleFile: function(e) {

		var self = this;
		var files = e.target.files;
		var i,f;
		for (i=0,f=files[i]; i!=files.length; ++i) {
			
			var reader = new FileReader();
			var name = f.name;
			reader.onload = function(e) {
	
				var data = e.target.result;
				var status = {'state':'unknown'};
				var pdos = [];
				var errorMsg = [];
			
				ExcelUtils.readPDOFromExcel(data, status, pdos, errorMsg);
				
				for (var i=0; i<errorMsg.length; i++) {
					console.log(errorMsg[i]);
				}
				console.log(pdos);
				console.log(errorMsg.length);
				
				if(errorMsg.length!=0){
					var regx=/格式警告/;
					var flag = true;
					for(var k=0;k<errorMsg.length;k++){
						if(regx.exec(errorMsg[k])== null){
							flag = false;
						}
					}
					if(flag){
						console.log('warning');
						//$("#pdo-add-warning-modal").modal('show');
						self.setState({
							msg: errorMsg,
							pdos: pdos,
							rightstate:'warning',
						});
					}else{
						console.log('error');
						self.setState({
							msg: errorMsg,
							pdos: pdos,
							rightstate:'error',
						});
						//$("#pdo-add-error-modal").modal('show');
					}
				}else{
					self.addAllPDO(pdos);
					
				}
			};
			reader.readAsBinaryString(f);
		}
		this.setState({
			files: []
		});
	},
	
	clickMe: function() {
        var temp = this.state.clickNum+1;
        var t_fileds = [];
        var t_message_fileds =[];
		
        for ( var i = 0; i < this.state.fileds.length; i++ ) {
            t_fileds[i] = this.state.fileds[i];
			t_message_fileds[i]=this.state.message_fileds[i];
        }
        t_fileds[temp-1] = '';
		t_message_fileds[temp-1]='';
		
        this.setState( {
            fileds: t_fileds,
            clickNum: temp,
			message_fileds:t_message_fileds,
        });
		
		
    },
	pdoaddDOMHandle: function( dom ) {
        this.setState( {
            pdoaddDOM: dom
        });
    },
	firstfiledChangeHandle:function( event ) {
	
	 var t_firstfiled = '';
        t_firstfiled = event.target.value;

        this.setState( {
            firstfiled: t_firstfiled
        });
	},
    NameChangeHandle: function( event ) {
        var t_name = '';
        t_name = event.target.value;

        this.setState( {
            name: t_name
        });
    },
    StringChangeHandle: function( id, event ) {
        var t_fileds = [];
        for ( var i = 0; i < this.state.fileds.length; i++ ) {
            t_fileds[i] = this.state.fileds[i];
        }
        t_fileds[id] = event.target.value;
     
        this.setState( {
            fileds: t_fileds
        });
    },
	indexClickHandle: function( n ) {
		if(this.state.message_name == ' has-error'){
			this.setState( {
				index: n,
				clickNum: 0,
				fields:[],
				firstfiled:'',
				message_fileds:[],
				message_first:'',
				msg: [],
				pdos: [],
				rightstate: 'unknown',
			});
		}else{
			this.setState( {
				index: n,
				clickNum: 0,
				fields:[],
				firstfiled:'',
				message_fileds:[],
				message:'',
				message_first:'',
				msg: [],
				pdos: [],
				rightstate: 'unknown',
			});
		}
        
    },
	checkInputName:function(){
		var flag = false;
		
		//检查名称是否为空
		if(this.state.name == ''){
			
			this.setState( {
				message:'模板名称不可为空',
				message_name:' has-error'
			});
			return false;
		}
		
		//检查名称 是否重复
		var userParam = {};
		userParam['name'] = this.state.name;
		 $.ajax( {
                async: false,//阻塞的，保证刷新得到的视图是新的
                type: "POST",
                cache: false,
                url: "api/pdo/checkname",
                data: {'name':this.state.name},
				dataType: "json",
                success:function(data){
					if(data['valid'] == 'true'){
                       flag = true;
                    }else{
                       flag = false;
                    }
                }
            });
		if(flag == false){
			this.setState( {
				message:'模板名称已存在',
				message_name:' has-error'
			});
		}
        return flag;
	},
	checkInputFileds: function() {
		
		
        
		//如果是用户自定义
		if(this.state.index == 3){
			
			//首先检查首字段是否为空
			if(this.state.firstfiled == ''){
				this.setState( {
					message:'首字段不可为空！',
					message_first:' has-error'
				});
				return false;
			}
	
			//然后检查其余字段是否和首字段重复
			for(var j=0;j<this.state.clickNum;j++){
				
				if(this.state.firstfiled == this.state.fileds[j]){
					
					var t_message_fileds=[];
					for(var k=0;k<this.state.message_fileds.length;k++){
						t_message_fileds[k]='';
					}
					t_message_fileds[j]=' has-error';
					
					this.setState( {
						message:'字段不可重复！',
						message_first:' has-error',
						message_fileds:t_message_fileds
						
					});
					return false;
				}
			}
		}
		for ( var i = 0; i < this.state.clickNum - 1; i++ ) {
            for ( var j = i + 1; j < this.state.clickNum; j++ ) {
                if ( this.state.fileds[i] == this.state.fileds[j] && this.state.fileds[i]!= '') {
					
					var t_message_fileds=[];
					for(var k=0;k<this.state.message_fileds.length;k++){
						t_message_fileds[k]='';
					}
					t_message_fileds[i]=' has-error';
					t_message_fileds[j]=' has-error';
					
					this.setState( {
							message:'字段不可重复！',
							message_fileds:t_message_fileds
						});
                    return false;
                }
            }
        }
		return true;
    },
	serializeForStruts2: function( name, fileds ) {
        var pdo = {};
        pdo['id']="-1";
        var q = new Date();
        pdo['time']=q.getTime();
        pdo['user']="0";
        pdo['name']=this.state.name;
        var tempt_fileds = [];
		var num = 0;
		if(this.state.index ==0){
			tempt_fileds[0] = '金额';
			tempt_fileds[1] = '用途';
			tempt_fileds[2] = '支付方式';
			num = 3;
		}else if(this.state.index ==1){
			tempt_fileds[0] = '地点';
			tempt_fileds[1] = '吃什么';
			tempt_fileds[2] = '跟谁吃';
			tempt_fileds[3] = '钱数';
			num = 4;
		}else if(this.state.index ==2){
			tempt_fileds[0] = '加油站地点';
			tempt_fileds[1] = '单价';
			tempt_fileds[2] = '总金额';
			num = 3;
		}else if(this.state.index ==3){
			tempt_fileds[0] = this.state.firstfiled;
			num = 1;
		}
        
        var j = num; 
        for ( var i = 0; i < this.state.fileds.length; i++ ) {
            
            if(this.state.fileds[i]!=''&&this.state.fileds[i]!= null){
                tempt_fileds[j] = this.state.fileds[i];
                j++;
            }
        }
        pdo['fields']=tempt_fileds;
       
        return pdo;
    },
	subHandle: function( event ) {
        var pdoArray=[];
        pdoArray.push(this.serializeForStruts2( this.state.name, this.state.fileds ));
        var httpParams = {'pdos': pdoArray};
		
		var t_message_file=[];
		for(var k=0;k<this.state.message_fileds.length;k++){
			t_message_file[k]='';
		}
		this.setState( {			
			message_fileds:t_message_file,
			message_name:'',
			message_first:'',
			message:'',
		});
		
        if ( !this.checkInputName() ) {

        } else if(!this.checkInputFileds()){

		} else {
            $.ajax( {
                async: false,//阻塞的，保证刷新得到的视图是新的
                type: "POST",
                cache: false,
                url: "api/pdo/add",
                data: {'params':JSON.stringify(httpParams)},
                success:function(data){
					
                }
            });
			
			this.setState( {			
				name: '',
				fileds:[],
				clickNum:0,
				message_fileds:[],
				message_name:'',
				message_first:'',
				message:'添加成功！',
				firstfiled:''
			});		
        }
		
    },
	
    render: function() {
		//a onFocus={this.showClearFocus}  href={"#modal-show-" + this.props.id}  className="btn" 
		var msgs = [];
			for (var i=0; i<this.state.msg.length; i++) {
				msgs.push(<p key={i}>{this.state.msg[i]}</p>);
			}
			var tables = [];
			for (var i=0; i<this.state.pdos.length; i++) {
				var fields = '';
				for (var j=0; j<this.state.pdos[i]['fields'].length; j++) {
					fields = fields + this.state.pdos[i]['fields'][j] + '  ';
				}
				tables.push(<tr key={i}><td>{this.state.pdos[i]['name']}</td><td>{fields}</td></tr>);
			}
			var rightsideview=[];
			if(this.state.rightstate == 'unknown'){
				rightsideview.push(
								<AddPDOdom key={0}
									firstfiledChangeHandle={this.firstfiledChangeHandle}
									firstfiled={this.state.firstfiled}
									index = {this.state.index}
									clickNum = {this.state.clickNum}
									clickMe = {this.clickMe}
									name = {this.state.name}
									fileds = {this.state.fileds}
									NameChangeHandle = {this.NameChangeHandle}
									StringChangeHandle = {this.StringChangeHandle}
									pdoaddDOMHandle = {this.pdoaddDOMHandle}
									subHandle = {this.subHandle}
									message_fileds= {this.state.message_fileds}
									message_name={this.state.message_name}
									message_first= {this.state.message_first}
									message={this.state.message}
								 />
				);
			}else{
				rightsideview.push(
									<ExcelModle key={0}
									pdos={this.state.pdos}
									mystate={this.state.rightstate}
									msg={this.state.msg}
									handleContinue={this.handleContinue}
									/>
				);
			}
		return (
			<div className="app-content">
			  <div className="app-content-body fade-in-up">
				  <div className="hbox hbox-auto-xs hbox-auto-sm">
					<div className="app-content-body app-content-full fade-in-up h-full"  >
						<div className="hbox hbox-auto-xs bg-light ">
						{/*<!-- column -->*/}
						  <div className="col w-lg lt b-r">
							<div className="vbox">
							  <div className="wrapper">
							  <input value={this.state.files} type="file" data-icon="false" data-classbutton="btn btn-default" data-classinput="form-control inline v-middle input-s" id="filestyle-0" tabIndex="-1" style={{'position':'absolute','clip':'rect(0px 0px 0px 0px)'}} onChange={this.handleFile}/>
								<label htmlFor="filestyle-0" className="pull-right btn m-t-n-xs btn-sm btn-info btn-addon ">
									<i className="fa fa-plus"></i>
									Excel											
								</label>
								<div className="h4">模板</div>
							  </div>
							  <div className="wrapper b-t m-t-xxs">
							  {/*留白*/}
							  </div>
							  <div className="row-row">
								<div className="cell scrollable hover">
								  <div className="cell-inner">
									<div className="padder">
									  <div className="list-group">
										<a className="list-group-item b-l-warning b-l-3x hover-anchor" onClick={this.indexClickHandle.bind( this, 0 )}>
										{/*恒定点击效果 hover*/}
										  <span className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
										  <span className="block text-ellipsis">所支付的每一笔钱</span>
										  <small className="text-muted">金额、用途、支付方式等</small>
										</a>
										<a  className="list-group-item b-l-success b-l-3x hover-anchor" onClick={this.indexClickHandle.bind( this, 1 )}>
										  <span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
										  <span className="block text-ellipsis ">所吃的每一顿饭</span>
										  <small className="text-muted ">地点、吃什么、跟谁吃、钱数</small>
										</a>
										<a className="list-group-item b-l-primary b-l-3x hover-anchor"  onClick={this.indexClickHandle.bind( this, 2 )}>
										  <span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
										  <span className="block text-ellipsis ">所加的每一次油</span>
										  <small className="text-muted ">加油站地点、单价、总金额等</small>
										</a>
										<br/>
										<br/>
										<br/>
										<a className="list-group-item b-l-danger b-l-3x hover-anchor"  onClick={this.indexClickHandle.bind( this, 3)}>
										  <span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
										  <span className="block text-ellipsis ">用户自定义模板</span>
										  <small className="text-muted ">系统自动添加时间字段</small>
										</a>
									  </div>
									</div>
								  </div>
								</div>
							  </div>
							</div>
						  </div>
						  {/*<!-- /column -->*/}
						{/*<!-- 右侧 -->*/}
						  <div className="col">
							<div className="vbox">	
							  <div className="row-row">
								<div className="cell">
								{/*右侧内部*/}
								
								{rightsideview}
											
								<div className="modal fade" id="pdo-add-error-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
												<h4 className="modal-title" style={{textAlign: 'center'}}>
													Excel 模板导入错误信息提示
												</h4>
											</div>
											<div className="modal-body" style={{textAlign: 'center'}}>
												{msgs}
											</div>
											<div className="modal-footer">
												 <button type="button" className="btn btn-info" data-dismiss="modal">确定</button>
											</div>
										</div>
									</div>
								</div>
								
								
								 {/*右侧内部结束*/}
								</div>
							  </div>
							</div>
						  </div>
						</div>
					</div>
				  </div>
			  </div>
			  
		  </div>
		);
    }
});

module.exports = AddPDO;