const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SCSS_MODULE_REGEX = /\.module\.(scss)$/;
const ASSET_REGEX = /\.(png|svg|jpg|jpeg|gif)$/i;
const TSX_REGEX = /\.tsx?$/;

module.exports = {
	mode: 'development',
	devServer: {
		static: './dist',
	},
	entry: './src/index.tsx',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	module: {
		rules: [
			{
				test: TSX_REGEX,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: ASSET_REGEX,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Photon Health',
			template: './src/index.html',
		}),
	],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
};
