var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var RES_PATH = path.resolve(ROOT_PATH, 'resource');
var TEM_PATH = path.resolve(RES_PATH, 'templates');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'Index.jsx')
  },
  node: {
    fs: 'empty'
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },
  
  module: {
    loaders: [
	  {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015', 'react']
        }
      },
	  {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
	  {
		test: /\.(png|jpg|gif)$/,
		loader: 'url-loader?limit=1000'
	  },
	  {
		test: /\.(woff|woff2|svg|ttf|eot)(\?v=.*)?$/,
		loader: 'file'
	  },
	  {
		test: require.resolve('jquery'),
		loader: 'expose?$!expose?jQuery'
	  }
    ]
  },
  
  resolve: {
      extensions: ['', '.js', '.jsx']
  },

  plugins: [
	new HtmlwebpackPlugin({
		title: '应用名',
		template: path.resolve(TEM_PATH, 'index.html'),
		filename: 'index.html',
	}),
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
		'window.$': 'jquery',
		React: 'react',
		ReactDOM: 'react-dom'
	}),
	new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
	new webpack.DefinePlugin({
	  "process.env": {
		NODE_ENV: JSON.stringify("production")
	  }
	})
  ]
};