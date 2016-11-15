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
        var myname = '';
        if(this.props.id == 0){
            showString = '首字段必填';
            myname = '0';
        }else{
            showString = '请填写字段'+(this.props.id+1)+'    不填写，代表取消此字段';
            myname = '1';
        }
        return (
            <div className="form-group">
                <label  >字段  {this.props.id+1}</label>
                <input type="text"  className="form-control" 
                    onChange={this.props.StringChangeHandle.bind( null, this.props.id ) } 
                name = {myname}
                    placeholder={showString}
                value = {this.props.fileds[this.props.id]}
               />
            </div>


        );
    }
});

module.exports = AddPDOitems;
