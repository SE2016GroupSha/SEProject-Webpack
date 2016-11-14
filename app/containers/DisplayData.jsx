require('./css/displayData.css');

function DisplayData (props) {
	var datalist=[];
	for(var i = 0; i < props.data.length; i++)
	{
		datalist.push(
			<li className='data' key={"data-"+i}>
				<div className='datetime'>
					<span className="date">{props.data[i].date} </span><br/>
					<span className="time">{props.data[i].time}</span>
				</div>
				<div className='dataicon'>
					<i className="glyphicon glyphic-search"></i>
				</div>
				<div className='info' data-toggle="modal" href="#modal-container-0">
					<span className='title'>{props.data[i].title}</span>
					<span className='tags'>{props.data[i].place}</span>
				</div>
			</li>
		);
	}
	return (
	<div className = 'row'>
		<div className = 'col-xs-12'>
				<div className="modal fade" id="#modal-container-0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
								<h4 className="modal-title" id="myModalLabel">
									标题
								</h4>
							</div>
							<div className="modal-body">
								内容...
							</div>
							<div className="modal-footer">
								 <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button> 
								 <button type="button" className	="btn btn-primary">保存</button>
							</div>
						</div>
					</div>
				</div>
			<ol className="dc">
				{datalist}
			</ol>
		</div>
	</div>
	);
}

module.exports = DisplayData;