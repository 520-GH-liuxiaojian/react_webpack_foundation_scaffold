'use strict';

const path = require('path')

const { merge } = require("webpack-merge")
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserPlugin()
        ]
    }
}

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development'
    const webpackConfig = isDev ? require('./webpack.dev') : require('./webpack.build')

    return merge(webpackBaseConfig, webpackConfig)
}


