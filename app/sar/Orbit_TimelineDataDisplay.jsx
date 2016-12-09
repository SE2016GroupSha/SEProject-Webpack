require("./../../resource/css/sar/Orbit_timeline.css");
function Orbit_TimelineDataDisplay (props) {
	var items = props.items;
	var html_tl_item;
	var html_tl_list = [];
	if(items != [])
	{	
		for(var i = 0; i < items.length; i++)
		{
			var wrap_style = {
				borderColor:items[i].pdoColor
			};
			var content_style = {
				color:"white",
				backgroundColor:items[i].pdoColor
			}
			html_tl_item = (
				<li className={"tl-item"+(items[i].isLeft?" tl-left":"")} key = {"tl_list_item_"+i}>
				  <div id={"wrap_"+i} className="tl-wrap b-success" style = {wrap_style} onClick = {props.onClick}>
					<span id={"date_"+i} className="tl-date">{items[i].date}</span>
					<div id={"content_"+i} className="tl-content panel padder" style={content_style}>
					  <span id={"arrowl_"+i}className="arrow left pull-up hidden-left"></span>
					  <span id={"arrowr_"+i}className="arrow right pull-up visible-left"></span>
					<div id={"text_"+i} className="text-lt">
					  {items[i].pdoName}#{items[i].instanceNumber} ({items[i].pdoDisplayTag.name}: {items[i].pdoDisplayTag.value})
					</div>
					</div>
				  </div>
				</li>
			);
			html_tl_list.push(html_tl_item);
		}
	}
	else{
		html_tl_list.push(
			<h1> 尚无任何记录，赶快添加一些吧:D </h1>
		)
	}

	return (
			<div className="col">
			  <div className="vbox">
				<div className="row-row">
				  <div className="cell scrollable">
					<div className="wrapper">
					  <ul className="timeline timeline-center">
					  {html_tl_list}
					  </ul>
					</div>
				  </div>
				</div>
			  </div>
			</div>
	);
}

module.exports = Orbit_TimelineDataDisplay;