
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const path = require('path');

const _DEV_ = process.env.NODE_ENV !== 'prod';

let config = {
	entry: { app: ['./src/main.js'] },
	output: {
		path: path.join(__dirname, './dist'),
		filename: _DEV_ ? 'js/[name].js' : 'js/[name].[chunkhash].js',
        chunkFilename: _DEV_ ? 'js/[name].js' : 'js/[name].[chunkhash].js'
	},
	module: {
		loaders: [
			{ test: /\.vue$/, loaders: ['vue-loader'] },
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
	plugins: [
        new webpack.DefinePlugin({
            // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['lib', 'manifest']
        }),
        // 根据文件内容生成 hash
        new WebpackMd5Hash(),
        new HtmlWebpackPlugin({
	        filename: 'index.html',
	        chunks: ['app', 'lib'],
	        template: './index.html',
	        minify: _DEV_ ? false : {
	            collapseWhitespace: true,
	            collapseInlineTagWhitespace: true,
	            removeRedundantAttributes: true,
	            removeEmptyAttributes: true,
	            removeScriptTypeAttributes: true,
	            removeStyleLinkTypeAttributes: true,
	            removeComments: true
	        }
	    })
    ],
	devtool: 'eval-source-map'
};

// 内嵌 manifest 到 html 页面
config.plugins.push(function() {
    this.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function(file, callback) {
            var manifest = '';
            Object.keys(compilation.assets).forEach(function(filename) {
                if (/\/?manifest.[^\/]*js$/.test(filename)) {
                    manifest = '<script>' + compilation.assets[filename].source() + '</script>';
                }
            });
            if (manifest) {
                var htmlSource = file.html.source();
                htmlSource = htmlSource.replace(/(<\/head>)/, manifest + '$1');
                file.html.source = function() {
                    return htmlSource;
                };
            }
            callback(null, file);
        });
    });
});

module.exports = config;