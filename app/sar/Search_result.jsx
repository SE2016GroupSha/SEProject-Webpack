require("./../../resource/css/sar/colors.css");
var Search_result = React.createClass({
	propTypes: {
		
	},
	render: function()
	{
		var ths = [];
		ths.push(
			  <th key="date" className="footable-visible footable-sortable">
			  日期
			  <i className="fa fa-sort padder"></i></th>
			  );
		ths.push(
			  <th key="time" className="footable-visible footable-sortable" data-hide="phone,tablet">
			  时间
			  <i className="fa fa-sort padder"></i></th>
			  );
		for(var i = 0; i < this.props.pdoFields.length; i++)
		{
			ths.push(
			  <th key={"pdoField_"+i} className="footable-visible footable-sortable">
			    {this.props.pdoFields[i]}
			    <i className="fa fa-sort padder"></i>
			  </th>
			);
		}
		var tbody = [];
		for(var i = 0; i < this.props.datas.length; i++)
		{
			var data = this.props.datas[i];
			var datetime = new Date(data.time).toString().split(" ");
			var evenodd = (i % 2 == 0) ? "even" : "odd";
			var tds = [];
			tds.push(<td key="row_1_col_0" className="footable-visible">{datetime[1]} {datetime[2]} {datetime[3]}</td>);
			tds.push(<td key="row_1_col_1" className="footable-visible">{datetime[4]}</td>);
			for(var j = 0; j < data.values.length; j ++)
			{
				tds.push(<td key={"row_"+i+"_col_"+(j+2)} className="footable-visible">{data.values[j]}</td>)
			}
			tbody.push(
			  <tr key={"row_"+i} className={"footable-"+evenodd}>
				  {tds}
			  </tr>
			);
		}
		return(
			<div className="panel panel-default">
				<div className={"panel-heading c-white bg-color-"+this.props.cn}>
					{this.props.pdoName}
				</div>
			
				<div>
					<table className="table m-b-none default footable-loaded footable" data-page-size="5">
						<thead>
						  <tr>
						  {ths}
						  </tr>
						</thead>
						<tbody>
						  {tbody}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
});
module.exports = Search_result;