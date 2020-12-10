const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileListPlugin = require('./src/plugins/FileListPlugin');
const CopyPlugin = require('copy-webpack-plugin');
// const FindPre = require('./src/loaders/find-pre-loader');
var path = require("path")

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js',
        main: './src/index.js',
        live: ['./src/live1.js', './src/live2.js']
    },
    output: {
        filename: 'scripts/[name].[chunkhash:6].js',
        chunkFilename: '[name].[chunkhash:5].chunk.js',
        path: path.resolve(__dirname, "dist"), //必须配置一个绝对路径，表示资源放置的文件夹，默认是dist
        publicPath: '/'
        // path: path.resolve(__dirname, "target"), 
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            name: 'imgs/[name].[hash:5].[ext]',
                            publicPath: '../'
                        }
                    },
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: 'imgs/[name].[hash:5].[ext]'
                    //     }
                    // },
                    // {
                    //     loader: "./src/loaders/img-loader.js",
                    //     options: {
                    //         limit: 3000, //3000字节以上使用图片，3000字节以内使用base64
                    //         filename: "img-[contenthash:5].[ext]"
                    //     }
                    // }
                ],
            },
            // {
            //     test: /\.(png)|(jpg)|(gif)$/,
            //     use: [{
            //         loader: "./src/loaders/img-loader.js",
            //         options: {
            //             limit: 3000, //3000字节以上使用图片，3000字节以内使用base64
            //             filename: "img-[contenthash:5].[ext]"
            //         }
            //     }]
            // },
            {
                test: /\.(css)/,
                use: [{
                    loader: "./src/loaders/style-loader.js"
                }]
            },
            {
                test: /\.(js|css)$/,
                use: [{
                    loader: "./src/loaders/find-pre-loader.js"
                }]
            }
        ]
    },
    devServer: {
        port: 5688,
        open: true,
        index: 'main.html',
        openPage: 'html/index.html',
        proxy: { //代理规则
            "/api/student": {
                target: "http://open.duyiedu.com",
                changeOrigin: true //更改请求头中的host和origin
            }
        }
    },
    stats: {
        modules: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "html/index.html",
            chunks: ["index"],
            // title: '我信了你的邪'
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "html/main.html",
            chunks: ["main"],
            title: '我信了你的邪'
        }),
        new HtmlWebpackPlugin({
            // template: "./public/index.html",
            filename: "html/live.html",
            chunks: ["live"],
            // title: '我信了你的邪'
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: "./public", to: "./" }
        //     ]
        // }),
        new FileListPlugin("文件列表.md"),
    ]
}