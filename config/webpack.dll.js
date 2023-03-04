const path = require('path');

const webpack = require('webpack');

module.exports = {
    resolve: {
        alias: {
            'react': path.resolve(__dirname, '../node_modules/react/umd/react.production.min'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom/umd/react-dom.production.min'),
            // 'babel-polyfill': path.resolve(__dirname, '../node_modules/babel-polyfill/dist/polyfill.min'),
        },
        mainFields: ['main'],
        extensions: ['.js', '.jsx', '.json', '.less', '.css'],
        modules: [path.resolve(__dirname, '../node_modules')],
    },
    entry: {
        library: [
            'react',
            'react-dom',
            // 'babel-polyfill',
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
}