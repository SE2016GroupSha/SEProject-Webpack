require("./../../resource/css/sar/colors.css");
function Orbit_DetailedDataDisplay (props) {
	var item = props.item;
	var colors = props.colors;
	var relatedDatas = props.item.relatedDatas;
	var title = null;
	var date = null;
	var time = null;
	var fields = [];
	var re_title = null;
	var re_list = [];
	var label_style={
		fontSize:"medium",
		padding:"4px", 
		borderRadius:"5px"
	};
	if(item.datetime)
	{
		var currentColor = item.pdoNum % props.nColor;
		title = (
			<div className={"wrapper c-white bg-color-"+currentColor}>
			  <h3 className="m-n font-thin">{item.pdoName} #{item.instanceNumber}</h3>
			</div>
			)
		date = 	(
			<div>
			<label className={"c-white bg-color-"+currentColor} style={label_style}>日期</label>
				<p className="form-control-static font-bold">
				{item.datetime[1]} {item.datetime[2]} {item.datetime[3]} 
				</p>
			</div>
		);
		time = (
			<div>
				<label className={"c-white bg-color-"+currentColor} style={label_style}>时间</label>
				<p className="form-control-static font-bold">
				{item.datetime[4]} {item.datetime[5]} {item.datetime[6]}
				</p>
			</div>
		);
		for(var i = 0; i < item.pdoFields.length; i++)
		{
			var field = (
				<div key = {"attribute_"+i}>
					<label className={"c-white bg-color-"+currentColor} style={label_style}>{item.pdoFields[i]}</label>
					<p className="form-control-static font-bold">
					{item.values[i]}
					</p>
				</div>
			);
			fields.push(field);
		}		
		re_title = (
				<div className="panel-heading" style={{textAlign:"right", fontSize:"large"}}> 
				  <i className="fa fa-link padder"></i>
				  关联数据
				</div>
			);
		for(var i = 0; i < relatedDatas.length; i++)
		{
			var cn = relatedDatas[i].pdoNum % props.nColor;
			var re_data = (
				<tr key = {"relatedDatas_"+i}>                    
				  <td>
				  {relatedDatas[i].date} {relatedDatas[i].time.substring(0,5)}
				  </td>
				  <td  className={"font-thin c-white bg-color-"+cn} >{relatedDatas[i].pdoName} #{relatedDatas[i].instanceNumber}</td>
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
			  <div className="vbox">
				<div className="row-row">
				  <div className="cell scrollable">
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
				</div>
			  </div>
	);
}
module.exports = Orbit_DetailedDataDisplay;