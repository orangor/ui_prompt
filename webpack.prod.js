const webpack = require('webpack');
const path = require('path');

const merge = require('webpack-merge');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // 热更新
    new webpack.HotModuleReplacementPlugin(),
     //   new webpack.HashedModuleIdsPlugin(),
    ],
    optimization: {
        moduleIds: 'deterministic',
        minimizer: [
            new TerserPlugin({
              terserOptions: {
                sourceMap: true, // 将 sourceMap 移动到这里
              },
              // 其他选项...
            }),
          ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "manifest",
                    minChunks: Infinity
                }
            }
        }
    },
   
    output: {
        //    filename: '[name].bundle.js',
        //   chunkFilename: '[name].bundle.js',
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
});