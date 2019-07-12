/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//Month Names

var monthNumbers = function () {
	var names = ["January", "February", "March", "April", "May", "June", "July", "August", 
		"September", "October", "November", "December"];
	return {
		name: function(num) {return names[num-1];},
		number: function(name) {return names.indexOf(name)+1;}
	};
}();

