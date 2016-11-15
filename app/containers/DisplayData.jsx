require('./css/displayData.css');

function DisplayData (props) {
	var datalist=[];
	for(var i = 0; i < props.datas.length; i++)
	{	
		var tags=[];
		for(var j = 0; j < props.datas[i].values.length; j++)
		{
			tags.push(
					  <div className='tags' key={"data-"+i+"tag-"+j}>
						<i className="glyphicon glyphicon-tags tag-icon"></i>
						<span>{props.datas[i].pdofields[j]}:</span>
						<span style = {{marginLeft: "10px"}}>{props.datas[i].values[j]}</span>
					  </div>);
		}
		datalist.push(
			<li className='data' key={"data-"+i}>
				<div className='datetime'>
					<span className="date">{props.datas[i].date}</span><br/>
					<span className="time">{props.datas[i].time}</span>
				</div>
				<div className='dataicon'>
					<i className="glyphicon glyphic-search"></i>
				</div>
				<div className='info'>
					<div className="title" key={"title-"+i}>{props.datas[i].pdoname}</div>
					{tags}
				</div>
			</li>
		);
	}
	var isEmpty = datalist.length == 0 ? true : false;
	return (
	<div className = 'row'>
		<div className = 'col-xs-12'>
			{	
				isEmpty &&  <div>没有符合条件的结果</div>
			}
			<ol className="dc">{datalist}</ol>
		</div>
	</div>
	);
}

module.exports = DisplayData;