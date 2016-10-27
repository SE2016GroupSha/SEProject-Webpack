require('./css/displayData.css')
function DisplayData (props) {
	var num = '12321';
	return (
	<div className = 'row'>
		<div className = 'col-xs-12'>
		
			<ul className='ulArea'>
				<li className='liArea'>
				
					<div className='divArea'>
						(标题)万小玲珑和陆神一起吃饭
					</div>
					
					<div className='divArea'>
						(字段)日期: 2020-15-37 <br/>
						(字段)地点：黑店 <br/>
						(字段)其他字段：...
					</div>
					
					<div className='divArea'>
						
					</div>
					
				</li>
				<li className='liArea'>
					<div className='divArea'>
						(标题)万小玲珑和陆神一起吃饭
					</div>
					
					<div className='divArea'>
						(字段)日期: 2020-15-37 <br/>
						(字段)地点：黑店 <br/>
						(字段)其他字段：...
					</div>
					
					<div className='divArea'>
						
					</div>				
				</li>
				<li></li>
			</ul>
			
		</div>
	</div>
	);
}
DisplayData.propTypes = {
	
}

module.exports = DisplayData;