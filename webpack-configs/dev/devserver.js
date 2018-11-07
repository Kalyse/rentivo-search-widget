const webpack = require('webpack');

module.exports = function () {
    return {
        devServer: {
            hot:     true,
            inline:  true,
            port:    3001,
            open:    true, // to open the local server in browser
            overlay: {
                warnings: true,
                errors:   true
            }
        },
        devtool:   'eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        ]
    }
};