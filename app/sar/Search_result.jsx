require("./../../resource/css/sar/colors.css");
var Search_result = React.createClass({
	propTypes: {
		
	},
	getInitialState: function(){
		return {
			tabelStyle:{display:""},
			sortedCol:"time",
			sortedMode:"inc",
			sortedDatas:this.props.datas
		}
	},
	collapseTable: function(e){
		console.log(this.state.tabelStyle);
		this.setState({
			tabelStyle:(this.state.tabelStyle.display=="") ? {display:"none"} : {display:""}
		});
	},
	sortInc: function(a, b){
		if(this.state.sortedCol == "time"){
			return a.time < b.time;
		}
		else{
			return a.values[this.state.sortedCol] < b.values[this.state.sortedCol];
		}
	},
	sortDec: function(a, b){
		if(this.state.sortedCol == "time"){
			return a.time > b.time;
		}
		else{
			return a.values[this.state.sortedCol] > b.values[this.state.sortedCol];
		}
	},
	handleSort: function(e){
		var id = e.target.id.split("-")[1];
		var sortFunc = {"inc":this.sortInc, "dec":this.sortDec};
		this.state.sortedCol = id;
		this.state.sortedMode = this.state.sortedMode=="dec" ? "inc" : "dec";
		this.state.sortedDatas.sort(sortFunc[this.state.sortedMode]);
		this.forceUpdate();
	},
	render: function()
	{
		var ths = [];
		var sortableStyle={cursor:"pointer"};
		var sortedClass = "fa fa-sort-" + (this.state.sortedMode == "dec" ? "down ":"up ") + "padder";
		ths.push(
			  <th key="date-time" className="footable-visible footable-sortable">
			  日期
			  <i id="0date-time" className={this.state.sortedCol == "time" ? sortedClass : "fa fa-sort padder"} onClick={this.handleSort} style={sortableStyle}></i></th>
			  );		
		ths.push(	
			  <th key="time" className="footable-visible footable-sortable">
			  时间
			  <i id="1date-time" className="fa fa-clock-o padder" onClick={this.handleSort}></i></th>
			  );
		for(var i = 0; i < this.props.pdoFields.length; i++)
		{
			ths.push(
			  <th key={"pdoField_"+(i)} className="footable-visible footable-sortable">
			  {this.props.pdoFields[i]}
			  <i id={"pdoField-"+(i)} className={i == this.state.sortedCol ? sortedClass : "fa fa-sort padder"} onClick={this.handleSort} style={sortableStyle}></i>
			  </th>
			);
		}
		var tbody = [];
		for(var i = 0; i < this.state.sortedDatas.length; i++)
		{
			var data = this.state.sortedDatas[i];
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
				<div className={"panel-heading c-white bg-color-"+this.props.cn} onClick={this.collapseTable}>
					{this.props.pdoName}
				</div>
			
				<div>
					<table className="table m-b-none default footable-loaded footable" style={this.state.tabelStyle}>
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