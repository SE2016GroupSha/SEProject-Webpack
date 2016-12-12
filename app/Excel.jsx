var ExcelUtils = require('./ExcelUtils.jsx');
var ExcelModle = require('./ExcelModle.jsx');
require('../resource/css/wxl/wxl.css');

var Excel = React.createClass( {
	propTypes: {

	},
	getInitialState: function() {
		return {
			msg: [],
			pdos: [],
			datas:[],
			files_data:[],
			files_pdo:[],
			rightstate: 'unknown',
			state_pdo_or_data:'unknown',
		};
	},
	componentDidMount: function() {

	},
	handleContinue:function(information){
		if(information=='continue'){
			if(this.state.state_pdo_or_data== 'pdo'){
				this.addAllPDO(this.state.pdos);
			}else{
				this.addAllDATA(this.state.datas,this.state.pdos);
			}
			
		}else{
			this.setState({
				state_pdo_or_data:'unknown',
				pdos:[],
				datas:[],
				msg:[],
				rightstate:'unknown',
			});
		}
	},
	addAllPDO:function(pdos){
		var httpParams = {'pdos': pdos};
		var self = this;
		$.ajax( {
			async: false,
			type: "POST",
			cache: false,
			url: "api/pdo/add",
			data: {'params':JSON.stringify(httpParams)},
			dataType: "json",
			success:function(data){
				if(data['state']=='success'){
					
					self.setState({
						msg: [],
						pdos: pdos,
						rightstate:'success',
						state_pdo_or_data:'pdo',
					});
					
				}else{
					self.setState({
						msg: ['内部错误'],
						pdos: pdos,
						rightstate:'error',
						state_pdo_or_data:'pdo',
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.setState({
					msg: ['网络错误（请检查网络后重新导入）'],
					datas: datas,
					rightstate:'error',
					state_pdo_or_data:'pdo',
				});
			}
		});
	},
	addAllDATA:function(datas,pdos){
		//添加 模板
		var httpParamspdos = {'pdos': pdos};
		var self = this;
		var flag=false;
		$.ajax( {
			async: false,
			type: "POST",
			cache: false,
			url: "api/pdo/add",
			data: {'params':JSON.stringify(httpParamspdos)},
			dataType: "json",
			success:function(data){
				if(data['state']=='success'){
					flag =true;
				}else{
					self.setState({
						msg: ['内部错误'],
						pdos: pdos,
						datas:datas,
						rightstate:'error',
						state_pdo_or_data:'data',
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.setState({
					msg: ['网络错误（请检查网络后重新导入）'],
					datas: datas,
					pdos: pdos,
					rightstate:'error',
					state_pdo_or_data:'data',
				});
			}
		});
		if(flag == false){
			return ;
		}
		
		//修正数据的pdo的id
		var status = {'state':'unknown'};
		var errorMsg = [];
		ExcelUtils.fixData(status, datas, errorMsg);
		if (status['state']=='error') {
			self.setState({
				msg: errorMsg,
				pdos: pdos,
				datas: datas,
				rightstate:'error',
				state_pdo_or_data:'data',
			});
			return;
		}
		
		//添加数据
		console.log(pdos);
		var httpParamsdata = {'datas': datas};
		$.ajax({
			async: false,
			type:"POST",
			cache: false,
			url: "api/data/add",
			data: {'params':JSON.stringify(httpParamsdata)},
			dataType: "json",
			success: function(data) {
				if (data['state']=='success') {
					self.setState({
						msg: [],
						datas: datas,
						pdos: pdos,
						rightstate:'success',
						state_pdo_or_data:'data',
					});
				} else {
					self.setState({
						msg: ['内部错误'],
						datas: datas,
						pdos: pdos,
						rightstate:'error',
						state_pdo_or_data:'data',
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				self.setState({
					msg: ['网络错误（请检查网络后重新导入）'],
					datas: datas,
					pdos: pdos,
					rightstate:'error',
					state_pdo_or_data:'data',
				});
			}
		});
	},
	handleFileDATA:function(e){
		var self = this;
		var files = e.target.files;
		var i,f;
		for (i=0,f=files[i]; i!=files.length; ++i) {

			var reader = new FileReader();
			var name = f.name;
			reader.onload = function(e) {

				var data = e.target.result;
				var status = {'state':'unknown'};
				var datas = [];
				var pdos =[];
				var errorMsg = [];

				ExcelUtils.readDataFromExcel(data, status, pdos, datas, errorMsg);
				console.log(pdos);
				for (var i=0; i<errorMsg.length; i++) {
					console.log(errorMsg[i]);
				}
				console.log(status);
				console.log(errorMsg.length);
				
				if(status['state']=='warning'){
					console.log('warning');
					self.setState({
						msg: errorMsg,
						datas: datas,
						pdos:pdos,
						rightstate:'warning',
						state_pdo_or_data:'data',
					});
				}else if(status['state']=='error'){
					console.log('error');
					self.setState({
						msg: errorMsg,
						datas: datas,
						pdos:pdos,
						rightstate:'error',
						state_pdo_or_data:'data',
					});
				}else{
					self.addAllDATA(datas,pdos);
				}
			};
			reader.readAsBinaryString(f);
		}
		this.setState({
			files_data: []
		});
	},
	handleFilePDO: function(e) {

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

				if(status['state']=='warning'){
					console.log('warning');
					self.setState({
						msg: errorMsg,
						pdos: pdos,
						rightstate:'warning',
						state_pdo_or_data:'pdo',
					});
				}else if(status['state']=='error'){
					console.log('error');
					self.setState({
						msg: errorMsg,
						pdos: pdos,
						rightstate:'error',
						state_pdo_or_data:'pdo',
					});
				}else{
					self.addAllPDO(pdos);
				}
			};
			reader.readAsBinaryString(f);
		}
		this.setState({
			files_pdo: []
		});
	},
 render: function() {

			var msgs = [];
			for (var i=0; i<this.state.msg.length; i++) {
				msgs.push(<p key={i}>{this.state.msg[i]}</p>);
			}
			var tables = [];
			for (var i=0; i<this.state.pdos.length; i++) {
				var fields = '';
				for (var j=0; j<this.state.pdos[i]['fields'].length; j++) {
					fields = fields + this.state.pdos[i]['fields'][j] + ' ';
				}
				tables.push(<tr key={i}><td>{this.state.pdos[i]['name']}</td><td>{fields}</td></tr>);
			}
			var rightsideview=[];
			var leftsideview=[];
			if(this.state.state_pdo_or_data == 'unknown'){

				rightsideview.push(
					<div key={0} className="fade-in-right-big smooth">
						<div className="container w-auto-xs " style={{'width':'700px'}}>
						 <div className="text-center m-b-lg">
							<br/>
							<br/>
							<h1 className="new3 text-white">欢迎使用导入工具</h1>
						 </div>
						 <br/><br/>
						 <div className="list-group bg-info auto m-b-sm m-b-lg">
							<label className="list-group-item" htmlFor="filestyle-0">
							 <i className="fa fa-chevron-right text-muted"></i>
							 <i className="fa fa-fw fa-mail-forward m-r-xs"></i> 导入模板
							</label>
							<label className="list-group-item" htmlFor="filestyle-1">
							 <i className="fa fa-chevron-right text-muted"></i>
							 <i className="fa fa-fw fa-sign-in m-r-xs"></i> 导入数据
							</label>
						 </div>
						 <div className="text-center ">
							<p><small className="text-muted">SE Group SHA &nbsp;&nbsp;© 2016</small></p>
						 </div>
						</div>
					</div>
				);

			}else{
				var pdoclassname='list-group-item  b-l-3x hover-anchor ';
				var dataclassname='list-group-item  b-l-3x hover-anchor ';
				
				if(this.state.state_pdo_or_data == 'pdo'){
					pdoclassname+='a_active';
					dataclassname+='a_no_active';
				}else{
					dataclassname+='a_active';
					pdoclassname+='a_no_active';
				}
				leftsideview.push(
								<div className="col w-md bg-light dk b-r bg-auto" key={0}>
									<div className="wrapper b-b bg text-center">
										<div className="h4">Excel导入工具</div>
									</div>
									<div className="wrapper hidden-sm hidden-xs"  >
										<ul className="nav nav-pills nav-stacked nav-sm">
											<li><label className={pdoclassname} htmlFor="filestyle-0">导入模板</label></li>
											<li><label className={dataclassname} htmlFor="filestyle-1">导入数据</label></li>
										</ul>
									</div>
								 </div>
				);
				rightsideview.push(
									<ExcelModle key={0}
									pdos={this.state.pdos}
									datas={this.state.datas}
									mystate={this.state.rightstate}
									msg={this.state.msg}
									handleContinue={this.handleContinue}
									state_pdo_or_data={this.state.state_pdo_or_data}
									/>
				);
			}
		return (
			<div className="app-content">
			 <div className="app-content-body fade-in-up">
				 <div className="hbox hbox-auto-xs hbox-auto-sm">
					<div className="app-content-body app-content-full fade-in-up h-full">
						<div className="hbox hbox-auto-xs bg-light ">
							{/*<!-- 左侧开始 -->*/}
							{leftsideview}
							{/*<!-- 左侧结束 -->*/}

						{/*<!-- 右侧 -->*/}
						 <div className="col">
							<div className="vbox">
							 <div className="row-row">
								<div className="cell">
								{/*右侧内部*/}
								{rightsideview}


								<input value={this.state.files_pdo} type="file" data-icon="false" data-classbutton="btn btn-default"
								data-classinput="form-control inline v-middle input-s" id="filestyle-0" tabIndex="-1"
								style={{'position':'absolute','clip':'rect(0px 0px 0px 0px)'}} onChange={this.handleFilePDO}/>

								<input value={this.state.files_data} type="file" data-icon="false" data-classbutton="btn btn-default"
								data-classinput="form-control inline v-middle input-s" id="filestyle-1" tabIndex="-1"
								style={{'position':'absolute','clip':'rect(0px 0px 0px 0px)'}} onChange={this.handleFileDATA}/>

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

module.exports = Excel;