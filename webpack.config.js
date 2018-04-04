'use strict';

var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = env => ({
        context: __dirname, // to automatically find tsconfig.json
        devtool: 'source-map',
        entry: './src/index.ts',
        output: {
            path: __dirname + '/public',
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
                    }
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js' ]
        },
        devServer: {
            contentBase: './public',
            port: 9000
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: "body"
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(env.NODE_ENV),
                },
            })
        ]
    }
);