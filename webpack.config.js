'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['./front/src/index.js'],
    output: {
        path: path.join(__dirname, 'front', 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'stage-2']
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    resolve: {extensions: ['', '.js', '.jsx']},
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
