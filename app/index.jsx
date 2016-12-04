require('../node_modules/bootstrap/dist/js/bootstrap.js');
require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('../node_modules/font-awesome/css/font-awesome.css');
require('../node_modules/simple-line-icons/css/simple-line-icons.css');
require('../resource/css/app.css');
require('../resource/css/animate.css');
require('../resource/css/font.css');
require('../resource/css/main.css');
require('file?name=[name].[ext]!../resource/icon/favicon.ico');

var App = require('./App');

ReactDOM.render(<App />, document.getElementById('app'));