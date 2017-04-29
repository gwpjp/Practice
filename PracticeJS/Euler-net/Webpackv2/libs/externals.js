const webpack = require('webpack');

exports.loadExternals = function() {
	return {//loads jQuery from a script
	    externals: {
	        jquery: 'jQuery'
	    },
	    // automatically loads jQuery if it sees a $ 
	    plugins: [
	        new webpack.ProvidePlugin({
	            $: 'jquery',
	        })
	    ]
	}
}


