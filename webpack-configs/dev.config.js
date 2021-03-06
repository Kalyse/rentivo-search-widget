const path      = require('path');
const webpack   = require('webpack');
const merge     = require('webpack-merge');
const devserver = require('./dev/devserver');
const globVars  = require('./dev/globVars');
const html      = require('./dev/html');
const styles    = require('./dev/styles');
const fonts     = require('./dev/fonts');
const jScript   = require('./dev/jScript');

const PATHS = {
    source:  path.join(__dirname, '../src'),
    dist:    path.join(__dirname, '../dist'),
    modules: path.join(__dirname, '../node_modules'),
    docs:    path.join(__dirname, '../docs'),
};

module.exports = function () {
    return merge([
        {
            entry:   [
                `${ PATHS.source }/index.jsx`,
            ],
            output:  {
                path:     PATHS.dist,
                filename: 'jquery.rentivo-searchbar.js',
            },
            resolve: {
                extensions: ['.js', '.jsx', '.json'],
                modules:    [PATHS.modules, PATHS.source],
                alias:      {
                    '~core':       path.join(PATHS.source, 'core'),
                    '~components': path.join(PATHS.source, 'components'),
                    '~docs':       PATHS.docs,
                }
            },
        },
        {
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify('development')
                    }
                }),
            ]
        },
        jScript(),
        devserver(),
        globVars(),
        html(PATHS.source),
        styles(),
        fonts(),
    ])
};