const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ASSET_REGEX = /\.(png|svg|jpg|jpeg|gif)$/i;
const TSX_REGEX = /\.tsx?$/;

module.exports = {
	mode: 'development',
	devServer: {
		static: './dist',
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: { '^/api': '' },
			},
		},
	},
	entry: './src/frontend/index.tsx',
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
			template: './src/frontend/index.html',
		}),
	],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/frontend/components'),
			'@services': path.resolve(__dirname, './src/frontend/services'),
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
};
