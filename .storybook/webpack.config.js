const path = require("path");

const PATHS = {
    source:  path.join(__dirname, '../source'),
    build:   path.join(__dirname, '../build'),
    modules: path.join(__dirname, '../node_modules'),
};

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
    // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    storybookBaseConfig.module.rules.push(
        {
            resolve: {
                extensions: ['.js', '.jsx', '.json'],
                modules:    [PATHS.modules, PATHS.source],
                alias:      {
                    '~core':       path.join(PATHS.source, 'core'),
                    '~components': path.join(PATHS.source, 'components'),
                }
            }
        },
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
    );

    // Return the altered config
    return storybookBaseConfig;
};