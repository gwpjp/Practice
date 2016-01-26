/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//Sum of a range

var range = function (start,end,step) {
	step = step || 1;
	var pos = step/Math.abs(step); // Determine if we count down or up.
	var arr = [];
	for (let i=start; pos*i<=pos*end; i+= step) {
		arr.push(i);
	}
	return arr;
};

var sum = function (arr) {
	var count = 0;
	for (let i = 0; i < arr.length; i++){
		count+= arr[i];
	}
	return count;
};

//Reversing an array

var reverseArray = function (arr) {
	var x = [];
	for (let i = 0; i < arr.length; i++){
		x.unshift(arr[i]);
	}
	return x;
};

var reverseArrayInPlace = function (arr) {
	x = reverseArray(arr);
	arr = x;
};

//A list

var arrayToList = function (arr) {
	if (arr.length === 0) {
		return null
	} else {
		var list, temp;
		temp = arr.shift();
		list = arrayToList(arr)
		return {value: temp, rest: list};
	}
};

var listToArray = function (list) {
	var x;
	if (list.rest == null) {
		x = [];
	} else {
		x = listToArray(list.rest);
	}
	x.unshift(list.value);
	return x;	
};

var prepend = function (elt,list) {
	return {value: elt, rest: list};
};

var nth = function (list, n) {
	if (list == null) {
		return undefined;
	} else if (n == 1) {
		return list.value;
	} else {
		return nth(list.rest,n-1);
	}
};
