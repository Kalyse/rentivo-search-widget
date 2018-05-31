const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const webpack = require( 'webpack' );
// postCSS plugins
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = function () {
    return {
        module:  {
            rules: [
                {
                    test:    /\.css$/,
                    use:     ExtractTextPlugin.extract( {
                        fallback: 'style-loader',
                        use:      ['css-loader', 'postcss-loader'],
                    } ),
                },
                {
                    test:    /\.scss$/,
                    use:     ExtractTextPlugin.extract( {
                        fallback:   'style-loader',
                        use:        [
                            'css-loader',
                            'postcss-loader',
                            'resolve-url-loader',
                            'sass-loader?sourceMap'
                        ],
                    } ),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin( './jquery.rentivo-searchbar.css' ),
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: function() {
                        return [
                            autoprefixer,
                            cssnano
                        ]
                    }
                }
            })
        ]
    };
};