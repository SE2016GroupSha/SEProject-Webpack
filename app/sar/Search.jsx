var Search = React.createClass( {
    propTypes: {

    },
    getInitialState: function() {
        return {

        };
    },
    componentDidMount: function() {
		
    },
    render: function() {
		return (
			<div className="app-content">
				<div className="app-content-body fade-in-up">
					<div className="fade-in-down ">
						<div className="bg-light lter b-b wrapper-md">
						  <h1 className="m-n font-thin h3">
						  <i className="icon-magnifier i-sm m-r-sm"></i> Search
						  </h1>
						</div>
					</div>
					
					<div className="wrapper-md">
					  <form action="#" className="m-b-md">
						<div className="input-group">
						  <input type="text" className="form-control input-lg" placeholder="Type keyword" />
						  <span className="input-group-btn">
							<button className="btn btn-lg btn-default" type="button">Search</button>
						  </span>
						</div>
					  </form>
					  <p className="m-b-md">
						<strong>23</strong> Results found for: <strong>Keyword</strong>
					  </p>
					</div>
					
					
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
				</div>
		    </div>
		);
    }
});

module.exports = Search;