const path = require('path');

const webpack = require('webpack');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    resolve: {
        alias: {
            'react': path.resolve(__dirname, '../node_modules/react/umd/react.production.min'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom/umd/react-dom.production.min'),
            'babel-polyfill': path.resolve(__dirname, '../node_modules/babel-polyfill/dist/polyfill.min'),
        },
        mainFields: ['main'],
        extensions: ['.js', '.jsx', '.json', '.less', '.css'],
        modules: [path.resolve(__dirname, '../node_modules')],
    },
    entry: {
        library: [
            'react',
            'react-dom',
            'babel-polyfill',
        ]
    },
    output: {
        filename: '[name]_[chunkhash].dll.js',
        path: path.resolve(__dirname, '../library'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: ' [name]_[hash]',
            path: path.resolve(__dirname, '../library/manifest.json')
        }),
    ],
    mode: 'production',
    optimization: {
        minimize: true,
        splitChunks: {
            minSize: 0, // 模块的大小，0 => 引用了模块就会分离
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    name: 'common',
                    minChunks: 1 // 引用次数
                }
            }
        }
    }
}