require('../../resource/css/wxl/wxl.css');
var PDOcom = require( './PDOcom' );

var XLSX = require('xlsx');
var FileSaver = require('file-saver');

var ViewPDO = React.createClass( {
    propTypes: {
		menuHandleWxl:React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
			index: 0,
			loading: true,
            failed: false,
            searchKey: "",
            timestamp: 0,
            timer: null,
            pdos: [],
        };
    },
	indexClickHandle: function( n ) {
        this.setState( {
            index: n,
        });
    },
    componentDidMount: function() {
		 this.freshViewHandle();
    },

    freshViewHandle: function( event ) {
        var self = this;
        var keyData = this.state.searchKey;

        //只有search会传递事件参数更新关键字
        if ( typeof ( event ) != "undefined" ) {
            keyData = event.target.value;
            this.setState( {
                searchKey: event.target.value,
            });
        }

        //设置table为加载视图
        this.setState( {
            loading: true,
            failed: false
        });

        //异步获取数据，成功则设置table为数据视图，状态变化引发table更新
        $.ajax( {
            async: true,//搜索所有PDO
            type: "POST",
            cache: false,
            url: "api/pdo/all",
            data: { key: keyData },
            dataType: "json",
            //两个回调，尝试使用时间戳控制回复包时序问题(或许根本不存在这个问题？)
			
            success: ( function( time, data ) {
				
                //js事件驱动单线程，代码不会被切走，这里的代码应该安全
                if ( time > self.state.timestamp ) {
                    //异步调用，不在当前调用栈中，setState会实时生效                   
                    self.setState( {
                        timestamp: time,
                        loading: false,
                        failed: false,
                        pdos: data['pdos'],//---------------------------
                    });
                }
                
                //alert(data.authors.length+","+data.books.length);
            }).bind( null, ( new Date() ).getTime() ),
            error: ( function( time, jqXHR, textStatus, errorThrown ) {
                if ( time > self.state.timestamp ) {
                    self.setState( {
                        timestamp: time,
                        loading: false,
                        failed: true,
                        pdos: []
                    });
                }
            }).bind( null, ( new Date() ).getTime() )
        });

    },
	downloadHandle: function(index, event){
		//模板下载接口
			
		function s2ab(s) {
			var buf = new ArrayBuffer(s.length);
			var view = new Uint8Array(buf);
			for (var i=0; i!=s.length; ++i) {
				view[i] = s.charCodeAt(i) & 0xFF;
			}
			return buf;
		}
		

		var workbook = {SheetNames:[], Sheets:{}};
		var sheetName = this.state.pdos[index]['name'];
		var worksheet = {};
		
		var data = this.state.pdos[index]['fields'];
		data.push('日期');
		data.push('时间');
		for(var i=0; i<data.length; i++) {
			var cell = {v: data[i]};
			var cell_ref = XLSX.utils.encode_cell({r:0,c:i});
			cell.t = 's';
			worksheet[cell_ref] = cell;
		}
		var range = {s: {r:0, c:0}, e: {r:0, c:data.length-1}};
		worksheet['!ref'] = XLSX.utils.encode_range(range);
		
		workbook.SheetNames.push(sheetName);
		workbook.Sheets[sheetName] = worksheet;
		
		var wbout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type: 'binary'});
		FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), sheetName+".xlsx")

	},
    render: function() {
		var theleftwindowclassname='col w-lg lt b-r ';
		var nameitems=[];
		var PDOdetial = [];
		
		if ( this.state.failed ) {
			nameitems.push(
						<a key={0} className="list-group-item b-l-3x hover-anchor b-l-primary" onClick={this.indexClickHandle.bind( this,i)}>
							<span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
							<span className="block text-ellipsis ">······</span>
						</a>
			);
			nameitems.push(
						<a key={1} className="list-group-item b-l-3x hover-anchor b-l-info" onClick={this.indexClickHandle.bind( this,i)}>
							<span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
							<span className="block text-ellipsis ">······</span>
						</a>
			);
			nameitems.push(
						<a key={2} className="list-group-item b-l-3x hover-anchor b-l-success" onClick={this.indexClickHandle.bind( this,i)}>
							<span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
							<span className="block text-ellipsis ">······</span>
						</a>
			);
			nameitems.push(
						<a key={3} className="list-group-item b-l-3x hover-anchor b-l-warning" onClick={this.indexClickHandle.bind( this,i)}>
							<span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
							<span className="block text-ellipsis ">······</span>
						</a>
			);
			nameitems.push(
						<a key={4} className="list-group-item b-l-3x hover-anchor b-l-danger" onClick={this.indexClickHandle.bind( this,i)}>
							<span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
							<span className="block text-ellipsis ">······</span>
						</a>
			);
			nameitems.push(
						<a key={5} className="list-group-item b-l-3x hover-anchor b-l-dark" onClick={this.indexClickHandle.bind( this,i)}>
							<span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
							<span className="block text-ellipsis ">······</span>
						</a>
			);
			
			PDOdetial.push(
			<div key={0}><br/><br/><br/><br/>
							<div  className="panel b-a">
							
								<div className="panel-heading text-center bg-info no-border">
								  <h4 className="text-u-c m-b-none"> </h4>
								  <h2 className="m-t-none">
									
									<span className="text-lt" style={{'font-size':'40px'}}>请检查您的网络</span>
									
								  </h2>
								</div>
							</div>
							</div>
			);
			
        } else if ( this.state.loading ) {
			
			
        } else if ( this.state.pdos.length == 0 ) {

			theleftwindowclassname +='hide';
			PDOdetial.push(
		   
							
							<div key={0} className="row no-gutter ">
							<br/><br/>
								<div className="col-lg-4 col-md-4 col-sm-6">
								  <div className="panel b-a">
									<div className="panel-heading wrapper-xs bg-primary no-border">          
									</div>
									<div className="wrapper text-center b-b b-light">
									  <h4 className="text-u-c m-b-none">所支付的每一笔钱</h4>
									  <h2 className="m-t-none">
										<span className="text-xs"> 系统预置模板</span>
									  </h2>
									</div>
									<ul className="list-group">
									  
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 金额
									  </li>
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  用途
									  </li>
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 支付方式
									  </li>
									</ul>
									<div className="panel-footer text-center">
									  <a onClick={this.props.menuHandleWxl.bind(null, 4,0)} className="btn btn-primary font-bold m">去添加</a>
									</div>
								  </div>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-6">
								  <div className="panel b-a m-t-n-md m-b-xl">
									<div className="panel-heading wrapper-xs bg-warning dker no-border">
									  
									</div>
									<div className="wrapper bg-warning text-center m-l-n-xxs m-r-n-xxs">
									  <h4 className="text-u-c m-b-none">所吃的每一顿饭</h4>
									  <h2 className="m-t-none">
										<span className="text-xs"> 系统预置模板</span>
									  </h2>
									</div>
									<ul className="list-group">
									  
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 地点
									  </li>
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  吃什么
									  </li>
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 跟谁吃
									  </li>
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 钱数
									  </li>
									</ul>
									<div className="panel-footer text-center b-t m-t bg-light lter">
									  <div className="m-t-sm">添加一个属于我自己的PDO~</div>
									  <a onClick={this.props.menuHandleWxl.bind(null, 4,1)} className="btn btn-warning font-bold m">去添加</a>
									</div>
								  </div>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-6">
								  <div className="panel b-a">
									<div className="panel-heading wrapper-xs bg-primary no-border">          
									</div>
									<div className="wrapper text-center b-b b-light">
									  <h4 className="text-u-c m-b-none">所加的每一次油</h4>
									  <h2 className="m-t-none">
										<span className="text-xs"> 系统预置模板</span>
									  </h2>
									</div>
									<ul className="list-group">
									  
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 加油站地点
									  </li>
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  单价
									  </li>
									  <li className="list-group-item">
										&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  总金额
									  </li>
									</ul>
									<div className="panel-footer text-center">
									  <a onClick={this.props.menuHandleWxl.bind(null, 4,2)} className="btn btn-primary font-bold m">去添加</a>
									</div>
								  </div>
								</div>
							</div>	
		   );
			
			
        } else {
            for ( var i = 0; i < this.state.pdos.length; i++ ) {
				var pdo = this.state.pdos[i];//b-l-danger bg-primary
				var colorname ='list-group-item b-l-3x hover-anchor ';
				if(i%6 == 0){
					colorname+='b-l-primary';
				}else if(i%6 == 1){
					colorname+='b-l-info';
				}else if(i%6 == 2){
					colorname+='b-l-success';
				}else if(i%6 == 3){
					colorname+='b-l-warning';
				}else if(i%6 == 4){
					colorname+='b-l-danger';
				}else{
					colorname+='b-l-dark';
				}
				nameitems.push(
						<a key={i} className={colorname}  onClick={this.indexClickHandle.bind( this,i)}>
							<span  className="pull-right text-muted hover-action"><i className="fa fa-times hide"></i></span>
							<span className="block text-ellipsis ">{pdo.name}</span>
						</a>
				);
            }
			
			PDOdetial.push(
							<PDOcom key={0} 
								pdos={this.state.pdos}
								index={this.state.index}
								downloadHandle={this.downloadHandle}
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
						  <div className={theleftwindowclassname}>
							<div className="vbox">
							  <div className="wrapper">
								<div className="h4">我的模板</div>
							  </div>
							  <div className="row-row">
								<div className="cell scrollable hover">
								  <div className="cell-inner">
									<div className="padder">
									  <div className="list-group">
										
										{nameitems}
										
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
								  <div className="cell-inner">
								  {/*右侧 内部*/}
								  <br/><br/>
								 
									<div className="col-sm-1"></div>
									<div className="col-sm-9">
									{PDOdetial}
									</div>
									<div className="col-sm-2"></div>
	
								  {/*右侧 内部 结束*/}
								  </div>
								</div>
							  </div>
							</div>
						  </div>
						  {/*<!-- /column -->*/}
						  
						</div>
						{/*<!-- /hbox layout -->*/}
						
						</div>
					
				  </div>
			  </div>
			
		  </div>
		);
    }
});

