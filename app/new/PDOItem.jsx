
var PDOItem = React.createClass( {
    propTypes: {
        id: React.PropTypes.number.isRequired,
        pdo: React.PropTypes.object.isRequired,

    },
    showClearFocus: function() {
        this.refs.show.blur();
    },
    render: function() {

        var cha = 'rgb(12, 154, 217)'

        return (

            <tr>
                <td width="25%" style={{ textAlign: 'center' }}>
                    {this.props.pdo.name}
                </td>
                <td width="55%" style={{ textAlign: 'center' }}>
                    {this.props.pdo.string}
                </td>
                <td width="20%" style={{ textAlign: 'center' }}>
                    <a onFocus={this.showClearFocus} ref="show" href={"#modal-show-" + this.props.id} role="button" className="btn" data-toggle="modal">
                        <span className="glyphicon glyphicon-zoom-in" style={{ color: cha }}/>
                    </a>
                </td>
            </tr>

        );
    }
});

module.exports = PDOItem;
