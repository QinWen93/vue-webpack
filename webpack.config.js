var path = require('path');
module.exports = {
	entry: ['./src/main.js'],
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].js',
		publicPath: './dist'
	},
	devServer: {
		historyApiFallback: true,
		hot: false,
		inline: true
	},
	module: {
		loaders: [
			{ test: /\.vue$/, loader: 'vue-loader' },
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015'], plugins: ['transform-runtime'] }},
			{ test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' },
			{ test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader?sourceMap' },
			{ test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },
			{ test: /\.(html|tpl)$/, loader: 'html-loader'}
		]
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			filter: path.join(__dirname, './src/filters'),
			components: path.join(__dirname, './src/components')
		}
	},
	devtool: 'eval-source-map'
};