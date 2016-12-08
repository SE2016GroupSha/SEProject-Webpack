require('../node_modules/bootstrap/dist/js/bootstrap.js');
require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('../node_modules/font-awesome/css/font-awesome.css');
require('../node_modules/simple-line-icons/css/simple-line-icons.css');
require('../node_modules/animate.css/animate.css');
require('../resource/css/app.css');
require('../resource/css/font.css');
require('../resource/css/main.css');
require('file?name=[name].[ext]!../resource/icon/favicon.ico');

require('../node_modules/clockpicker-gh-pages/dist/bootstrap-clockpicker.css');
require('../node_modules/clockpicker-gh-pages/dist/bootstrap-clockpicker.js');
require('../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css');
require('../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js');
require('../node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js');

var App = require('./App');

ReactDOM.render(<App/>, document.getElementById('app'));