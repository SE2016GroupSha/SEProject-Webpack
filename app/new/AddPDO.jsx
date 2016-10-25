var AddPDOitems = require( '../new/AddPDOitems' );
var AddPDO = React.createClass( {
    propTypes: {
        freshViewHandle: React.PropTypes.func.isRequired,
        clickNum: React.PropTypes.number.isRequired,
        clickMe: React.PropTypes.func.isRequired,
        loadFormValidator:React.PropTypes.func.isRequired,
    },
    getInitialState: function() {
        return {
            fileds: [],
            name: ''
        };
    },
    
    NameChangeHandle: function( event ) {
        //alert(changeType+", "+event.target.value);

        //wrong: var t_book = this.state.book;
        var t_name = '';
        t_name = event.target.value;
        console.log( t_name );
        this.setState( {
            name: t_name
        });
    },
    StringChangeHandle: function( id, event ) {
        //alert(changeType+", "+event.target.value);
        // var inputList = document.getElementsByTagName( "input" );
        // console.log( inputList );
        var t_fileds = [];
        for ( var i = 0; i < this.state.fileds.length; i++ ) {
            t_fileds[i] = this.state.fileds[i];
        }
        t_fileds[id] = event.target.value;
        console.log( t_fileds[id] );

        this.setState( {
            fileds: t_fileds
        });
    },
    serializeForStruts2: function( name, fileds ) {
        var result = {};
        var temp = this.state.fileds[0];
        result['pdo.name'] = name;
        for ( var i = 1; i < this.state.fileds.length; i++ ) {
            temp += ',' + fileds[i];
        }
        result['pdo.string'] = temp;

        var q = new Date();
        result['pdo.createdate'] = q.getTime();
        return result;
    },
    resetForm: function() {
        //仅为add设计，在freshViewHandle后edit会被销毁，即无需考虑
        var Form = this.refs.refCopy;
        var check1 = $( Form ).data( 'bootstrapValidator' );


        if ( typeof ( check1 ) != "undefined" ) {
            $( Form ).data( 'bootstrapValidator' ).destroy();
            $( Form ).data( 'bootstrapValidator', null );
            this.loadFormValidator( Form );
        }

        this.setState( {
            name: '',
            fileds: []
        });
    },
    
    checkInput: function( name, fileds ) {
        var Form = this.refs.refCopy;
        this.props.loadFormValidator( Form );

        var check1 = $( Form ).data( 'bootstrapValidator' );
        check1.validate();
        if ( !check1.isValid() ) {
            return false;
        }

        return true;

    },

    subHandle: function( event ) {

        if ( !this.checkInput( this.state.name, this.state.fileds ) ) {

            return;
        }

        $.ajax( {
            async: false,//阻塞的，保证刷新得到的视图是新的
            type: "POST",
            cache: false,
            url: "api/add",
            data: this.serializeForStruts2( this.state.name, this.state.fileds )
        });

        this.props.freshViewHandle();

        //$( "#modal-" + this.props.modalType + "-" + this.props.id ).modal( 'hide' );
        //edit会销毁，add不会，故要恢复纯净状态
        this.resetForm();
    },
    render: function() {

        var cha = 'rgb(6, 154, 217)';
        var size = '17px';
        var items = [];
        for ( var i = 0; i < this.props.clickNum; i++ ) {

            items.push( <AddPDOitems  key ={i} id={i}
                StringChangeHandle = {this.StringChangeHandle} /> );

        }
        return (

            <div className="col-md-12 column">
                <form role="form"   ref="refCopy">
                    <div className="form-group">
                        <label>PDO name</label>
                        <input type="text" className="form-control" onChange={this.NameChangeHandle} name = "pdoname" />
                    </div>

                    {items}
                    <p></p>
                    <a href="javascript:void(0)">
                        <span onClick={this.props.clickMe} className="glyphicon glyphicon-plus" style={{ color: cha }}>
                            Add a new field
                        </span>
                    </a>

                    <div className="pull-right">
                        <button type="submit" className="btn btn-default" onClick={this.subHandle} >Submit</button>
                        {/*button 按钮点击第一次 校验 还需点击第二次 尚未解决*/}
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = AddPDO;
