const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const rules = require('./rules');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        publicPath: '/', //处理静态文件路径。
    },
    module: {
        rules: rules.rule
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true, //删除空白符与换行符
                removeAttributeQuotes: true //removeAttrubuteQuotes是去掉属性的双引号
            },
            hash: true,
            filename: "./index.html",
            chunks: ['index', "jquery"],
            template: "./src/index.html",
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new PurifyCSSPlugin({
            //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
            paths: glob.sync(path.join(__dirname, '../src/*.html'))
        }),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true
        }),
    ],
    //这个配置是用来处理优化配置的，它将会覆盖webpack默认的js压缩（其他测试中），
    //所以这里要使用UglifyJsPlugin()重新压缩一下js，optimizeCss({})压缩抽离出来的css
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin(), new optimizeCss()]
    }
};