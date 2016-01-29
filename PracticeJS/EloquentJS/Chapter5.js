/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

// Flattening

var flatten = function(x) {
	var y;
	y = x.reduce(function(prev,cur) {
		return prev.concat(cur);
	},[]);
	return y;
};

// Mother-child age difference

var byName = function(name, obj = ancestry) {
	obj.forEach(function (cur) {
		if (cur.name === name) {
			return cur;
		}
	});
};
