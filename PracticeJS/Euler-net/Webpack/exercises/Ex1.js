
//var $ = require ('jquery');
var prettify = require('../prettify');

function ex1(node){
	var sum = 0;

	for(let i = 0; i < 1000; i++) {
		if (i%3===0 || i%5===0) {
		  sum+=i;
		}
	}

	$(node).html(prettify(sum));
}

module.exports = ex1;