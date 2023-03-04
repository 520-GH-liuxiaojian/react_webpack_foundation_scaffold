'use strict';

const path = require('path')

const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackDevelopmentConfig = require('./webpack.dev')
const webpackProductionConfig = require('./webpack.build')

const webpackBaseConfig = {
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
        }),
        new CleanWebpackPlugin(),
    ],
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'javascript/[name][chunkhash:8].js'
    },
}

if (process.env.NODE_ENV === "development"){
    module.exports =merge(webpackBaseConfig, webpackDevelopmentConfig)
}
module.exports = merge(webpackBaseConfig, webpackProductionConfig)



