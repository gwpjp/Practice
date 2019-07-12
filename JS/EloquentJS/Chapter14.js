/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//Censored Keyboard

function buildCensor () {
	var text = document.createElement("input");
	text.type = "text";
	document.body.appendChild(text);
	text.addEventListener("keypress", function (event) {
		//keyCodes: q=113, Q=81, w=119, W=87, x=120, X=88 
		var keyCodes = [113,81,119,87,120,88];
		if (keyCodes.includes(event.keyCode)) {
			event.preventDefault();
		}
	});
}

//Mouse trail

function mouseTrail () {
	var html = `
		
		<img id="cat" src="cat.png" style="position: absolute">
		
	`;
	document.body.innerHTML = html;
	var imge = document.getElementById("cat");

	var follow = false;
	imge.addEventListener("click", function () {
		follow = !follow;
	});
	addEventListener("mousemove", imgFollow);

	function imgFollow(event) {
		if (follow) {
			imge.style.top = event.clientY + "px"; 
			imge.style.left = event.clientX + "px"; 
		}
	}
	
}