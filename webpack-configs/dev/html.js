const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = function ( srcPath ) {
    return {
        plugins: [
            new HtmlWebpackPlugin( {
                template: `${srcPath}/index.html`,
            } )
        ]
    };
};