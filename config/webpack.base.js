'use strict';

const path = require('path')

const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const webpackDevelopmentConfig = require('./webpack.dev')
const webpackProductionConfig = require('./webpack.build')

const webpackBaseConfig = {
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://now8.gtimg.com/now/lib/16.8.6/react.min.js?_bid=4042',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js?_bid=4042',
                    global: 'ReactDOM',
                },
            ],
        }),
    ],
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'javascript/[name][chunkhash:8].js'
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /(react|react-dom|lodash-es)/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    // },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}

if (process.env.NODE_ENV === "development"){
    module.exports =merge(webpackBaseConfig, webpackDevelopmentConfig)
}
module.exports = merge(webpackBaseConfig, webpackProductionConfig)



