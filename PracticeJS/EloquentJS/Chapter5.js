/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

var ancestry = JSON.parse(ANCESTRY_FILE);

// Flattening

var flatten = function(x) {
	var y;
	y = x.reduce(function(prev,cur) {
		return prev.concat(cur);
	});
	return y;
};

// Mother-child age difference

//Creates an array of person objects index by person's name
var byName = {};
ancestry.forEach(function(person) {
	byName[person.name] = person;
});

//Creates a function which finds the average of an array
var average = function(array) {
	var sum = 0;
	for (let i = 0; i < array.length; i++) {
		sum += array[i];
	}
	return sum/array.length;
};

//Creates a function which finds the age of the mother of a person object
var motherAge = function(p) {
	return p.born - byName[p.mother].born;
};

//Filters out those persons who have a mother
var haveMothers = ancestry.filter(function(person) {
	return person.mother != undefined && byName[person.mother] != undefined;
});

console.log("Average mother age: " + Math.round(10*average(haveMothers.map(motherAge)))/10 + " years");


//Historical Life Expectancy

//Takes an array and creates a new array where the original values are grouped according to some function
var groupBy = function(array,f) {
	let group = [];
	array.forEach(function(elt) {
		if (group[f(elt)] != undefined) {
			group[f(elt)].push(elt);
		}
		else {
			group[f(elt)] = [elt];
		}
	});
	return group;
};

//A function that computes the century in which the person died
var inCentury = function(p) {
	return Math.ceil(p.died/100);
};

//A function that computes the age the person lived to be
var age = function(p) {
	return p.died - p.born;
};

//A new array that groups the original set of objects by century
var centGroup = groupBy(ancestry, inCentury);

console.log("Historical Life Expectancy:");
centGroup.map(function(p) {return Math.round(10*average(p.map(age)))/10;}).forEach(function(elt,index) {
	console.log(index + "th Century: " + elt + " years");
});


// Every and then some

var every = function(array,f) {
	var bool = true;
	array.forEach(function(elt) {
		bool = bool && f(elt);
	});
	return bool;
}

var some = function(array,f) {
	var bool = array.length == 0;  //In case of empty array, return true
	array.forEach(function(elt) {
		bool = bool || f(elt);
	});
	return bool;
}


