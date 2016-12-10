	var Search_pdoTable = React.createClass(
		propTypes: {
			
		},
		getInitialState: function(){
			return {
				
			};
		},
		render: function()
		{
			return(
				<div className="panel panel-default">
					<div className="panel-heading">
					  Footable - make HTML tables on smaller devices look awesome
					</div>
				
					<div>
					<table className="table m-b-none default footable-loaded footable" data-page-size="5">
					<thead>
					  <tr>
						  <th className="footable-visible footable-first-column footable-sortable footable-sorted">
							  First Name
						  <span className="footable-sort-indicator"></span></th>
						  <th className="footable-visible footable-sortable">
							  Last Name
						  <span className="footable-sort-indicator"></span></th>
						  <th data-hide="phone,tablet" className="footable-visible footable-sortable">
							  Job Title
						  <span className="footable-sort-indicator"></span></th>
						  <th data-hide="phone,tablet" data-name="Date Of Birth" className="footable-visible footable-sortable">
							  DOB
						  <span className="footable-sort-indicator"></span></th>
						  <th data-hide="phone" className="footable-visible footable-last-column footable-sortable">
							  Status
						  <span className="footable-sort-indicator"></span></th>
					  </tr>
					</thead>
					<tbody>
					  <tr className="footable-even" style={{display: "table-row"}}>
						  <td className="footable-visible footable-first-column"><span className="footable-toggle"></span>Easer</td>
						  <td className="footable-visible">Dragoo</td>
						  <td className="footable-visible">Drywall Stripper</td>
						  <td data-value="250833505574" className="footable-visible">13 Dec 1977</td>
						  <td data-value="1" className="footable-visible footable-last-column"><span className="label bg-success" title="Active">Active</span></td>
					  </tr>
					  <tr className="footable-odd" style={{display: "table-row"}}>
						  <td className="footable-visible footable-first-column"><span className="footable-toggle"></span>Granville</td>
						  <td className="footable-visible">Leonardo</td>
						  <td className="footable-visible">Business Services Sales Representative</td>
						  <td data-value="-22133780420" className="footable-visible">19 Apr 1969</td>
						  <td data-value="3" className="footable-visible footable-last-column"><span className="label bg-warning" title="Suspended">Suspended</span>
						  </td>
					  </tr>
					</tbody>
					<tfoot className="hide-if-no-paging">
					  <tr>
						  <td colspan="5" className="text-center footable-visible">
							  <ul className="pagination"><li className="footable-page-arrow disabled"><a data-page="first" href="#first">«</a></li><li className="footable-page-arrow disabled"><a data-page="prev" href="#prev">‹</a></li><li className="footable-page active"><a data-page="0" href="#">1</a></li><li className="footable-page"><a data-page="1" href="#">2</a></li><li className="footable-page-arrow"><a data-page="next" href="#next">›</a></li><li className="footable-page-arrow"><a data-page="last" href="#last">»</a></li></ul>
						  </td>
					  </tr>
					</tfoot>
				  </table>
				</div>
			  </div>
			);
		}
	)
	{
		var pdo = props.pdo;
		var pdoColor = props.pdoColor;
		var 
		if(pdo.fields)
		{

		}
		
		return (
		);
	}