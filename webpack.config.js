var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
var production = process.argv.find((x) => x === '-p');

// Create multiple instances
const extractCSS = new ExtractTextPlugin('style.css');
const extractHTML = new ExtractTextPlugin('index.html');

module.exports = {
	entry: './src/app.tsx',
	output: {
		filename: 'app.js',
		path: __dirname + '/dist'
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.json', '.css', '.scss' ]
	},

	module: {
		rules: [
			{
				test: /tsx?$/,
				loader: 'ts-loader'
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			},
			{
				test: /\.s?css$/,
				use: extractCSS.extract({
					use: [ 'css-loader', 'sass-loader' ]
				})
			},
			{
				test: /\.html?$/,
				use: extractHTML.extract({
					use: [ 'raw-loader' ]
				})
			}
		]
	},

	plugins: production
		? [
				extractCSS,
				extractHTML,
				new webpack.DefinePlugin({
					'process.env': {
						NODE_ENV: JSON.stringify('production')
					}
				})
			]
		: [ extractCSS, extractHTML ],

	mode: production ? 'production' : 'development'
};
