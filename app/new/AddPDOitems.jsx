var AddPDOitems = React.createClass( {
    propTypes: {
        id: React.PropTypes.number.isRequired,
        StringChangeHandle: React.PropTypes.func.isRequired,
        fileds:React.PropTypes.array.isRequired,
        loadFormValidator: React.PropTypes.func.isRequired,
    },
    showClearFocus: function() {
        this.refs.show.blur();
    },
    render: function() {
        return (
            <div className="form-group">
                <label  >Field  {this.props.id}</label>
                <input type="text"  className="form-control" 
                    onChange={this.props.StringChangeHandle.bind( null, this.props.id ) } 
                name = { this.props.id.toString()}
               />
            </div>


        );
    }
});

module.exports = AddPDOitems;
