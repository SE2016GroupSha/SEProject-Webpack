
var NewItem = React.createClass( {
    propTypes: {
        id: React.PropTypes.number.isRequired,
        pdo: React.PropTypes.object.isRequired,

    },
    showClearFocus: function() {
        this.refs.show.blur();
    },
    render: function() {
        return (

            <tr>
                <td width="25%" style={{ textAlign: 'center' }}>
                    <a onFocus={this.showClearFocus} ref="show" href={"#modal-show-" + this.props.id} role="button" className="btn" data-toggle="modal">
                        <big>{this.props.pdo.name}
                        </big>
                    </a>
                </td>
                <td width="75%" style={{ textAlign: 'center' }}>
                    {this.props.pdo.string}
                </td>

            </tr>

        );
    }
});

module.exports = NewItem;
