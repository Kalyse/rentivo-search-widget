const path      = require( 'path' );
const webpack   = require('webpack');
const merge     = require( 'webpack-merge' );
const common    = require( './common.config' );
const devserver = require( './dev/devserver' );
const globVars  = require( './dev/globVars' );
const html      = require( './dev/html' );
const styles    = require( './dev/styles' );
const fonts     = require( './dev/fonts' );

const PATHS = {
    source: path.join( __dirname, '../source' ),
    build:  path.join( __dirname, '../build' ),
    modules: path.join(__dirname, '../node_modules'),
};

module.exports = function () {
    return merge( [
        {
            entry: [
                `${ PATHS.source }/index.jsx`,
            ],
            output: {
                path:     PATHS.build,
                filename: 'jquery.rentivo-searchbar.js',
            },
            resolve: {
                extensions: [ '.js', '.jsx' ],
                modules: [PATHS.modules, PATHS.source],
                alias: {
                    '~core': path.join(PATHS.source, 'core'),
                    '~components': path.join(PATHS.source, 'components'),
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
        common(),
        devserver(),
        globVars(),
        html( PATHS.source ),
        styles(),
        fonts(),
    ] )
};