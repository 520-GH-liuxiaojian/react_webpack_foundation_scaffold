'use strict';

const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'sass-loader',
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader',
            },
            {
                test: /.(png|jpg|gif|jpeg|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240 // 超过 1oKb 的图片会被单独打包
                        }
                    }
                ]
            },
        ]
    }
}
