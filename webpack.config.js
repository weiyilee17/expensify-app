// entry -> output

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env) => {

	const isProduction = env === 'production';
	const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });


	return {
		entry: ['babel-polyfill', './src/app.js'],
		mode: 'development',
		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js'
		},
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}, {
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}]
		},
		plugins: [
			CSSExtract
		],
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true
		}
	};
};


// history api fallback: handle rounting via client side code. It should return index.html for all 404 routes