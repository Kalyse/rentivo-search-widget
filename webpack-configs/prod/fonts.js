module.exports = function ( paths ) {
    return {
        module: {
            rules: [
                {
                    test: /\.(woff2?|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name]/[name].[ext]'
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name]/[name].[ext]'
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name]/[name].[ext]'
                },
            ]
        }
    };
};