var XLSX = require('xlsx');

var ExcelUtils = {
	
	readPDOFromExcel: function(data, status, pdos, errorMsg) {
		
		function pdoCheckNames(names) { //['上学','吃饭']
		
			var ret = {}; //{'上学':'true','吃饭':'false'}

			var httpParams = {};
			httpParams['names'] = names;
			$.ajax({
				async: false,//同步
				type:"POST",
				cache: false,
				url: "api/pdo/checknames",
				data: {'params':JSON.stringify(httpParams)},
				dataType: "json",
				success: function(data) {
					ret = data;
				},
				error: function (jqXHR, textStatus, errorThrown) {
					ret = {};
				}
			});
			
			return ret;
		}
		
		//合法性: 文件格式
		try {
			var workbook = XLSX.read(data, {type: 'binary'});
			var sheetNames = workbook.SheetNames; 
			var worksheet = workbook.Sheets[sheetNames[0]];
		} catch(err) {
			status['state'] = 'error';
			errorMsg.push('文件错误: 文件格式不正确');
			return;
		}
		
		//console.log(worksheet);
		
		//合法性: 至少存在一张工作表
		if (typeof worksheet == 'undefined') {
			status['state'] = 'error';
			errorMsg.push('文件错误: 未发现工作表');
			return;
		}
		
		//合法性: 判断合并单元格
		var merge = worksheet['!merges'];
		if (typeof merge != 'undefined') {
			status['state'] = 'error';
			for (var i=0; i<merge.length; i++) {
				var leftup = XLSX.utils.encode_cell(merge[i]['s']);
				var rightdown = XLSX.utils.encode_cell(merge[i]['e']);
				errorMsg.push('格式错误: 发现合并的单元格[' + leftup + ', ' + rightdown + ']');
			}
			return;
		}
		
		//合法性: 判断空表
		var cells = [];
		for (var cell in worksheet) {
			if(cell[0] === '!') {
				continue;
			}
			cells.push(cell);
		}
		if (cells.length==0) {
			status['state'] = 'error';
			errorMsg.push('文件错误: 工作表为空表');
			return;
		}
		
		
		//合法性: 判断列名(这个可能会是多余的, 暂时保留)
		var cellDetails = [];
		var re = /([A-Z]+)(\d+)$/;
		for (var i=0; i<cells.length; i++) {
			var r = re.exec(cells[i]);
			if (r) {
				cellDetails.push({addr:cells[i],r:r[2],c:r[1]});
			} else {
				status['state'] = 'error';
				errorMsg.push('文件错误: 列名格式不正确');
				return;
			}
		}
		
		
		//合法性: 仅有第一行
		var oneFlag = true;
		for (var i=0; i<cellDetails.length; i++) {
			if (cellDetails[i]['r'] != '1') {
				oneFlag = false;
				break;
			}
		}
		if (oneFlag) {
			status['state'] = 'error';
			errorMsg.push('文件错误: 未发现有效数据行');
			return;
		}
		
		
		//合法性: 判断列范围(这个限制是可选的)
		var colFlag = false;
		cellDetails.sort(function(c1, c2) {
			if (c1['c'].length==c2['c'].length) {
				return c1['c'] > c2['c'] ? 1 : -1;
			} else {
				return c1['c'].length > c2['c'].length ? 1 : -1;
			}
		});
		if (cellDetails[cellDetails.length-1]['c'].length > 2) {
			colFlag = true;
		} else if (cellDetails[cellDetails.length-1]['c'].length < 2) {
			colFlag = false;
		} else {
			if (cellDetails[cellDetails.length-1]['c'] > 'IV') {
				colFlag = true;
			} else {
				colFlag = false;
			}
		}
		if (colFlag) {
			status['state'] = 'error';
			errorMsg.push('文件错误: 最大列超过256');
			return;
		}
		
		
		//构建行数据数组, 列有序
		var rowsArray = {}; //{'2':['A2','IA2'],'56':['C56','AC56','DC56']}
		for (var i=0; i<cellDetails.length; i++) {
			var row = cellDetails[i]['r'];
			if (row != '1') {
				if (typeof rowsArray[row] == 'undefined') {
					rowsArray[row] = [];
				}
				rowsArray[row].push(cellDetails[i]['c']);
			}
		}
		for (row in rowsArray) {
			rowsArray[row].sort(function(c1, c2) {
				if (c1.length==c2.length) {
					return c1 > c2 ? 1 : -1;
				} else {
					return c1.length > c2.length ? 1 : -1;
				}
			});
		}
		
		//console.log(rowsArray);
		
		//开始验证数据合法性
		
		//逐行检查模板完整性
		var nameHash = {}; //{'上学':['1','5'],'吃饭':['5']}
		for (row in rowsArray) {
			var cols = rowsArray[row];
			var colsHash = {};
			//时间字段警告 & 收集colsHash
			for (var i=0; i<cols.length; i++) {
				colsHash[cols[i]] = '';
				if (worksheet[cols[i]+row].v=='时间') {
					status['state'] = 'warning';
					errorMsg.push('格式警告: 第' + row + '行存在\'时间\'字段(位置: '+ (cols[i]+row) + ')');
				}
			}
			//模板名不为空
			if (typeof colsHash['A'] == 'undefined') {
				status['state'] = 'error';
				errorMsg.push('格式错误: 第' + row + '行模板名称为空(位置: '+ ('A'+row) + ')');
			}
			//首字段不为空
			if (typeof colsHash['B'] == 'undefined') {
				status['state'] = 'error';
				errorMsg.push('格式错误: 第' + row + '行首字段为空(位置: '+ ('B'+row) + ')');
			}
			//收集nameHash
			if (typeof colsHash['A'] != 'undefined') {
				var name = worksheet['A'+row].v;
				if (typeof nameHash[name] == 'undefined') {
					nameHash[name] = [];
				}
				nameHash[name].push(row);
			}
		}
		//相同模板名称检查
		var nameParam = [];
		for (name in nameHash) {
			nameParam.push(name);
			if (nameHash[name].length > 1) {
				status['state'] = 'error';
				var msg = '格式错误: ';
				msg = msg + '模板名称\'';
				msg = msg + name;
				msg = msg + '\'出现多次(行数: [';
				for (var i=0; i<nameHash[name].length-1; i++) {
					msg = msg + nameHash[name][i] + ', ';
				}
				msg = msg + nameHash[name][nameHash[name].length-1];
				msg = msg + '])';
				errorMsg.push(msg);
			}
		}
		//远程模板名称重复检测
		var valids = pdoCheckNames(nameParam);
		if (JSON.stringify(valids)=='{}') {
			status['state'] = 'error';
			errorMsg.push('网络错误: 网络未连通');
		}
		for (name in valids) {
			if (valids[name] == 'false') {
				status['state'] = 'error';
				var msg = '格式错误: ';
				msg = msg + '模板名称\'';
				msg = msg + name;
				msg = msg + '\'在远程已存在(行数: [';
				if (nameHash[name].length==1) {
					msg = msg + nameHash[name][0];
				} else {
					for (var i=0; i<nameHash[name].length-1; i++) {
						msg = msg + nameHash[name][i] + ', ';
					}
					msg = msg + nameHash[name][nameHash[name].length-1];
				}
				msg = msg + '])';
				errorMsg.push(msg);
			}
		}
		
		//console.log(nameHash);
		
		//console.log(valids);
		
		//失败, 直接返回
		if (status['state'] == 'error') {
			return;
		}
		
		//成功, 构造参数
		for (row in rowsArray) {
			var pdo = {};
			pdo['id'] = '-1';
			pdo['time'] = new Date().getTime();
			pdo['user'] = '-1';
			pdo['name'] = worksheet['A'+row].v;
			pdo['fields'] = [];
			for (var i=1; i<rowsArray[row].length; i++) {
				pdo['fields'].push(worksheet[rowsArray[row][i]+row].v);
			}
			pdos.push(pdo);
		}
		
		//console.log(rowsArray);
		
		//console.log(pdos);
		
		
		if (status['state'] != 'warning') {
			status['state'] = 'success'
		}
		return;

	},
	readDataFromExcel:function(data, status, pdos, datas, errorMsg){
		var flag ='success';
		if(flag=='warning'){
			status['state']='warning';
			//格式警告
			errorMsg.push('格式警告:1111');
			errorMsg.push('格式警告:122221');
			var pdo = {};
			pdo['id'] = '-1';
			pdo['time'] = new Date().getTime();
			pdo['user'] = '-1';
			pdo['name'] = 'lushen'
			pdo['fields'] = [];
			for (var i=1; i<3; i++) {
				pdo['fields'].push('路神和'+i+'吃饭');
			}
			pdos.push(pdo);
			
			var data = {};
			data['id']='-1';
			data['time']= new Date().getTime();
			data['pdo']='1';
			data['values']=[];
			for (var i=1; i<3; i++) {
				data['values'].push('路神和'+i+'吃饭');
			}
			data['related_data']=[];
			datas.push(data);
			
		}else if(flag=='error'){
			status['state']='error';
			errorMsg.push('格式错误:1111');
			errorMsg.push('格式警告:122221');
		}else{
			status['state']='success';
			var pdo = {};
			pdo['id'] = '-1';
			pdo['time'] = new Date().getTime();
			pdo['user'] = '-1';
			pdo['name'] = 'lushen'
			pdo['fields'] = [];
			for (var i=1; i<3; i++) {
				pdo['fields'].push('路神和'+i+'吃饭');
			}
			pdos.push(pdo);
			
			var data = {};
			data['id']='-1';
			data['time']= new Date().getTime();
			data['pdo']='1';
			data['values']=[];
			for (var i=1; i<3; i++) {
				data['values'].push('路神和'+i+'吃饭');
			}
			data['related_data']=[];
			datas.push(data);
		}
		return ;
	}
	
	
};

module.exports = ExcelUtils;