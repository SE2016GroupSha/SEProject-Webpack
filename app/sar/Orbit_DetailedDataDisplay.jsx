function Orbit_DetailedDataDisplay (props) {
	console.log(props.item);
	var item = props.item;
	var relatedDatas = props.item.relatedDatas;
	var title = null;
	var date = null;
	var time = null;
	var fields = [];
	var re_title = null;
	var re_list = [];
	var wrapper_style = {
		backgroundColor: item.pdoColor,
		color:"white"
	};
	var label_style={
		fontSize:"medium",
		backgroundColor: item.pdoColor,
		color:"white", 
		padding:"4px", 
		borderRadius:"5px"
	};
	if(item.datetime)
	{
		title = (
			<div className="wrapper" style={wrapper_style}>
			  <h3 className="m-n font-thin">{item.pdoName} #{item.instanceNumber}</h3>
			</div>
			)
		date = 	(
			<div>
				<label className="" style={label_style}>日期</label>
				<p className="form-control-static font-bold">
				{item.datetime[1]} {item.datetime[2]} {item.datetime[3]} 
				</p>
			</div>
		);
		time = (
			<div>
				<label className="" style={label_style}>时间</label>
				<p className="form-control-static font-bold">
				{item.datetime[4]} {item.datetime[5]} {item.datetime[6]}
				</p>
			</div>
		);
		for(var i = 0; i < item.pdoFields.length; i++)
		{
			var field = (
				<div key = {"attribute_"+i}>
					<label className="" style={label_style}>{item.pdoFields[i]}</label>
					<p className="form-control-static font-bold">
					{item.values[i]}
					</p>
				</div>
			);
			fields.push(field);
		}		
		re_title = (
				<div className="panel-heading" style={{textAlign:"right", fontSize:"large"}}> 
				  关联数据
				  <i className="fa fa-link padder"></i>
				</div>
			);
		for(var i = 0; i < relatedDatas.length; i++)
		{
			var style = {
				backgroundColor: relatedDatas[i].pdoColor,
				color:"white"
			};
			var re_data = (
				<tr key = {"relatedDatas_"+i}>                    
				  <td>
				  {relatedDatas[i].date}
				  </td>
				  <td  className="font-thin" style={style}>{relatedDatas[i].pdoName} #{relatedDatas[i].instanceNumber}</td>
				</tr>
			)
			re_list.push(re_data);
		}
		if(re_list.length == 0)
		{
			re_list =
				<div style={{textAlign:"center", fontSize:"medium"}}>无关联数据</div>
		}
	}
	else{
		title = (
		<div className="wrapper">
		  <h3 className="m-n font-thin">点击标签查看详细信息</h3>
		</div>
		)
	}
	return (
			<div className="col w-lg bg-light dk b-r bg-auto">
			  {title}
			  <div className="wrapper">
			  {date}
			  {time}
			  {fields}
			  </div>
			    {re_title}
				<table className="table table-striped m-b-none">
				  <tbody>
				  {re_list}
				  </tbody>
				</table>
			</div>
	);
}
module.exports = Orbit_DetailedDataDisplay;