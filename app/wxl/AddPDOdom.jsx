require('../../resource/css/wxl/wxl.css');
var AddPDOdom = React.createClass( {
    propTypes: {
		firstfiledChangeHandle:React.PropTypes.func.isRequired,
		firstfiled:React.PropTypes.string.isRequired,
		index: React.PropTypes.number.isRequired,
		clickNum: React.PropTypes.number.isRequired,
        clickMe: React.PropTypes.func.isRequired,
		name: React.PropTypes.string.isRequired,
        fileds: React.PropTypes.array.isRequired,
		NameChangeHandle: React.PropTypes.func.isRequired,
        StringChangeHandle: React.PropTypes.func.isRequired,
		pdoaddDOMHandle: React.PropTypes.func.isRequired,
		subHandle: React.PropTypes.func.isRequired,
		message_fileds: React.PropTypes.array.isRequired,
		message_name: React.PropTypes.string.isRequired,
		message_first: React.PropTypes.string.isRequired,
		message: React.PropTypes.string.isRequired,
		resetHandle: React.PropTypes.func.isRequired,
    },
	getInitialState: function() {
        return {
			statearray:[],		
        };
    },
    componentDidMount: function() {
        var Form = this.refs.refCopy;
        this.props.pdoaddDOMHandle( Form );
    },
	
	render: function() {
	var headInformation = '';
	var items=[];
	var additems = [];
	var pdonameclassname='form-group '+this.props.message_name;
	
	
	
	if(this.props.index == 0){
		headInformation = '所支付的每一笔钱';
		
		for(var i=0;i<this.props.clickNum ;i++){
			var num = 4+i;
			var thisfiledclassname='form-group'+this.props.message_fileds[i];
			var filedname = '字段'+num;
			additems.push(
							<div className={thisfiledclassname} key={i}>
								<label>{filedname}</label>
								<input type="text" className="form-control" placeholder="请添加新字段" 
								 onChange={this.props.StringChangeHandle.bind( null,i) } 
								 value = {this.props.fileds[i]}/>
							</div>
			);
		}
		
		items.push(
					<div className="panel-body" key={0}>
					<p className="text-muted">用于记录数据内容发生时间字段不需添加</p>
						<p className="text-muted"> </p>
						<div className={pdonameclassname}>
							<label>模板名称</label>
							<input type="text" className="form-control"  onChange={this.props.NameChangeHandle} value={this.props.name}/>
						</div>
						<div className="form-group">
							<label>首字段</label>
							<input type="text" className="form-control" placeholder="金额" disabled/>
						</div>
						<div className="form-group">
							<label>字段2</label>
							<input type="text" className="form-control" placeholder="用途" disabled/>
						</div>
						<div className="form-group">
							<label>字段3</label>
							<input type="text" className="form-control" placeholder="支付方式" disabled/>
						</div>
						{additems}
					</div>
		);
	}else if(this.props.index == 1){
		headInformation = '所吃的每一顿饭';
		for(var i=0;i<this.props.clickNum ;i++){
			var num = 5+i;
			var filedname = '字段'+num;
			var thisfiledclassname='form-group'+this.props.message_fileds[i];
			additems.push(
							<div className={thisfiledclassname} key={i}>
								<label>{filedname}
								</label>
								<input type="text" className="form-control" placeholder="请添加新字段"  
								onChange={this.props.StringChangeHandle.bind( null,i) } 
								 value = {this.props.fileds[i]}/>
							</div>
			);
		}
		items.push(
					<div className="panel-body" key={1}>
						<p className="text-muted">用于记录数据内容发生时间字段不需添加</p>
						<p className="text-muted"> </p>
						<div className={pdonameclassname}>
							<label>模板名称</label>{/*<em className="text-muted">(提示信息)</em>*/}
							<input type="text" className="form-control"  onChange={this.props.NameChangeHandle} value={this.props.name}/>
						</div>
						<div className="form-group">
							<label>首字段</label>
							<input type="text" className="form-control" placeholder="地点" disabled/>
						</div>
						<div className="form-group">
							<label>字段2</label>
							<input type="text" className="form-control" placeholder="吃什么" disabled/>
						</div>
						<div className="form-group">
							<label>字段3</label>
							<input type="text" className="form-control" placeholder="跟谁吃" disabled/>
						</div>
						<div className="form-group">
							<label>字段4</label>
							<input type="text" className="form-control" placeholder="钱数" disabled/>
						</div>
						{additems}
					</div>
		);
	}else if(this.props.index == 2){
		headInformation = '所加的每一次油';
		for(var i=0;i<this.props.clickNum ;i++){
			var num = 4+i;
			var filedname = '字段'+num;
			var thisfiledclassname='form-group'+this.props.message_fileds[i];
			additems.push(
							<div className={thisfiledclassname} key={i}>
								<label>{filedname}</label>
								<input type="text" className="form-control" placeholder="请添加新字段" 
								onChange={this.props.StringChangeHandle.bind( null,i) } 
								 value = {this.props.fileds[i]}/>
							</div>
			);
		}
		items.push(
					<div className="panel-body" key={2}> 
						<p className="text-muted">用于记录数据内容发生时间字段不需添加</p>
						<div className={pdonameclassname}>
							<label>模板名称</label>
							<input type="text" className="form-control"  onChange={this.props.NameChangeHandle}  value={this.props.name}/>
						</div>
						<div className="form-group">
							<label>首字段</label>
							<input type="text" className="form-control" placeholder="加油地点" disabled/>
						</div>
						<div className="form-group">
							<label>字段2</label>
							<input type="text" className="form-control" placeholder="单价" disabled/>
						</div>
						<div className="form-group">
							<label>字段3</label>
							<input type="text" className="form-control" placeholder="总金额" disabled/>
						</div>
						{additems}
					</div>
		);
	}else{
		headInformation = '用户自定义模板';
		
		for(var i=0;i<this.props.clickNum ;i++){
			var num = 2+i;
			var filedname = '字段'+num;
			var thisfiledclassname='form-group'+this.props.message_fileds[i];
			additems.push(
							<div className={thisfiledclassname} key={i}>
								<label>{filedname}</label>
								<input type="text" className="form-control" placeholder="请添加新字段"  
								onChange={this.props.StringChangeHandle.bind( null,i) } 
								 value = {this.props.fileds[i]}/>
							</div>
			);
		}
		
		var firstfiledclassname='form-group '+this.props.message_first;
		
		items.push(
					<div className="panel-body" key={3}>
						<p className="text-muted">用于记录数据内容发生时间字段不需添加</p>
						<div className={pdonameclassname}>
							<label>模板名称</label>
							<input type="text" className="form-control"  onChange={this.props.NameChangeHandle} value={this.props.name}/>
						</div>
						<div className={firstfiledclassname}>
							<label>首字段</label>
							<input type="text" className="form-control" placeholder="首字段不可为空"  
							onChange={this.props.firstfiledChangeHandle} value={this.props.firstfiled}/>
						</div>
						{additems}
					</div>
		);
	}
	
		var messageme = 'text-left hide';
		if(this.props.message!=''){
			messageme='text-left';
		}
		
		
        return (
		 <div className="cell-inner">
			 {/*右侧内容*/}
			<div className="wrapper b-t m-t-xxs">
			{/*留白*/}
			</div>			  
			<div className="col-sm-1"></div>
				<div className="col-sm-9">
					<form name="form" className="form-validation" ref="refCopy">
					  <div className="panel panel-default">
						<div className="panel-heading">
						  <span className="h4">{headInformation}</span>
						</div>
						
						{items}
						
						<footer className="panel-footer text-right bg-light lter">
						<div className={messageme}>
						<i className="fa fa-exclamation-circle text-muted text-left new2" style={{color: 'rgb(114, 102, 186)',fontSize:'15px','fontWeight': 'bolder'}}>
						&nbsp;{this.props.message}</i>
						</div>
						  <a className="btn btn-info" onClick={this.props.clickMe}>增加字段</a>
						  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						  <a type="submit" className="btn btn-warning" onClick={this.props.resetHandle}>重置</a>
						  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						  <a type="submit" className="btn btn-success" onClick={this.props.subHandle}>提交</a>
						</footer>
					  </div>
					</form>
				</div>
				<div className="col-sm-2"></div>
					{/*右侧内容结束*/}
				</div>
        );
    }
});
module.exports = AddPDOdom;