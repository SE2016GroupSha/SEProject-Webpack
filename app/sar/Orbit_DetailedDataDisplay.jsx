function Orbit_DetailedDataDisplay (props) {
	console.log(props.item);
	var item = props.item;
	var title = null;
	var date = null;
	var time = null;
	var fields = [];
	var wrapper_style = {
		backgroundColor: item.pdoColor,
		color:"white"
	};
	var label_style={
		fontSize:"large",
		backgroundColor: item.pdoColor,
		color:"white", 
		padding:"2px", 
		borderRadius:"1px"
	};
	if(item.datetime)
	{
		title = (
			<div className="wrapper" style={wrapper_style}>
			  <h3 className="m-n font-thin">{item.pdoName}# {item.instanceNumber}</h3>
			</div>
			)
		date = 	(
			<div>
				<label className="" style={label_style}>日期</label>
				<p className="form-control-static">
				{item.datetime[1]} {item.datetime[2]} {item.datetime[3]} 
				</p>
			</div>
		);
		time = (
			<div>
				<label className="" style={label_style}>时间</label>
				<p className="form-control-static">
				{item.datetime[4]} {item.datetime[5]} {item.datetime[6]}
				</p>
			</div>
		);
		for(var i = 0; i < item.pdoFields.length; i++)
		{
			var field = (
				<div key = {"attribute_"+i}>
					<label className="" style={label_style}>{item.pdoFields[i]}</label>
					<p className="form-control-static">
					{item.values[i]}
					</p>
				</div>
			);
			fields.push(field);
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
			  
			</div>
	);
}
module.exports = Orbit_DetailedDataDisplay;