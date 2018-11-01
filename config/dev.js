const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rules = require('./rules');

module.exports = {
    entry: {
        index: './src/js/index.js',
    },
    module: {
        rules: rules.rule
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
        })
    ],
    //server
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        //服务器得IP地址，可以使用IP也可以使用localhost
        host: '172.19.4.242',
        //服务器端压缩是否开启
        compress: true,
        port: 8081,
        proxy: {
            '/api': {
                target: '',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};