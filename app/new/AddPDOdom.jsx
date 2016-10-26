var AddPDOitems = require( '../new/AddPDOitems' );
var AddPDOdom = React.createClass( {
    propTypes: {
        clickNum: React.PropTypes.number.isRequired,
        clickMe: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        fileds: React.PropTypes.array.isRequired,
        NameChangeHandle: React.PropTypes.func.isRequired,
        StringChangeHandle: React.PropTypes.func.isRequired,
        pdoaddDOMHandle: React.PropTypes.func.isRequired,
        loadFormValidator: React.PropTypes.func.isRequired,
        subHandle: React.PropTypes.func.isRequired,
    },
    componentDidMount: function() {
        var Form = this.refs.refCopy;
        this.props.loadFormValidator( Form );
        this.props.pdoaddDOMHandle( Form );
    },
    render: function() {

        var cha = 'rgb(6, 154, 217)';
        var size = '17px';
        var items = [];
        for ( var i = 0; i < this.props.clickNum; i++ ) {

            items.push( <AddPDOitems  key ={i} id={i}
                StringChangeHandle = {this.props.StringChangeHandle}
                fileds = {this.props.fileds}
            loadFormValidator = {this.props.loadFormValidator}/> );

        }

        return (

            <div className="col-md-12 column">
                <form role="form"   ref="refCopy">
                    <div className="form-group">
                        <label>PDO name</label>
                        <input type="text" className="form-control" onChange={this.props.NameChangeHandle} value = {this.props.name} name = "pdoname" />
                    </div>

                    {items}
                    <p></p>
                    <a href="javascript:void(0)">
                        <span onClick={this.props.clickMe} className="glyphicon glyphicon-plus" style={{ color: cha }}>
                            Add a new field
                        </span>
                    </a>

                    <div className="pull-right">
                        <button type="submit" className="btn btn-default" onClick={this.props.subHandle} >Submit</button>
                        {/*button 按钮点击第一次 校验 还需点击第二次 尚未解决*/}
                    </div>
                </form>
            </div>
        );
    }
});
module.exports = AddPDOdom;
