const path = require('path');
const HtmlWebpackPugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: path.resolve(__dirname, "src", "index.js")
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    plugins: [
        new HtmlWebpackPugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ],
    devServer: {
        port: 4000,
        disableHostCheck: true 
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
                
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}
