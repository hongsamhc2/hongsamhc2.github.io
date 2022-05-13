const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        path: path.resolve(__dirname,'build'),
        filename: '[name].bundle.js',
        publicPath:'/'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(svg|png|jpe?jpeg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'static/img'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                    loader: 'css-loader',
               
                } ],

            }
        ]
    },
    resolve: { extensions: [".mjs", ".js", ".jsx", ".css"] },
    //sourcemap
    devtool: 'inline-source-map',
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        hot: true,
        historyApiFallback: true,

    },
    mode: "development"
}