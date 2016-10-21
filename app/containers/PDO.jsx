var PDOcom = require( '../new/PDOcom' );
var PDO = React.createClass( {
    getInitialState: function() {
        return {
            loading: true,
            failed: false,
            searchKey: "",
            timestamp: 0,
            timer: null,
            pdos: []
        };
    },
    componentDidMount: function() {
        //初始状态是loading，在这里做第一次加载
        this.freshViewHandle();
    },
    freshViewHandleForSearch: function( event ) {
        //两次间隔大于500ms，执行真正的freshViewHandle
        var self = this;
        var newEvent = { target: { value: event.target.value } }; //event会被销毁，值要存一份
        clearTimeout( this.state.timer );
        this.setState( {
            timer: setTimeout( function() {
                self.freshViewHandle( newEvent );
            }, 500 )
        });
    },
    freshViewHandle: function( event ) {
        var self = this;
        var keyData = this.state.searchKey;

        //只有search会传递事件参数更新关键字
        if ( typeof ( event ) != "undefined" ) {
            keyData = event.target.value;
            this.setState( {
                searchKey: event.target.value,
            });
        }

        //设置table为加载视图
        this.setState( {
            loading: true,
            failed: false
        });

        //异步获取数据，成功则设置table为数据视图，状态变化引发table更新
        $.ajax( {
            async: true,
            type: "POST",
            cache: false,
            url: "api/pdos",
            data: { key: keyData },
            dataType: "json",
            //两个回调，尝试使用时间戳控制回复包时序问题(或许根本不存在这个问题？)
            success: ( function( time, data ) {
                //js事件驱动单线程，代码不会被切走，这里的代码应该安全
                if ( time > self.state.timestamp ) {
                    //异步调用，不在当前调用栈中，setState会实时生效
                    self.setState( {
                        timestamp: time,
                        loading: false,
                        failed: false,
                        pdos: data,//---------------------------

                    });

                }
                //alert(data.authors.length+","+data.books.length);
            }).bind( null, ( new Date() ).getTime() ),
            error: ( function( time, jqXHR, textStatus, errorThrown ) {
                if ( time > self.state.timestamp ) {
                    self.setState( {
                        timestamp: time,
                        loading: false,
                        failed: true,
                        pdos: []
                    });
                }
            }).bind( null, ( new Date() ).getTime() )
        });

    },


    render: function() {



        return (
            <div className="panel-group" id="accordion">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion"
                                href="#collapseThree1">
                                PDO展示部分
                            </a>
                        </h4>
                    </div>

                    <div id="collapseThree1" className="panel-collapse collapse">
                                     
                        <div className="panel-body">

                            <PDOcom  loading={this.state.loading}
                                failed={this.state.failed}
                                pdos={this.state.pdos}
                                freshViewHandle={this.freshViewHandle}
                                />

                        </div>
                    </div>
                </div>

                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion"
                                href="#collapseThree2">
                                添加PDO
                            </a>
                        </h4>
                    </div>
                    <div id="collapseThree2" className="panel-collapse collapse">
                        <div className="list-group">
                        <button className="button button-raised button-action button-circle button-jumbo"><i className="fa fa-thumbs-up"></i></button>
                            <a href="http://localhost:8080/" className="list-group-item">PDO就在这里展示</a>
                            <a href="http://localhost:8080/" className="list-group-item">PDO就在这里展示</a>
                            <a href="http://localhost:8080/" className="list-group-item">PDO就在这里展示</a>
                            <a href="http://localhost:8080/" className="list-group-item">PDO就在这里展示</a>
                            <a href="http://localhost:8080/" className="list-group-item">PDO就在这里展示</a>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
});

module.exports = PDO;