var AddDataPDO = React.createClass( {
    propTypes: {
		AddDataPDOHandle: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
			allpdos: [],
			subStrMap: {},
			items: [],
			currentIndex: -1
        };
    },
    componentDidMount: function() {
		//保存当前作用域的this
		var self = this;
		
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
				
				//手动投递一个空字符串key，显示全部pdo
				var event = {};
				event['target'] = {};
				event['target']['value'] = '';
				self.inputChangeHandle(event);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				//更新state
				self.setState({
					allpdos: [],
					subStrMap: {}
				});
			}
		});
		
		
    },
	itemClickHandle: function(index, event) {
		if (this.state.currentIndex != -1) {
			$("#itemA"+this.state.currentIndex).removeClass('select m-l-none');
			$("#itemSpan"+this.state.currentIndex).removeClass('m-l-none');
		}
		
		$("#itemA"+index).addClass('select m-l-none');
		$("#itemSpan"+index).addClass('m-l-none');
		
		this.setState({
			currentIndex: index
		});
		
		this.props.AddDataPDOHandle('pdo_change', this.state.allpdos[index]);
	},
	inputChangeHandle: function(event) {
		var self = this;
		
		var key = event.target.value;
		var items = [];
		
		//获取pdos以及索引
		var pdos = this.state.allpdos;
		var subMap = this.state.subStrMap;
				
		//空格分割关键字
		var keyArray = key.split(/\s+/);
		keyArray = keyArray.filter(function(e){return e!="";});
		if (keyArray.length==0) {
			keyArray.push("");
		}
				
		//若不存在的关键字，直接空items
		var flag = true;
		keyArray.forEach(
			function (key) {
				if (typeof(subMap[key])=='undefined') {
					flag = false;
				}
			}
		);
		if (flag == false) {
			//更新state
			this.setState({
				items: []
			});
			return;
		}
				
		//计算交集
		var indexSet = new Set();
		var baseKey = keyArray[0];
		subMap[baseKey].forEach(
			function (index) {
				var indexFlag = true;
				for (var i=0; i<keyArray.length; i++) {
					if (!subMap[keyArray[i]].has(index)) {
						indexFlag = false;
						break;
					}
				}
				if (indexFlag) {
					indexSet.add(index);
				}
			}
		);
				
		//生成items
		indexSet.forEach(
			function (index) {
				items.push(
						<a key={index} id={"itemA"+index} className="list-group-item m-l" onClick={self.itemClickHandle.bind(null, index)}>
							<span id={"itemSpan"+index} className="block text-ellipsis m-l-n text-md">
							<i className="fa fa-edit fa-fw m-r-xs" ></i>
								{pdos[index]['name']}
							</span>
						</a>
				);
			}
		);
		
		//更新state
		this.setState({
			items: items
		});

		return;
	},
    render: function() {
		return (
			  <div className="col w-lg lter b-r">
				<div className="vbox">
				  <div className="wrapper-xs b-b">
					<div className="input-group m-b-xxs">
					  <span className="input-group-addon input-sm no-border no-bg"><i className="icon-magnifier text-md m-t-xxs"></i></span>
					  <input type="text" className="form-control input-sm no-border no-bg text-md" placeholder="搜索模板" onChange={this.inputChangeHandle}></input>
					</div>
				  </div>
				  <div className="row-row">
					<div className="cell scrollable hover">
					  <div className="cell-inner">
						<div className="m-t-n-xxs" style={{marginBottom:'50px'}}>
						  <div className="list-group list-group-lg no-radius no-border no-bg m-b-none">
						  
							{this.state.items}
							
						  </div>
						</div>
						{this.state.items.length==0
						?
						<div className="text-center pos-abt w-full" style={{top:'40%'}}><span>没有符合的模板</span></div>
						:
						null
						}
						
					  </div>
					</div>
				  </div>

				</div>
			  </div>
		);
    }
});

module.exports = AddDataPDO;
