var ex={};

ex.ex1 = require('./exercises/Ex1');
ex.ex2 = require('./exercises/Ex2');
ex.ex3 = require('./exercises/Ex3');
ex.ex4 = require('./exercises/Ex4');
ex.ex5 = require('./exercises/Ex5');
ex.ex6 = require('./exercises/Ex6');



window.onload = function() {

	var inputs = document.getElementsByTagName('input');
	for (let el of inputs) {
		var num = parseInt(/[0-9]+/.exec(el.id));
		el.addEventListener('click',ex['ex'+num]);
	}

};