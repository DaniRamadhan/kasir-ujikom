const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js"
    },
    mode:'production',
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    {
                        loader: "style-loader"
                    },
                    {
                        loader:"css-loader"
                    }
                ]     
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./pages/page.html",
            filename: "pages/page.html"
        })
    ],
}