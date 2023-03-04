'use strict';

const path = require('path')

module.exports = {
    mode: 'development',
    watch: true, // 每次更新之后，需要手动刷新浏览器，没有办法实现文件更新之后，浏览器自动刷新
    watchOptions: {
        // 默认是空，不监听文件或者文件夹，支持正则匹配
        // 不监听 node_modules 文件夹，性能会提升
        ignored: /node_modules/,
        // 监听到变化过后会等待 300ms 再去执行，默认 300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化，是通过不停的询问西系统指定的文件有没有变化实现的，默认是每秒 1000 次
        poll: 1000
    },
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
