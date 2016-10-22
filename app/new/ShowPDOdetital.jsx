var ShowPDOdetital = React.createClass( {
    propTypes: {
        id: React.PropTypes.number.isRequired,
        modalType: React.PropTypes.string.isRequired,
        pdo: React.PropTypes.object.isRequired
    },
    render: function() {


        return (
            <div className="modal fade" id={"modal-" + this.props.modalType + "-" + this.props.id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times; </button>
                            <h4 className="modal-title" style={{ textAlign: 'center' }}>
                                详细信息
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row clearfix">
                                <div className="col-sm-2">
                                </div>
                                <form className="col-sm-8" role="form" ref="refNormal">
                                    <div className="form-group">
                                        <label>NAME</label>
                                        <div className="well well-sm">{this.props.pdo.name}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>string</label>
                                        <div className="well well-sm">{this.props.pdo.string}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>创建时间</label>
                                        <div className="well well-sm">{this.props.pdo.time}</div>
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
