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
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    style: PATHS.style,
    app: PATHS.app
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader'
          }
          // {
          //   loader: 'eslint'
          // }
        ],
        enforce: 'pre',
        exclude: /node_modules/,
        // define an include so we check just the files we need
        include: PATHS.app
      },
      {
        test: /\.(jpg|png)$/,
        use: [ 
          {
            loader: 'url-loader',
            options: {
              limit: 25000
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optimizationLevel: 7,
              interlaced: false,
              pngquant:{quality: "65-90", speed: 4}, 
              mozjpeg: {quality: 65}
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
switch(process.env.npm_lifecycle_event) {
  case 'build':

  case 'stats':
    config = merge(
      common,
      {output: {
        path: PATHS.build,
        filename: '[name].[chunkhash].js'
      }},
      externals.loadExternals(),
      {
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
      common,
      {output: {
        path: PATHS.build,
        filename: '[name].js'
      }},
      externals.loadExternals(),
      {
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