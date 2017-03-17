


'use strict';

const webpack = require('webpack');
let config = require('./webpack.config');

let args = process.argv;
let watch = args.indexOf('--watch') > -1;
let online = args.indexOf('--deploy=online') > -1;

//测试环境静态资源 domain
let testPublicPath = '/';
//生产环境静态资源domain
let onlinePublicPath = '/';

//设置静态资源路径
config.output.publicPath = online ? onlinePublicPath : testPublicPath;

let compiler = webpack(config);

if (watch) {
    compiler.watch({}, callback);
} else {
    compiler.run(callback);
}


function callback(err, state) {
    if (err) {
        console.log(err);
    } else {
        console.log(state.toString({
            colors: true,
            chunks: false,
            children: false
        }));
    }
}
