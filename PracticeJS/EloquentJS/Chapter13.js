/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//Build a table given an array of objects
function buildTable(arr) {
	var table = document.createElement("table");
	var headrow = document.createElement("tr");

	//Find keys of first element and append to header row
	for (var key in arr[0]) {
		let head = document.createElement("th");
		head.appendChild(document.createTextNode(key));
		headrow.appendChild(head);
	}
	table.appendChild(headrow);

	//For each element in the array
	for (var elt of arr) {
		let row = document.createElement("tr");
		for (var key in elt) {
			let col = document.createElement("td");
			col.appendChild(document.createTextNode(elt[key]));
			row.appendChild(col);
		}
		table.appendChild(row);
	}

	document.body.appendChild(table);
}