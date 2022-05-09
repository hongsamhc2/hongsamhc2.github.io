const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const COPYWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src', 'app.js')
    },
    output: {
        path: path.resolve(__dirname),
        filename:'app.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\s?css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|svg|gif|ico|ttf)/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html')
            }

        ),
        new COPYWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src', 'resources'),
                to: path.resolve(__dirname, 'resources'),
                noErrorOnMissing: true
            }]
        })
    ]

}