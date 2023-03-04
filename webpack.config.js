'use strict';

const path = require('path')

const { HotModuleReplacementPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    target: 'web',
    mode: 'development',
    // watch: true, // 每次更新之后，需要手动刷新浏览器，没有办法实现文件更新之后，浏览器自动刷新
    // watchOptions: {
    //     // 默认是空，不监听文件或者文件夹，支持正则匹配
    //     // 不监听 node_modules 文件夹，性能会提升
    //     ignored: /node_modules/,
    //     // 监听到变化过后会等待 300ms 再去执行，默认 300ms
    //     aggregateTimeout: 300,
    //     // 判断文件是否发生变化，是通过不停的询问西系统指定的文件有没有变化实现的，默认是每秒 1000 次
    //     poll: 1000
    // },
    plugins: [
        new HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: `css/[name][contenthash:8].css`
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
            serveIndex: true, //中间件会在查看没有 index.html 文件的目录时生成目录列表
        },
        compress: true, //启动gzip压缩
        open: true, // 自动打开浏览器
        port: 9000, //端口号
        // hot: true,
        // proxy: {
        //     "/api": {
        //         // 目标地址
        //         target: "https://api.xx.xx.xx",
        //         // 必要时重写路径
        //         pathReWrite: {
        //             "^/api":''
        //         },
        //         // 确保请求主机名是target中的主机名
        //         changeOrigin: true,
        //     },
        //     ...
        // },
        // // 允许访问域名，设置白名单，all为全部允许
        // allowedHosts: [
        //     'host.com',
        //     'xxx.com',
        // ],
        // // 日志设置，设置reconnect: n可以设置重连次数,
        // client: {
        //     logging: 'info',
        // },
        // 更多属性请查看：https://webpack.js.org/configuration/dev-server
    },
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'javascript/[name][chunkhash:8].js'
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
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                            importLoaders: 1
                        }
                    },
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                            importLoaders: 1
                        }
                    },
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
