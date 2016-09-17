module.exports = {
	context: __dirname + '/app',
	entry: './index.js',
	output: {
		path: __dirname + '/app',
		filename: './bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/,	exclude: /(node_modules|bower_components)/,	loader: 'babel'},
			{test: /\.html$/, loader: 'raw'}
		]
	}
};