require('./css/displayData.css');

function DisplayData (props) {
	var datalist=[];
	for(var i = 0; i < props.data.length; i++)
	{
		datalist.push(				
			<li className='data' key={"data_"+i}>
				<div className='datetime'>
					<span className="date">{props.data[i].date} </span><br/>
					<span className="time">{props.data[i].time}</span>
				</div>
				<div className='dataicon'>
					<i className="glyphicon glyphic-search"></i>
				</div>
				<div className='info'>
					<span className='title'>{props.data[i].title}</span>
					<span className='tags'>{props.data[i].place}</span>
				</div>
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