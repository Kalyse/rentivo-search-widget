module.exports = function () {
    return {
        devServer: {
            port:    3000,
            open:    true, // to open the local server in browser
            overlay: {
                warnings: true,
                errors:   true
            },
        },
        devtool:   'inline-source-map',
    }
};