module.exports = ViewPDO;


/*



{
	"pdos":
	[
		{"id":"-1","time":1477410877415,"user":"0","name":"坐车","fields":["始点","终点","耗时"]},
		{"id":"-1","time":1477412043598,"user":"0","name":"上学","fields":["伙伴","日期"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]},
		{"id":"-1","time":1477411586548,"user":"0","name":"支付","fields":["金额"]}
	]

}



if(this.state.index == 0){
			items.push(
					<div className="panel b-a">
						<div className="panel-heading text-center bg-info no-border">
						  <h4 className="text-u-c m-b-none">所支付的每一笔钱</h4>
						  <h2 className="m-t-none">
							<span className="text-xs">2016/</span>
							<span className="new1 text-lt"> 3/ 20</span>
								&nbsp;
							<span className="text-xs"> 23:10:4</span>
						  </h2>
						</div>
						<ul className="list-group">
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  日期
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 金额
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  用途
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 支付方式
						  </li>
						</ul>
					  </div>
			);
		}else if(this.state.index == 1){
			items.push(
					<div className="panel b-a">
						<div className="panel-heading text-center bg-info no-border">
						  <h4 className="text-u-c m-b-none">所吃的每一顿饭</h4>
						  <h2 className="m-t-none">
							<span className="text-xs">2016/</span>
							<span className="new1 text-lt"> 3/ 20</span>
								&nbsp;
							<span className="text-xs"> 23:10:4</span>
						  </h2>
						</div>
						<ul className="list-group">
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  日期
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 地点
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  吃什么
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 跟谁吃
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 钱数
						  </li>
						</ul>
					  </div>
			);
		}else if(this.state.index == 2){
			items.push(
					<div className="panel b-a">
						<div className="panel-heading text-center bg-info no-border">
						  <h4 className="text-u-c m-b-none">所加的每一次油</h4>
						  <h2 className="m-t-none">
							<span className="text-xs">2016/</span>
							<span className="new1 text-lt"> 3/ 20</span>
								&nbsp;
							<span className="text-xs"> 23:10:4</span>
						  </h2>
						</div>
						<ul className="list-group">
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  日期
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i> 加油站地点
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  单价
						  </li>
						  <li className="list-group-item">
							&nbsp;<i className="icon-pin text-info m-r-xs">&nbsp;</i>  总金额
						  </li>
						</ul>
					  </div>
			);
		}
		*/