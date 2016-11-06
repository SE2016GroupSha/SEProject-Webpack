require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/bootstrap/dist/js/bootstrap.min.js');
require('../node_modules/bootstrapValidator/dist/css/bootstrapValidator.css');
require('../node_modules/bootstrapValidator/dist/js/bootstrapValidator.js');
require('../node_modules/bootstrapValidator/dist/js/language/zh_CN.js');
require('../node_modules/typeahead.js/dist/typeahead.bundle.mult-highlight.js');
require('../node_modules/typeahead.js-bootstrap-css/typeaheadjs.css');
require('../node_modules/clockpicker-gh-pages/dist/bootstrap-clockpicker.css');
require('../node_modules/clockpicker-gh-pages/dist/bootstrap-clockpicker.js');
require('../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css');
require('../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js');
require('../node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js');
require('../node_modules/jquery-mousewheel/jquery.mousewheel.js');
require('../css/main.css');
require('file?name=[name].[ext]!../icon/favicon.ico');

var App = require('./containers/App');

var app  = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);