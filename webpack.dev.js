/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

const devConf = {
    mode: 'development',
    optimization: {},
    module: {
        rules: [],
    },
};

module.exports = merge(common, devConf);
