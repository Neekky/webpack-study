const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileListPlugin = require('./src/plugins/FileListPlugin');
var path = require("path")

module.exports = {
    mode: "development",
    // entry: {
    //     // index: './src/index.js',
    //     main: './src/index.js',
    //     // live: ['./src/live1.js', './src/live2.js']
    // },
    output: {
        filename: 'scripts/[name].[chunkhash:6].js',
        chunkFilename: '[name].[chunkhash:5].chunk.js',
        path: path.resolve(__dirname, "target"), //必须配置一个绝对路径，表示资源放置的文件夹，默认是dist
    },
    module: {
        rules: [
            {
                test: /\.(png)|(jpg)|(gif)$/, 
                use: [{
                    loader: "./src/loaders/img-loader.js",
                    options: {
                        limit: 3000, //3000字节以上使用图片，3000字节以内使用base64
                        filename: "img-[contenthash:5].[ext]"
                    }
                }]
            },
            {
                test: /\.(css)/,
                use: [{
                    loader: "./src/loaders/style-loader.js"
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),  
        new FileListPlugin("文件列表.md")
    ]
}