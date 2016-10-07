'use strict';

const webpack = require('webpack');

const defaultConfiguration = require('./webpack.config.js');

module.exports = Object.assign({}, defaultConfiguration, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            sourceMap: false
        })
    ]
});
