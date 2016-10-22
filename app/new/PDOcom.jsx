var ShowPDOdetital = require( '../new/ShowPDOdetital' );
var PDOItem = require( '../new/PDOItem' );
var PDOcom = React.createClass( {
    propTypes: {
        loading: React.PropTypes.bool.isRequired,
        failed: React.PropTypes.bool.isRequired,
        pdos: React.PropTypes.array.isRequired,
        freshViewHandle: React.PropTypes.func.isRequired
    },

    render: function() {

        var items = [];
        var modals = [];

        if ( this.props.failed ) {
            items.push( <tr key={0}><td colSpan="2" style={{ textAlign: 'center' }}>好像网络不太好啊⊙﹏⊙</td></tr> );
        } else if ( this.props.loading ) {
            items.push( <tr key={0}><td colSpan="2" style={{ textAlign: 'center' }}>Loading......</td></tr> );
        } else if ( this.props.pdos.length == 0 ) {
            items.push( <tr key={0}><td colSpan="2" style={{ textAlign: 'center' }}>没有符合条件的记录</td></tr> );
        } else {
            for ( var i = 0; i < this.props.pdos.length; i++ ) {
                items.push( <PDOItem key={i} id={i} pdo={this.props.pdos[i]}/> );
                modals.push( <ShowPDOdetital key={i} modalType ={'show'} id={i} pdo={this.props.pdos[i]}/> );
            }
        }
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th id="table-header-author" width="25%" style={{ textAlign: 'center' }}>
                            PDO-name
                        </th>
                        <th id="table-header-author" width="55%" style={{ textAlign: 'center' }}>
                            something
                        </th>
                        <th id="table-header-author" width="20%" style={{ textAlign: 'center' }}>
                            see_detail
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {items}
                </tbody>
                {modals}
            </table>

        );
    }
});

module.exports = PDOcom;