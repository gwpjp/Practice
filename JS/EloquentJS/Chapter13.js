/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//Build a table given an array of objects
function buildTable(arr) {
	var table = document.createElement("table");
	table.id = "myTable";
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
			if (typeof elt[key] === 'number') {
				col.style.textAlign = "right";
			}
			row.appendChild(col);
		}
		table.appendChild(row);
	}

	document.body.appendChild(table);
}

//Elements by Tag Name
function getElements(node,tag) {
	var children = node.childNodes;
	var arr = [];

	for (var elt in Object.keys(children)) {
		if (children[elt].tagName.toLowerCase() === tag.toLowerCase()) {
			arr.push(children[elt]);
		}
	}
	return arr;
}

//The cat's hat
function catFun() {
	var html = `
		<p  style="text-align: center">
			<img id="cat" src="cat.png" style="position: absolute">
		</p>
		<p  style="text-align: center">
			<img id="hat" src="hat.png" style="position: absolute">
		</p>
	`;

	document.body.innerHTML = html;

	var cat = document.getElementById("cat"); 
	var angle = 0, lastTime = null;
	var hat = document.querySelector("#hat"); 


	function animate(time) {
		if (lastTime != null) {
			angle += (time - lastTime) * 0.001;
		}
		lastTime = time;
		cat.style.top = (Math.sin(angle) * 100) + 200 + "px"; 
		cat.style.left = (Math.cos(angle) * 200) + 200 + "px"; 
		hat.style.top = (Math.sin(angle+90) * 100) + 200 + "px"; 
		hat.style.left = (Math.cos(angle+90) * 200) + 200 + "px";
		requestAnimationFrame(animate);
	}
	requestAnimationFrame(animate);
}