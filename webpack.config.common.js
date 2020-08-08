/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 100000,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            // cacheGroups: {
            //     styles: {
            //         name: 'styles',
            //         test: /\.css$/,
            //         chunks: 'all',
            //         enforce: true,
            //     },
            // },
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
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/288
                    // {
                    //     loader: 'style-loader',
                    // },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            scriptLoading: 'defer',
            inject: 'body',
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['id'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].[hash].bundle.css',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 4200,
        hot: false,
        liveReload: true,
        publicPath: '/',
        watchContentBase: true,
    },
};
