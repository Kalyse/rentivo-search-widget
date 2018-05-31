const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = function ( srcPath ) {
    return {
        plugins: [
            new HtmlWebpackPlugin( {
                // filename: `index.html`,
                template: `${srcPath}/index.html`,
                inject: 'head'
            } )
        ]
    };
};