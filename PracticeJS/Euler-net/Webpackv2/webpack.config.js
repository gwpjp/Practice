const path = require('path');
const merge = require('webpack-merge');
const parts = require('./libs/parts');
const externals = require('./libs/externals');

const PATHS = {
    app: path.join(__dirname, 'app'),
    style: path.join(__dirname, 'app', 'main.css'),
    build: path.join(__dirname, 'build')
};

const common = {
    context: __dirname, //Not necessary because Webpack defaults to current working directory
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        style: PATHS.style,
        app: path.join(PATHS.app, 'index.js') //Not necessary to append index.js because Node defaults to it
    },
    module: {
        rules: [{
                test: /\.js?$/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["env", {
                                    "modules": false
                                }]
                            ]
                        }
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ],
                enforce: 'pre',
                // define an exclude to ignore node modules
                exclude: /node_modules/,
                // define an include so we check just the files we need
                include: PATHS.app
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 25000
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                                quality: 90
                            },
                            gifsicle: {
                                interlaced: true,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            }
                        }
                    }

                ],
                include: PATHS.app
            }
        ]
    },

};

var config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'build':

    case 'stats':
        config = merge(
            common, {
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js'
                }
            },
            externals.loadExternals(), {
                devtool: 'source-map'
            },
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.minify(),
            parts.setupHTML(),
            parts.extractCSS(PATHS.style),
            parts.purifyCSS([PATHS.app]),
            parts.clean(PATHS.build)
        );
        break;
    default:
        config = merge(
            common, {
                output: {
                    path: PATHS.build,
                    filename: '[name].js'
                }
            },
            externals.loadExternals(), {
                devtool: 'eval-source-map'
            },
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'development'
            ),
            parts.setupHTML(),
            parts.setupCSS(PATHS.style),
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = config;
