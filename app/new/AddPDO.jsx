

var AddPDO = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        modalType: React.PropTypes.string.isRequired,
        freshViewHandle: React.PropTypes.func.isRequired,
        book: React.PropTypes.object,
        author: React.PropTypes.object
    },
    getInitialState: function () {
        return {
                pdo: {name: "", string: "", time: "undefined"},
                normalDOM: null,
                extendDOM: null
        };
    },
    componentWillMount: function () {
        //edit 忽略
    },
    bookChangeHandle: function (changeType, event) {
        var t_pdo = {};
        t_pdo.name = this.state.pdo.name;
        t_pdo.string = this.state.pdo.string;
        t_pdo.time = this.state.pdo.time;//应更换为js获取时间函数
        
        switch (changeType) {
        case 'name':
            t_book.isbn = event.target.value;
            break;
        case 'string':
            t_book.title = event.target.value;
            break;
        default:
            break;
        }
        this.setState({
            book: t_book
        });
    },
    normalDOMHandle: function (dom) {
        //alert("dom normal");
        this.setState({
            normalDOM: dom
        });
    },
    extendDOMHandle: function (dom) {
        //alert("dom extend");
        this.setState({
            extendDOM: dom
        });
    },
    checkInput: function(){
        var check1 = $(this.state.normalDOM).data('bootstrapValidator');
        var check2 = $(this.state.extendDOM).data('bootstrapValidator');

        if (this.state.author.author_id=='undefined') {
            check1.validate();
            check2.validate();
            if(!check1.isValid() || !check2.isValid()) {
                return false;
            }
        } else {
            check1.validate();
            if(!check1.isValid()) {
                return false;
            }
        }
            
        return true;
    },
    //用途有二：1.给子组件做回调，用于第一次 2.给父组件调用，用于清除状态
    loadNormalFormValidator: function(Form) {
        $(Form).bootstrapValidator({
            message: '格式不正确',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                bookisbn: {
                    validators: {
                        notEmpty: {
                            message: 'ISBN不能为空'
                        },
                        isbn: {
                            message: 'ISBN格式不正确'
                        },
                        remote: {
                            type: 'POST',
                            url: 'api/isbncheck',
                            message: 'ISBN已存在',
                            delay: 500
                        }
                    }
                },
                booktitle: {
                    validators: {
                        notEmpty: {
                            message: '标题不能为空'
                        },
                        stringLength: {
                            max: 50,
                            message: '标题不能超过50个字符'
                        }
                    }
                },
                bookpublisher: {
                    validators: {
                        notEmpty: {
                            message: '出版社不能为空'
                        },
                        stringLength: {
                            max: 50,
                            message: '出版社不能超过50个字符'
                        }
                    }
                },
                bookpublishdata: {
                    validators: {
                        notEmpty: {
                            message: '出版时间不能为空'
                        },
                        stringLength: {
                            max: 10,
                            message: '出版时间不能超过10个字符'
                        },
                        regexp: {
                            regexp: /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
                            message: '请输入正确的日期(日期格式:yyyy-mm-dd)'
                        }
                    }
                },
                bookprice: {
                    validators: {
                        notEmpty: {
                            message: '价格不能为空'
                        },
                        stringLength: {
                            max: 20,
                            message: '价格不能超过20个字符'
                        },
                        regexp: {
                            regexp: /^((\d+)|(\d+\.\d+))$/,
                            message: '价格只能为整数或小数'
                        }
                    }
                }
            }
          })
          .on('success.form.bv', function(e) {
              e.preventDefault();
        });
    },
    //用途有二：1.给子组件做回调，用于第一次 2.给父组件调用，用于清除状态
    loadExtendFormValidator: function(Form) {
        $(Form).bootstrapValidator({
            message: '格式不正确',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                authorname: {
                    validators: {
                        notEmpty: {
                            message: '姓名不能为空'
                        },
                        stringLength: {
                            max: 30,
                            message: '姓名不能超过30个字符'
                        }
                    }
                },
                authorage: {
                    validators: {
                        notEmpty: {
                            message: '年龄不能为空'
                        },
                        stringLength: {
                            max: 3,
                            message: '年龄不能超过3个字符'
                        },
                        regexp: {
                            regexp: /^\d+$/,
                            message: '年龄只能为整数'
                        }
                    }
                },
                authorcountry: {
                    validators: {
                        notEmpty: {
                            message: '国家不能为空'
                        },
                        stringLength: {
                            max: 20,
                            message: '国家不能超过20个字符'
                        }
                    }
                }
            }
          })
          .on('success.form.bv', function(e) {
              e.preventDefault();
        });
    },
    resetForm: function() {
        //仅为add设计，在freshViewHandle后edit会被销毁，即无需考虑
        
        var check1 = $(this.state.normalDOM).data('bootstrapValidator');
        var check2 = $(this.state.extendDOM).data('bootstrapValidator'); 

        if (typeof(check1)!="undefined") {
            $(this.state.normalDOM).data('bootstrapValidator').destroy();
            $(this.state.normalDOM).data('bootstrapValidator', null);
            this.loadNormalFormValidator(this.state.normalDOM);
        }
        if (typeof(check2)!="undefined") {
            $(this.state.extendDOM).data('bootstrapValidator').destroy();
            $(this.state.extendDOM).data('bootstrapValidator', null);
            this.loadExtendFormValidator(this.state.extendDOM);
        }
            
        this.setState({
            book: {isbn: "", title: "", author_id: "undefined", publisher: "", publish_date: "", price: ""},
            author: {author_id: "undefined", name: "", age: "", country: ""},
            authorGet: false,
            authors: []
        });
    },
    serializeForStruts2:function (book, author) {
        var result = {};
        result['book.isbn'] = book.isbn;
        result['book.title'] = book.title;
        result['book.author_id'] = book.author_id;
        result['book.publisher'] = book.publisher;
        result['book.publish_date'] = book.publish_date;
        result['book.price'] = book.price;
        result['author.author_id'] = author.author_id;
        result['author.name'] = author.name;
        result['author.age'] = author.age;
        result['author.country'] = author.country;
        return result;
    },
    subHandle: function (event) {
        
        if (!this.checkInput()) {
            return;
        }
        
        $.ajax({
            async: false,//阻塞的，保证刷新得到的视图是新的
            type:"POST",
            cache: false,
            url: this.props.modalType=='add'?"api/add":"api/edit",
            data: this.serializeForStruts2(this.state.book, this.state.author)
        });
        
        this.props.freshViewHandle();

        $("#modal-"+this.props.modalType+"-"+this.props.id).modal('hide');
        
        //edit会销毁，add不会，故要恢复纯净状态
        this.resetForm();
    },
    render: function () {
        return (
                <div className="modal fade" id={"modal-"+this.props.modalType+"-"+this.props.id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title" style={{textAlign: 'center'}}>
                                    {'添加记录'}
                                </h4>
                            </div>
                            <div className="modal-body">
                            
                                <div className="row clearfix">
                                    <div className="col-sm-2">
                                    </div>
                                    <ModifyNormalView   modalType={this.props.modalType} 
                                                        pdo={this.state.pdo}
                                                        bookChangeHandle={this.bookChangeHandle} 
                                                        authorChangeHandle={this.authorChangeHandle} 
                                                        normalDOMHandle={this.normalDOMHandle} 
                                                        loadNormalFormValidator={this.loadNormalFormValidator}
                                    />
                                    <div className="col-sm-2">
                                    </div>
                                </div>
                                
                                <div className="row clearfix">
                                    <div className="col-sm-2">
                                    </div>
                                        {this.state.author.author_id=='undefined'
                                        ?
                                        <ModifyExtendedView author={this.state.author} 
                                                            authorChangeHandle={this.authorChangeHandle} 
                                                            extendDOMHandle={this.extendDOMHandle} 
                                                            loadExtendFormValidator={this.loadExtendFormValidator} 
                                        />
                                        :null}
                                    <div className="col-sm-2">
                                    </div>
                                </div>
                            </div>
                            
                            <div className="modal-footer">
                                 <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                 <button type="button" className="btn btn-primary" onClick={this.subHandle}>确定</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
});

module.exports = AddPDO;
