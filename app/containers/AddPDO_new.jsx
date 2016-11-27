var AddPDO = require( '../new/AddPDO' );


var AddPDO_new = React.createClass( {
    getInitialState: function() {
        return {
            loading: true,
            failed: false,
            searchKey: "",
            timestamp: 0,
            timer: null,
            pdos: [],
        };
    },

    componentDidMount: function() {
        //初始状态是loading，在这里做第一次加载
        this.freshViewHandle();
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
            async: true,//搜索所有PDO
            type: "POST",
            cache: false,
            url: "api/pdo/all",
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
                        pdos: data['pdos'],//---------------------------
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

            <AddPDO freshViewHandle = {this.freshViewHandle}
                />

            
        );
    }
});

module.exports = AddPDO_new;