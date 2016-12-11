var Search_result = React.createClass({
	propTypes: {
		
	},
	
	render: function()
	{
		return(
			<div className="panel panel-default">
				<div className="panel-heading" style={{backgroundColor:"green", color:"white"}}>
				  坐车
				</div>
			
				<div>
					<table className="table m-b-none default footable-loaded footable" data-page-size="5">
						<thead>
						  <tr>
							  <th className="footable-visible footable-first-column footable-sortable">
								  First Name
							  <i className="fa fa-sort padder"></i></th>
							  <th className="footable-visible footable-sortable">
								  Last Name
							  <span className="footable-sort-indicator"></span></th>
							  <th data-hide="phone,tablet" className="footable-visible footable-sortable">
								  Job Title
							  <span className="footable-sort-indicator"></span></th>

						  </tr>
						</thead>
					</table>
				</div>
			</div>
		);
	}
});
module.exports = Search_result;