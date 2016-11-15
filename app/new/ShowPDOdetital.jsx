var ShowPDOdetital = React.createClass( {
    propTypes: {
        id: React.PropTypes.number.isRequired,
        modalType: React.PropTypes.string.isRequired,
        pdo: React.PropTypes.object.isRequired
    },
    render: function() {
        var ziduan ='';
        if(this.props.pdo.fields.length>=1){
            ziduan = this.props.pdo.fields[0];
        }
        for(var i = 0 ; i <this.props.pdo.fields.length-1;i++ ){
            ziduan =ziduan + ',' +this.props.pdo.fields[i+1];
        }
        
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
       //alert(showdate);
        return (
            <div className="modal fade" id={"modal-" + this.props.modalType + "-" + this.props.id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times; </button>
                            <h4 className="modal-title" style={{ textAlign: 'center' }}>
                                PDO详细信息
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row clearfix">
                                <div className="col-sm-2">
                                </div>
                                <form className="col-sm-8" role="form" ref="refNormal">
                                    <div className="form-group">
                                        <label>PDO名称</label>
                                        <div className="well well-sm">{this.props.pdo.name}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>字段</label>
                                        <div className="well well-sm">
                                       
                                            {ziduan}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>创建时间</label>
                                        <div className="well well-sm">
                                      {showdate}
                                        </div>
                                    </div>
                                </form>
                                <div className="col-sm-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ShowPDOdetital;
