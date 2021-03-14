//引入path，对路径进行处理
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//创建一个配置对象
module.exports = {
    //配置入口
    entry: './example/index.js',

    watch: true,

    watchOptions: {
        //默认为空，设置不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        //监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout: 300,
        //设置轮询文件是否变化时间，默认每秒问1000次
        poll: 1000
    },

    //配置出口
    output: {
        //出口路径
        path:path.resolve(__dirname,'dist'),
        //出口文件名
        filename: 'bundle.js'
    },
    module: {
        rules: [
          { 
            test: /\.js$/, 
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader"
                },
                {
                    loader: path.resolve(__dirname, './src/index.js')
                }
            ] 
          }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        host: HOST,
        port: PORT,
        open: true,
        quiet: true
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}