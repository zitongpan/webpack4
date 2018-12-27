const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const rules = {
    rule: [{
            test: /\.(scss|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader?modules=false',
                    options: {
                        importLoaders: 1,
                        minimize: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, './.postcssrc.js')
                        }
                    }
                },
                // {
                //     loader: 'px2rem-loader',  //rem转换
                //     options: {
                //         remUni: 75,
                //         remPrecision: 3
                //     }
                // },
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|gif|jpeg)/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'images/' //打包后的图片放到images文件夹下
                }
            }]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'font/' //打包后的文字放到font文件夹下
                },
            }]
        },
        //处理html中的图片
        {
            test: /\.(htm|html)$/i,
            use: ['html-withimg-loader']
        },
        //babel 配置
        {
            test: /\.(jsx|js)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        "env"
                    ]
                }
            },
            exclude: /node_modules/
        },
    ]
}
module.exports = rules;