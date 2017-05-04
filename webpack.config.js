/* eslint-disable */
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        path.join(__dirname, 'src', 'js', 'platform', 'main.jsx')
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'selenol.js'
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                ],
                include: [
                    path.resolve(__dirname, "src"),
                ]
            },
            {
                test: /.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new ExtractTextPlugin("selenol.css"),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    }
};
