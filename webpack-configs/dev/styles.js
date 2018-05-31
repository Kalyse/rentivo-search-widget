module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test:    /\.css$/,
                    use:     [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test:    /\.scss$/,
                    use:     [
                        'style-loader',
                        'css-loader',
                        'resolve-url-loader',
                        'sass-loader?sourceMap'
                    ]
                },
            ]
        }
    };
};