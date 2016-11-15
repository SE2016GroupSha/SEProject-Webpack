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
    /*
     chuli:function(){
       
        var tempStr = "";  
        //得到文件路径的值  
        var filePath = document.getElementById("inputFile").value;  
        var sheet_id=2; //读取第2个表
        var row_start=3; //从第3行开始读取
        var tempStr='';
        try{
            var oXL = new ActiveXObject("Excel.application"); //创建Excel.Application对象
        }catch(err)
        {
            alert(err);
        }
        var oWB = oXL.Workbooks.open(filePath);
        oWB.worksheets(sheet_id).select();
        var oSheet = oWB.ActiveSheet;
        var colcount=oXL.Worksheets(sheet_id).UsedRange.Cells.Rows.Count ;
        for(var i=row_start;i<=colcount;i++){
            if (typeof(oSheet.Cells(i,8).value)=='date'){ //处理第8列部分单元格内容是日期格式时的读取问题
                d= new Date(oSheet.Cells(i,8).value);
                temp_time=d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate();
            }
            else
                temp_time=$.trim(oSheet.Cells(i,7).value.toString());
            tempStr+=($.trim(oSheet.Cells(i,2).value)+" "+$.trim(oSheet.Cells(i,4).value)+" "+$.trim(oSheet.Cells(i,6).value.toString())+" "+temp_time+"\n");
            //读取第2、4、6、8列内容
        }
        return tempStr; //返回
        oXL.Quit();
        CollectGarbage();
    },
    */
   
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
                        <label>PDO 名称</label>
                        <input type="text" className="form-control"
                            onChange={this.props.NameChangeHandle}
                            name = "pdoname"
                            placeholder="请输入PDO名称" 
                                value = {this.props.name}/>
                    </div>

                    {items}
                    <p></p>
                    
                   <div className="col-md-4 column">
                   <a href="javascript:void(0)">
                   <span onClick={this.props.clickMe} className="glyphicon glyphicon-plus" style={{ color: cha }}>
                       增加字段
                   </span>
               </a>
                   </div>
                   <div className="col-md-4 column">
                   {/*<input type="file" id="inputFile" value = "excelInput" /> */}
                    
                    
                </div>
                   <div className="col-md-4 column">
                    <div className="pull-right">
                        <button type="submit" className="btn btn-default" onClick={this.props.subHandle} >提交</button>
                        
                    </div>
                    </div>
                </form>
            </div>
        );
    }
});
module.exports = AddPDOdom;
