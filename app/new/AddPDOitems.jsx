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
        var showString ='';
        if(this.props.id == 0){
            showString = '首字段必填';
        }else{
            showString = '请填写字段'+(this.props.id+1)+'    不填写，代表取消此字段';
        }
        return (
            <div className="form-group">
                <label  >Field  {this.props.id+1}</label>
                <input type="text"  className="form-control" 
                    onChange={this.props.StringChangeHandle.bind( null, this.props.id ) } 
                name = "0"
                    placeholder={showString}
               />
            </div>


        );
    }
});

module.exports = AddPDOitems;
