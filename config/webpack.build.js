'use strict';

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
    target: ['web', 'es5'],
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/[name][contenthash:8].css`
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
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
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserPlugin()
        ],
        // splitChunks: {
        //     minSize: 0, // 模块的大小，0 => 引用了模块就会分离
        //     cacheGroups: {
        //         commons: {
        //             chunks: 'all',
        //             name: 'common',
        //             minChunks: 2 // 引用次数
        //         }
        //     }
        // }
    }
}
