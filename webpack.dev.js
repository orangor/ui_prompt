const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static:'./dist',
     //   disableHostCheck: true,
         historyApiFallback: true,
         allowedHosts: "all",
         hot: true,
         compress: true,
         port: 3001,
         open: true,
         historyApiFallback: true,
    }
    
});