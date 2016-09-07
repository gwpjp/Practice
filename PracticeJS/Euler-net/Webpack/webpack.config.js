webpack = require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json', '.jsx'] 
    },
    //loads jQuery from a script
    externals: {
        jquery: 'jQuery'
    },
    // automatically loads jQuery if it sees a $ 
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
        })
    ]
};