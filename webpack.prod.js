const {merge} = require('webpack-merge')
const path = require('path')
const common = require('./webpack.config.js')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports=merge(common,{
    mode:"production",
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        })
    ]
})