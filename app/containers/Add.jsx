var AddContent = require( './AddContent' );

var Add = React.createClass( {
    componentDidMount: function() {
        var panelDOM = this.refs.panelElement;
        $( panelDOM ).collapse( 'toggle' );
    },
    render: function() {
        return (
            <div className="row clearfix">
                <div className="col-xs-12 column">
                    <AddContent />
                </div>
            </div>
        );
    }
});

module.exports = Add;