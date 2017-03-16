
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const PORT = 8080;
const HOST = '127.0.0.1';

const localPublicPath = 'http://' + HOST + ':' + PORT + '/';


config.output.publicPath = localPublicPath;

//配置webpack-dev-server
config.entry.app.unshift('webpack/hot/only-dev-server', 'webpack-dev-server/client?' + localPublicPath);

config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

// see http://webpack.github.io/docs/build-performance.html#sourcemaps
config.devtool = '#eval-cheap-module-source-map';

//启动本地开发服务器
new WebpackDevServer(webpack(config), {
    hot: true,
    inline: true,
    compress: true,
    stats: {
        chunks: false,
        children: false,
        colors: true
    },
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,
    proxy: [{
        context: ['/*'],
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
    }]
}).listen(PORT, HOST, () => {
    console.log('Server is running on:-->' + localPublicPath)
});