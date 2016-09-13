const webpack = require('webpack');

exports.loadExternals = function() {
	return {//loads jQuery from a script
	    externals: {
	        jquery: 'jQuery',
	        lodash: '_'
	    },
	    // automatically loads jQuery if it sees a $ 
	    plugins: [
	        new webpack.ProvidePlugin({
	            $: 'jquery',
	        }),
	        new webpack.ProvidePlugin({
	            _: 'lodash',
	        })
	    ]
	}
}


