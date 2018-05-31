module.exports = function () {
    return {
        module:  {
            rules: [
                {
                    test:   /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            ["env"],
                            "stage-0"
                        ],
                        plugins: [
                            "transform-runtime",
                            "babel-plugin-transform-class-properties",
                            "transform-object-rest-spread"
                        ]
                    }
                },
                {
                    test:   /\.jsx$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            ["env"],
                            "react",
                            "stage-0"
                        ],
                        plugins: [
                            "transform-runtime",
                            "babel-plugin-transform-class-properties",
                            "transform-object-rest-spread"
                        ]
                    }
                },
            ]
        },
    };
};