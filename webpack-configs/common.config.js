const path     = require( 'path' );
const merge    = require( 'webpack-merge' );
const jScript  = require( './common/jScript' );

const PATHS = {
    source: path.join( __dirname, '../source' ),
    build:  path.join( __dirname, '../build' ),
    modules: path.join(__dirname, '../node_modules'),
};

module.exports = function () {
    return merge( [
        jScript(),
    ] )
};