'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/[name][contenthash:8].css`
        }),
    ],
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
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        // options here
                        options: {
                            remUni: 75,
                            remPrecision: 8
                        }
                    }
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
                    'less-loader',
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        // options here
                        options: {
                            remUni: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'sass-loader',
                    'postcss-loader',
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
            }
        ]
    }
}
