require('./css/displayData.css');

function DisplayData (props) {
	var datalist=[];
	for(var i = 0; i < props.data.length; i++)
	{
		datalist.push(				
			<li className='data' key={"data_"+i}>
				<div className='date'>
					<span>{props.data[i].date} </span>
				</div>
				<div className='pic'>
							
				</div>
				<div className='info'>
					<span className='title'>{props.data[i].title}</span>
					<span className='tags'>{props.data[i].place}</span>
				</div>
				<div className='action'>
					<div className="btn btn-info">详细信息</div>
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