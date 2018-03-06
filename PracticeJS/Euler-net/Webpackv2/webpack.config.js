const path = require('path');
const merge = require('webpack-merge');
const parts = require('./libs/parts');
const externals = require('./libs/externals');

const PATHS = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, 'app', 'main.css'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = {
  context: __dirname, // Not necessary because Webpack defaults to current working directory
  entry: {
    style: PATHS.style,
    app: path.join(PATHS.app, 'index.js'), // Not necessary to append index.js because Node defaults to it
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader', // Uses presets in the .babelrc file
          },
          {
            loader: 'eslint-loader', // Uses presets in the .eslintrc file
          },
        ],
        enforce: 'pre',
        exclude: /node_modules/, // define an exclude to ignore node modules
        include: PATHS.app, // define an include so we check just the files we need
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/, // define an exclude to ignore node modules
        include: PATHS.app, // define an include so we check just the files we need
      },
      {
        test: /\.(jpg|png|gif)$/,
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
        include: PATHS.app,
      },
    ],
  },
};

const productionConfig = merge(
  commonConfig,
  {
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
    },
  },
  externals.loadExternals(),
  {
    devtool: 'source-map',
  },
  //parts.setFreeVariable('process.env.NODE_ENV', 'production'),
  //parts.minify(),
  //parts.setupHTML(),
  //parts.extractCSS(PATHS.style),
  //parts.purifyCSS([PATHS.app]),
  parts.clean(PATHS.build),
);

const developmentConfig = merge(
  commonConfig,
  {
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
  },
  externals.loadExternals(),
  {
    devtool: 'eval-source-map',
  },
  //parts.setFreeVariable('process.env.NODE_ENV', 'development'),
  //parts.setupHTML(),
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
);

module.exports = (mode) => {
  if (mode === 'production') {
    console.log('Running Webpack in production mode...');
    return merge(commonConfig, productionConfig, { mode });
  } else if (mode === 'development') {
    console.log('Running Webpack in development mode...');
    return merge(commonConfig, developmentConfig, { mode });
  }

  console.log('Running Webpack in default mode...');
  return merge(commonConfig, { mode });
};
