
var AddPDO = React.createClass( {
    propTypes: {
        freshViewHandle: React.PropTypes.func.isRequired,
        clickNum: React.PropTypes.number.isRequired,
        clickMe: React.PropTypes.func.isRequired,
    },
    getInitialState: function() {
        return {
            string: '',
            name: ''
        };
    },

    render: function() {

        var cha = 'rgb(6, 154, 217)';
        var size = '17px';
        var items = [];
        for ( var i = 0; i < this.props.clickNum; i++ ) {

            items.push( <label key = {i} >Field  {i / 2 + 1}</label> )
            items.push( <input type="text" key={++i} className="form-control"  /> );
        }
        return (

            <div className="col-md-12 column">
                <form role="form">
                    <div className="form-group">
                        <label>PDO name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        {items}
                        <p></p>
                        <span onClick={this.props.clickMe} className="glyphicon glyphicon-plus" style={{ color: cha }}>
                            Add a new field
                        </span>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }
});

module.exports = AddPDO;
