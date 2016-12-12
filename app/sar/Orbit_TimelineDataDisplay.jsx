require("./../../resource/css/sar/colors.css");
require("./../../resource/css/sar/tlbg.css");
require("./../../resource/css/sar/arrowColors.css");
function Orbit_TimelineDataDisplay (props) {
	var items = props.items;
	var colors = props.colors;
	var html_tl_item;
	var html_tl_list = [];
	if(items != [])
	{	
		html_tl_list.push(
			<li className="tl-header" key="tl_header_0">
			  <div className="btn btn-lg btn-default btn-rounded" onClick={props.refreshClick}>最近</div>
			</li>
		);
		for(var i = 0; i < items.length; i++)
		{
			var cn = items[i].pdoNum % props.nColor;
			html_tl_item = (
				<li className={"tl-item"+(items[i].isLeft?" tl-left":"")} key = {"tl_list_item_"+i}>
				  <div id={"wrap_"+i} className={"tl-wrap b-success b-color-"+cn}onClick = {props.detailClick}>
					<span id={"date_"+i} className="tl-date c-white">{items[i].date}</span>
					<div id={"content_"+i} className={"tl-content panel padder c-white bg-color-"+cn}>
					  <span id={"arrowl_"+i}className={"arrow left  pull-up hidden-left arrow-color-"+cn}></span>
					  <span id={"arrowr_"+i}className={"arrow right pull-up visible-left arrow-color-"+cn}></span>
					<div id={"text_"+i} className="text-lt">
					  {items[i].pdoName} #{items[i].instanceNumber} ({items[i].pdoDisplayTag.name}: {items[i].pdoDisplayTag.value})
					</div>
					</div>
				  </div>
				</li>
			);
			html_tl_list.push(html_tl_item);
		}
		html_tl_list.push(
			<li className="tl-header" key="tl_footer_0">
			  <div className="btn btn-icon btn-rounded btn-default"><i className="fa fa-dot-circle-o"></i></div>
			</li>
		);
	}
	else{
		html_tl_list.push(
			<h1> 尚无任何记录，赶快添加吧:D </h1>
		)
	}

	return (
			<div className="col">
			  <div className="vbox">
				<div className="row-row">
				  <div className="cell scrollable tl-bg">
					<div className="wrapper">
					  <ul className="timeline timeline-center">
					  {props.isLoading && <div className="text-center"><img src={require("./../../resource/img/sar/loading.jpg")}/></div>}
					  {!props.isLoading && html_tl_list}
					  </ul>
					</div>
				  </div>
				</div>
			  </div>
			</div>
	);
}

module.exports = Orbit_TimelineDataDisplay;