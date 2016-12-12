var XLSX = require('xlsx');

var ExcelUtils = {
	
	getPdoNameMap: function(pdoNameMap) {
		var ret = true;

		//ajax获取全部pdo
		$.ajax({
			async: false,
			type:"POST",
			cache: false,
			url: "api/pdo/all",
			data: {'params':''},
			dataType: "json",
			success: function(data) {
				//生成pdo的map
				var pdos = data['pdos'];
				for (var i=0; i<pdos.length; i++) {
					pdoNameMap[pdos[i]['name']] = pdos[i];
				}
				ret = true;
			},
			error: function (jqXHR, textStatus, errorThrown) {
				ret = false;
			}
		});
		return ret;
	},
	
	
	readPDOFromExcel: function(data, status, pdos, errorMsg) {
		
		//合法性: 网络连通
		var pdoNameMap = {};
		var netok = this.getPdoNameMap(pdoNameMap);
		if (!netok) {
			status['state'] = 'error';
			errorMsg.push('网络错误:网络未连通');
			return;
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
		var rowsArray = {}; //{'2':['A','IA'],'56':['C','AC','DC']}
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
		
		console.log(rowsArray);
		
		//开始验证数据合法性
		
		//逐行检查模板完整性
		var nameHash = {}; //{'上学':['1','5'],'吃饭':['5']}
		for (row in rowsArray) {
			var cols = rowsArray[row];
			var colsHash = {};
			//时间字段警告 & 收集colsHash
			for (var i=0; i<cols.length; i++) {
				colsHash[cols[i]] = '';
				if ((worksheet[cols[i]+row].v+'')=='时间') {
					if (status['state'] != 'error') {
						status['state'] = 'warning';
					}
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
				var name = worksheet['A'+row].v+'';
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
		for (var i=0; i<nameParam.length; i++) {
			var name = nameParam[i];
			if (typeof pdoNameMap[name] != 'undefined') {
				status['state'] = 'error';
				var msg = '格式错误: ';
				msg = msg + '模板名称\'';
				msg = msg + name;
				msg = msg + '\'在远程已存在(行数: [';
				if (nameHash[name].length==1) {
					msg = msg + nameHash[name][0];
				} else {
					for (var j=0; j<nameHash[name].length-1; j++) {
						msg = msg + nameHash[name][j] + ', ';
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
			pdo['name'] = worksheet['A'+row].v+'';
			pdo['fields'] = [];
			for (var i=1; i<rowsArray[row].length; i++) {
				pdo['fields'].push(worksheet[rowsArray[row][i]+row].v+'');
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
	

	readDataFromExcel: function(data, status, pdos, datas, errorMsg) {

		//合法性: 网络连通
		var pdoNameMap = {};
		var netok = this.getPdoNameMap(pdoNameMap);
		if (!netok) {
			status['state'] = 'error';
			errorMsg.push('网络错误:网络未连通');
			return;
		}
		
		//合法性: 文件格式
		try {
			var workbook = XLSX.read(data, {type: 'binary'});
			var sheetNames = workbook.SheetNames; 
			var worksheets = [];
			for (var i=0; i<sheetNames.length; i++) {
				worksheets[i] = workbook.Sheets[sheetNames[i]];
			}
		} catch(err) {
			status['state'] = 'error';
			errorMsg.push('文件错误: 文件格式不正确');
			return;
		}
		
		//console.log(worksheet);
		
		//合法性: 至少存在一张工作表
		if (worksheets.length == 0) {
			status['state'] = 'error';
			errorMsg.push('文件错误: 未发现工作表');
			return;
		}
		
		
		//合法性: 工作表名称不重复
		var sheetNameFlag = false;
		for (var i=0; i<sheetNames.length-1; i++) {
			for (var j=i+1; j<sheetNames.length; j++) {
				if (sheetNames[i]==sheetNames[j]) {
					status['state'] = 'error';
					errorMsg.push('文件错误: 工作表1与工作表3名称重复');
					sheetNameFlag = true;
				}
			}
		}
		if (sheetNameFlag) {
			return;
		}
		
		//遍历全部工作表
		for (var c=0; c<worksheets.length; c++) {
			
			var sheetName = sheetNames[c];
			var worksheet = worksheets[c];
			var prefix = '[工作表'+(c+1)+':'+sheetName+']';
			
			
			//合法性: 判断合并单元格
			var merge = worksheet['!merges'];
			if (typeof merge != 'undefined') {
				status['state'] = 'error';
				for (var i=0; i<merge.length; i++) {
					var leftup = XLSX.utils.encode_cell(merge[i]['s']);
					var rightdown = XLSX.utils.encode_cell(merge[i]['e']);
					errorMsg.push(prefix + '格式错误: 发现合并的单元格[' + leftup + ', ' + rightdown + ']');
				}
				continue;
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
				errorMsg.push(prefix + '文件错误: 工作表为空表');
				continue;
			}
			
			
			//合法性: 判断列名(这个可能会是多余的, 暂时保留)
			var cellDetails = [];
			var re = /([A-Z]+)(\d+)$/;
			var colNameFlag = false;
			for (var i=0; i<cells.length; i++) {
				var r = re.exec(cells[i]);
				if (r) {
					cellDetails.push({addr:cells[i],r:r[2],c:r[1]});
				} else {
					status['state'] = 'error';
					errorMsg.push(prefix + '文件错误: 列名格式不正确');
					colNameFlag = true;
					break;;
				}
			}
			if (colNameFlag) {
				continue;
			}
			
			
			//合法性: 第一行不为空
			var oneFlag = true;
			for (var i=0; i<cellDetails.length; i++) {
				if (cellDetails[i]['r'] == '1') {
					oneFlag = false;
					break;
				}
			}
			if (oneFlag) {
				status['state'] = 'error';
				errorMsg.push(prefix + '文件错误: 第一行为空行');
				continue;
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
				errorMsg.push(prefix + '文件错误: 最大列超过256');
				continue;
			}
			
			
			
			//构建行数据数组, 列有序
			var rowsArray = {}; //{'2':['A','IA'],'56':['C','AC','DC']}
			for (var i=0; i<cellDetails.length; i++) {
				var row = cellDetails[i]['r'];
				if (typeof rowsArray[row] == 'undefined') {
					rowsArray[row] = [];
				}
				rowsArray[row].push(cellDetails[i]['c']);
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
			
			console.log(rowsArray);
			
			//开始验证数据合法性
			
			//合法性: 第一行同时有日期和时间，或同时没有 & 自定义日期时间字段警告
			var firstLineCols = rowsArray['1'];
			var dateCount = 0;
			var timeCount = 0;
			for (var i=0; i<firstLineCols.length; i++) {
				if ((worksheet[firstLineCols[i]+'1'].v+'')=='日期') {
					dateCount++;
				}
				if ((worksheet[firstLineCols[i]+'1'].v+'')=='时间') {
					timeCount++;
				}
				if ((worksheet[firstLineCols[i]+'1'].v+'')=='#日期') {
					if (status['state'] != 'error') {
						status['state'] = 'warning';
					}
					errorMsg.push(prefix + '格式警告: 存在自定义的\'日期\'字段(位置: '+ (firstLineCols[i]+'1') + ')');
				}
				if ((worksheet[firstLineCols[i]+'1'].v+'')=='#时间') {
					if (status['state'] != 'error') {
						status['state'] = 'warning';
					}
					errorMsg.push(prefix + '格式警告: 存在自定义的\'时间\'字段(位置: '+ (firstLineCols[i]+'1') + ')');
				}
			}
			if (!((dateCount==0&&timeCount==0)||(dateCount==1&&timeCount==1))) {
				status['state'] = 'error';
				errorMsg.push(prefix + '文件错误: \'日期\'与\'时间\'两字段必须同时存在或同时不存在，且只能出现一次');
				continue;
			}
			
			
			//确定日期时间列
			var datetimeFlag = false;
			var dateCol = '';
			var timeCol = '';
			if (dateCount==1&&timeCount==1) {
				datetimeFlag = true;
				for (var i=0; i<firstLineCols.length; i++) {
					if ((worksheet[firstLineCols[i]+'1'].v+'')=='日期') {
						dateCol = firstLineCols[i];
					}
					if ((worksheet[firstLineCols[i]+'1'].v+'')=='时间') {
						timeCol = firstLineCols[i];
					}
					
				}
			}
			
			//确定非日期时间列
			var newfirstLineCols = [];
			for (var i=0; i<firstLineCols.length; i++) {
				if (firstLineCols[i]!=dateCol && firstLineCols[i]!=timeCol) {
					newfirstLineCols.push(firstLineCols[i]);
				}
			}
			
			
			//合法性: 第一行字段名称不重复
			var fieldsFlag = false;
			var wrongNames = {};
			for (var i=0; i<firstLineCols.length-1; i++) {
				for (var j=i+1; j<firstLineCols.length; j++) {
					if ((worksheet[firstLineCols[i]+'1'].v+'') == (worksheet[firstLineCols[j]+'1'].v+'')) {
						wrongNames[(worksheet[firstLineCols[i]+'1'].v+'')] = '';
						fieldsFlag = true;
					}
				}
			}
			if (fieldsFlag) {
				status['state'] = 'error';
				var wrongNamesArray = [];
				for (var name in wrongNames) {
					wrongNamesArray.push(name);
				}
				var msg = '[';
				if (wrongNamesArray.length==1) {
					msg = msg + wrongNamesArray[0];
				} else {
					for (var i=0; i<wrongNamesArray.length-1; i++) {
						msg = msg + wrongNamesArray[i] + ', ';
					}
					msg = msg + wrongNamesArray[wrongNamesArray.length-1];
				}
				msg = msg + ']';
				errorMsg.push(prefix + '文件错误: 字段名称有重复'+msg);
				continue;
			}
			
			

			
			//合法性: 远程同名模板结构一致
			if (typeof pdoNameMap[sheetName] != 'undefined') {
				var remotePDOfields = pdoNameMap[sheetName]['fields'];
				var msg = '[';
				if (remotePDOfields.length==1) {
					msg = msg + remotePDOfields[0];
				} else {
					for (var i=0; i<remotePDOfields.length-1; i++) {
						msg = msg + remotePDOfields[i] + ', ';
					}
					msg = msg + remotePDOfields[remotePDOfields.length-1];
				}
				msg = msg + ']';
				
				if (remotePDOfields.length != newfirstLineCols.length) {
					status['state'] = 'error';
					//console.log('aa');
					//console.log(pdoNameMap[sheetName]);
					errorMsg.push(prefix + '文件错误: 模板['+ sheetName +']远程已存在，但Excel与远程模板不一致(['+ sheetName +']:'+msg+')');
					continue;
				}
				var findFlag = true;
				for (var i=0; i<newfirstLineCols.length; i++) {
					var tmpFlag = false;
					for (var j=0; j<remotePDOfields.length; j++) {
						var field = worksheet[newfirstLineCols[i]+'1'].v+'';
						if (field == '#日期') {
							field = '日期';
						}
						if (field == '#时间') {
							field = '时间';
						}
						if (remotePDOfields[j] == field) {
							tmpFlag = true;
							break;
						}
					}
					if (!tmpFlag) {
						findFlag = false;
						break;
					}
				}
				if (!findFlag) {
					status['state'] = 'error';
					//console.log('bb');
					//console.log(pdoNameMap[sheetName]);
					errorMsg.push(prefix + '文件错误: 模板['+ sheetName +']远程已存在，但Excel与远程模板不一致(['+ sheetName +']:'+msg+')');
					continue;
				}
			}
			
			
			//新模板添加到pdos中
			var newPDOFlag = false;
			var pdo = {};
			if (typeof pdoNameMap[sheetName] == 'undefined') {
				newPDOFlag = true;
				//{"id":"1", "time":1477410877415, "user":"0", "name":"坐车", "fields":["始点", "终点", "耗时"]}
				pdo['id'] = '-1';
				pdo['time'] = new Date().getTime();
				pdo['user'] = '-1';
				pdo['name'] = sheetName+'';
				pdo['fields'] = [];
				for (var i=0; i<newfirstLineCols.length; i++) {
					if ((worksheet[newfirstLineCols[i]+'1'].v+'') == '#日期') {
						pdo['fields'].push('日期');
					} else if ((worksheet[newfirstLineCols[i]+'1'].v+'') == '#时间') {
						pdo['fields'].push('时间');
					} else {
						pdo['fields'].push(worksheet[newfirstLineCols[i]+'1'].v+'');
					}
				}
				pdos.push(pdo);
			}
			
			
			//检验数据行 & 构造数据
			//var rowsArray = {}; //{'2':['A','IA'],'56':['C','AC','DC']}
			//var firstLineCols = rowsArray['1'];
			//var newfirstLineCols = [];
			//var datetimeFlag = false;
			//var dateCol = '';
			//var timeCol = '';
			//var newPDOFlag = false;
			//var pdo = {};
			for (var row in rowsArray) {
				if (row != '1') {
					//{"id":"4", "time":1477412545804, "pdo": "1", "values": ["家", "学校", "10分钟"], "related_data": []}
					var data = {};
					data['id'] = '-1';
					data['time'] = new Date().getTime(); //下方fix
					data['pdo'] = sheetName+''; //统一fix
					data['values'] = []; //下方fix
					data['related_data'] = [];
					
					//values
					var fieldsIndexMap = {};
					if (newPDOFlag) {
						for (var i=0; i<pdo['fields'].length; i++) {
							fieldsIndexMap[pdo['fields'][i]] = i;
						}
					} else {
						for (var i=0; i<pdoNameMap[sheetName]['fields'].length; i++) {
							fieldsIndexMap[pdoNameMap[sheetName]['fields'][i]] = i;
						}
					}
					
					for (var i=0; i<newfirstLineCols.length; i++) {
						var field = worksheet[newfirstLineCols[i]+'1'].v+'';
						if (typeof worksheet[newfirstLineCols[i]+row] == 'undefined') {
							status['state'] = 'error';
							errorMsg.push(prefix + '格式错误: 第' + row + '行\''+ field +'\'字段的值为空(位置: '+ (newfirstLineCols[i]+row) + ')');
							continue;
						}
						
						if (field == '#日期') {
							field = '日期'
						}
						if (field == '#时间') {
							field = '时间'
						}
						data['values'][fieldsIndexMap[field]] = worksheet[newfirstLineCols[i]+row].v+'';
					}
					
					//time
					var datetimeWrongFlag = false;
					if (datetimeFlag) {
						
						//日期
						if (typeof worksheet[dateCol+row] == 'undefined') {
							//判断日期空
							status['state'] = 'error';
							errorMsg.push(prefix + '格式错误: 第' + row + '行\'日期\'字段的值为空(位置: '+ (dateCol+row) + ')');
							datetimeWrongFlag = true;
						} else {
							var date = worksheet[dateCol+row].v+'';
							if (date.length!=10 || date.substring(4,5)!='-' || date.substring(7,8)!='-') {
								//判断长度为10，符合格式xxxx-xx-xx
								status['state'] = 'error';
								errorMsg.push(prefix + '格式错误: 第' + row + '行\'日期\'格式错误1(建议将单元格调整为文本格式)(位置: '+ (dateCol+row) + ')');
								datetimeWrongFlag = true;
							} else {
								var testDate = Date.parse(date.substring(5,7)+'-'+date.substring(8,10)+'-'+date.substring(0,4)+' '+'00:00:00');
								if (isNaN(testDate)) {
									//判断格式xxxx-xx-xx的日期是否合法
									status['state'] = 'error';
									errorMsg.push(prefix + '格式错误: 第' + row + '行\'日期\'格式错误2(建议将单元格调整为文本格式)(位置: '+ (dateCol+row) + ')');
									datetimeWrongFlag = true;
								}
							}
						}
						

						//时间
						if (typeof worksheet[timeCol+row] == 'undefined') {
							//判断时间空
							status['state'] = 'error';
							errorMsg.push(prefix + '格式错误: 第' + row + '行\'时间\'字段的值为空(位置: '+ (timeCol+row) + ')');
							datetimeWrongFlag = true;
						} else {
							var time = worksheet[timeCol+row].v+'';
							if (time.length!=5 || time.substring(2,3)!=':') {
								//判断长度为5，符合格式xx:xx
								status['state'] = 'error';
								errorMsg.push(prefix + '格式错误: 第' + row + '行\'时间\'格式错误1(建议将单元格调整为文本格式)(位置: '+ (timeCol+row) + ')');
								datetimeWrongFlag = true;
							} else {
								var testTime = Date.parse('01-01-2000'+' '+time+':00');
								if (isNaN(testTime)) {
									//判断格式xx:xx的时间是否合法
									status['state'] = 'error';
									errorMsg.push(prefix + '格式错误: 第' + row + '行\'时间\'格式错误2(建议将单元格调整为文本格式)(位置: '+ (timeCol+row) + ')');
									datetimeWrongFlag = true;
								}
							}
						}
						
						if (!datetimeWrongFlag) {
							//综合判断日期和时间
							var realDateTime = Date.parse(date.substring(5,7)+'-'+date.substring(8,10)+'-'+date.substring(0,4)+' '+time+':00');
							if (isNaN(realDateTime)) {
								status['state'] = 'error';
								errorMsg.push(prefix + '格式错误: 第' + row + '行\'日期\'格式错误3(建议将单元格调整为文本格式)(位置: '+ (dateCol+row) + ')');
								errorMsg.push(prefix + '格式错误: 第' + row + '行\'时间\'格式错误3(建议将单元格调整为文本格式)(位置: '+ (timeCol+row) + ')');
								datetimeWrongFlag = true;
							}
						}
						
						data['time'] = realDateTime;
					}
					if (datetimeWrongFlag) {
						continue;
					}
					
					//添加到返回
					datas.push(data);
					
				}
			}
						
		}
		
		//失败, 直接返回
		if (status['state'] == 'error') {
			return;
		}
		
		//判断成功
		if (status['state'] != 'warning') {
			status['state'] = 'success'
		}
		
		return;

	},
	
	fixData: function(status, datas, errorMsg) {
		//合法性: 网络连通
		var pdoNameMap = {};
		var netok = this.getPdoNameMap(pdoNameMap);
		if (!netok) {
			status['state'] = 'error';
			errorMsg.push('网络错误:网络未连通');
			return;
		}
		
		for (var i=0; i<datas.length; i++) {
			if (typeof pdoNameMap[datas[i]['pdo']] == 'undefined') {
				status['state'] = 'error';
				errorMsg.push('其他错误:内部错误');
				return;
			}
			datas[i]['pdo'] = pdoNameMap[datas[i]['pdo']]['id'];
		}
	}
	
};

module.exports = ExcelUtils;