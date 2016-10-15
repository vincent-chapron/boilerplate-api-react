'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

module.exports = {
    entry: ['./app.js'],
    output: {filename: 'app.min.js'},
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {presets: ['react', 'es2015', 'stage-2']}
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    externals: nodeModules,
    target: 'node',
    node: {__dirname: true},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            sourceMap: false
        })
    ]
};
