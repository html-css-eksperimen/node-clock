/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

const prodConf = {
    mode: 'production',
    // entry: {
    //     main: './src/app.js',
    // },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                    mangle: true,
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true,
                    },
                },
                parallel: true,
                sourceMap: true,
            }),
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new CssMinimizerPlugin({
                parallel: true,
                sourceMap: true,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
        },
    },
    entry: path.resolve(__dirname, 'src', 'app.js'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-transform-runtime',
                        ],
                    },
                },
            },
        ],
    },
    plugins: [],
};

module.exports = merge(common, prodConf);
