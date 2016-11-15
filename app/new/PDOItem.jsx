
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
            var datetime = new Date(this.props.pdo.time);
        //alert(datetime);
        var year = datetime.getFullYear();
        var month = datetime.getMonth();
        var day = datetime.getDate();
        var hour = datetime.getHours();
        var min = datetime.getMinutes();
        var second = datetime.getSeconds();
        //getMinutes()  返回 Date 对象的分钟 (0 ~ 59)。
        //getSeconds()
        var showdate = year.toString()+"/"+month.toString()+"/"+day.toString()+" "+
                        hour.toString()+":"+min.toString()+":"+second.toString();
        return (

            <tr>
                <td width="25%" style={{ textAlign: 'center' }}>
                    {this.props.pdo.name}
                </td>
                <td width="55%" style={{ textAlign: 'center' }}>
                    {showdate}
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
