require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/bootstrap/buttons.css');
require('../node_modules/bootstrap/dist/js/bootstrap.min.js');
require('../node_modules/bootstrapValidator/dist/css/bootstrapValidator.css');
require('../node_modules/bootstrapValidator/dist/js/bootstrapValidator.js');
require('../node_modules/bootstrapValidator/dist/js/language/zh_CN.js');
require('../css/main.css');
require('file?name=[name].[ext]!../icon/favicon.ico');

var App = require('./containers/App');

var app  = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);