const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

// Cleans out the build directory
exports.clean = path => ({
  plugins: [
    new CleanWebpackPlugin([path], {
      root: process.cwd(), // Without `root`, CleanWebpackPlugin won't point to our project
    }),
  ],
});


// For initializing the HTML
exports.setupHTML = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Euler-net Webpack pt2',
      template: 'template.html',
    }),
  ],
});

// For inlining CSS
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});

// For inlining Sass
exports.loadSass = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});

// For importing images
exports.loadImages = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000,
            },
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
                quality: 90,
              },
              gifsicle: {
                interlaced: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
            },
          },
        ],
      },
    ],
  },
});





// For extracting Sass into a separate file
exports.extractSass = paths => ({
  module: {
    rules: [
      // Extract Sass during build
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
        include: paths,
      },
    ],
  },
  plugins: [
    // Output extracted CSS to a file
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      disable: false,
      allChunks: true,
    }),
  ],
});


// Remove unused CSS
exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths }),
  ],
});


exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}



exports.minify = function() {
  //This can be used if Babel is not used to transform the original code.
  // return {
  //   plugins: [
  //     new BabiliPlugin()
  //   ]
  // }

  // This can be used if Babel is used to transform the original code to ES5.
  return {
    optimization: {
      minimizer: [new UglifyWebpackPlugin()],
    }
  };
}

exports.devServer = function(options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Overlay errors in browser
      overlay: {
            errors: true,
            warnings: true,
          },

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}
