const path = require('path');

const webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less', '.css'],
        modules: [__dirname, 'node_modules']
    },
    entry: {
        library: [
            'react',
            'react-dom',
            'lodash',
            'babel-polyfill'
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
    mode: 'production'
}