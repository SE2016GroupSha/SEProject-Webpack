var PDOcom = React.createClass( {
    propTypes: {
        pdos: React.PropTypes.array.isRequired,
		index: React.PropTypes.number.isRequired
    },

    render: function() {
		
		var colorname='panel-heading text-center no-border ';// bg-info
		var i = this.props.index;	
		var colortext='icon-pin m-r-xs ';//text-info 
		if(i%6 == 0){
			colorname+='bg-primary';
			colortext+='text-primary';
		}else if(i%6 == 1){
			colorname+='bg-info';
			colortext+='text-info';
		}else if(i%6 == 2){
			colorname+='bg-success';
			colortext+='text-success';
		}else if(i%6 == 3){
			colorname+='bg-warning';
			colortext+='text-warning';
		}else if(i%6 == 4){
			colorname+='bg-danger';
			colortext+='text-danger';
		}else{
			colorname+='bg-dark';
			colortext+='text-dark';
		}
		
		var datetime = new Date(this.props.pdos[this.props.index].time);
        var year = datetime.getFullYear();
        var month = datetime.getMonth();
        var day = datetime.getDate();
        var hour = datetime.getHours();
        var min = datetime.getMinutes();
        var second = datetime.getSeconds();
		
		var fieldsarray=[];
		for(var j=0;j<this.props.pdos[this.props.index].fields.length;j++){
			fieldsarray.push(
							<li key={j} className="list-group-item">
								&nbsp;<i className={colortext}>&nbsp;</i>  {this.props.pdos[this.props.index].fields[j]}
							</li>
			);
		}
		
		
        return (
             <div className="panel b-a">
				<div className={colorname}>
				  <h4 className="text-u-c m-b-none">{this.props.pdos[this.props.index].name}</h4>
				  <h2 className="m-t-none">
					<span className="text-xs">{year}/</span>
					<span className="new1 text-lt"> {month}/ {day}</span>
						&nbsp;
					<span className="text-xs"> {hour}:{min}:{second}</span>
				  </h2>
				</div>
				<ul className="list-group">
				{fieldsarray}
				</ul>
			  </div>
        );
    }
});

module.exports = PDOcom;