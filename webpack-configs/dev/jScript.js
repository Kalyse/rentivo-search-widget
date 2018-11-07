module.exports = function () {
    return {
        module:  {
            rules: [
                {
                    test:   /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        envName: 'development'
                    }
                }
            ]
        },
    };
};