var AddPDOdom = require( '../new/AddPDOdom' );
var AddPDO = React.createClass( {
    propTypes: {
        freshViewHandle: React.PropTypes.func.isRequired,
    },
    getInitialState: function() {
        return {
            fileds: [],
            name: '',
            clickNum: 1,
            pdoaddDOM: null
        };
    },
    clickMe: function() {
        var temp = this.state.clickNum + 1;
        var a = ( temp - 1 ).toString;

        this.setState( {
            clickNum: temp
        });

    },
    loadFormValidator: function( Form ) {
        $( Form ).bootstrapValidator( {
            message: '格式不正确',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                pdoname: {
                    validators: {
                        notEmpty: {
                            message: 'pdoname不能为空'
                        },
                        remote: {
                            type: 'POST',
                            url: 'api/pdonamecheck',
                            message: 'pdoname已存在',
                            delay: 500
                        }
                    }
                },
                0: {
                    validators: {
                        notEmpty: {
                            message: '首字段不能为空'
                        }
                    }
                }


            }
        })
            .on( 'success.form.bv', function( e ) {
                e.preventDefault();
            });
    },
    pdoaddDOMHandle: function( dom ) {
        //alert("dom extend");
        this.setState( {
            pdoaddDOM: dom
        });
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

        var check1 = $( this.state.pdoaddDOM ).data( 'bootstrapValidator' );


        if ( typeof ( check1 ) != "undefined" ) {
            $( this.state.pdoaddDOM ).data( 'bootstrapValidator' ).destroy();
            $( this.state.pdoaddDOM ).data( 'bootstrapValidator', null );
            //this.loadFormValidator( this.state.pdoaddDOM );
        }

        this.setState( {
            name: '',
            fileds: []
        });
    },

    checkInput: function( name, fileds ) {
        var check1 = $( this.state.pdoaddDOM ).data( 'bootstrapValidator' );
        check1.validate();
        if ( !check1.isValid() ) {
            return false;
        }
        for ( var i = 0; i < this.state.clickNum - 1; i++ ) {
            for ( var j = i + 1; j < this.state.clickNum; j++ ) {
                if ( fileds[i] == fileds[j] ) {
                    alert( "字段不可重复！" );
                    return false;
                }
            }
        }
        return true;

    },

    subHandle: function( event ) {

        if ( !this.checkInput( this.state.name, this.state.fileds ) ) {
        } else {
            $.ajax( {
                async: false,//阻塞的，保证刷新得到的视图是新的
                type: "POST",
                cache: false,
                url: "api/add",
                data: this.serializeForStruts2( this.state.name, this.state.fileds )
            });
            this.props.freshViewHandle();
            this.resetForm();
        }
    },
    render: function() {

        return (

            <div className="col-md-12 column">

                <AddPDOdom  clickNum = {this.state.clickNum}
                    clickMe = {this.clickMe}
                    name = {this.state.name}
                    fileds = {this.state.fileds}
                    NameChangeHandle = {this.NameChangeHandle}
                    StringChangeHandle = {this.StringChangeHandle}
                    pdoaddDOMHandle = {this.pdoaddDOMHandle}
                    loadFormValidator = {this.loadFormValidator}
                    subHandle = {this.subHandle}
                    />
            </div>
        );
    }
});

module.exports = AddPDO;
