require('./css/displayData.css');

function DisplayData (props) {
	var datalist=[];
	for(var i = 0; i < props.datas.length; i++)
	{	
		var tags=[];
		for(var j = 0; j < props.datas[i].values.length; j++)
		{
			tags.push(<div className='tags' key={"data-"+i+"tags-"+j}>
						<i className="glyphicon glyphicon-tags tag-icon"></i>
						<span>{props.datas[i].values[j]}</span>
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
					{tags}
				</div>
				{/*detailedInfo*/}
			</li>
		);
	}
	return (
	<div className = 'row'>
		<div className = 'col-xs-12'>
			<ol className="dc">
				{datalist}
			</ol>
		</div>
	</div>
	);
}

module.exports = DisplayData;