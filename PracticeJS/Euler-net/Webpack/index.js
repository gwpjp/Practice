//Load css
require('./style.css');

//Load lodash functions
var _ = {};
_.forEach = require('lodash/forEach');
_.template = require('lodash/template');
//Load jquery.  Not actually necessary because of webpack plugin
var $ = require('jquery');

//Get the functions
var ex={};
ex.ex1 = require('./exercises/Ex1');
ex.ex2 = require('./exercises/Ex2');
ex.ex3 = require('./exercises/Ex3');
ex.ex4 = require('./exercises/Ex4');
ex.ex5 = require('./exercises/Ex5');
ex.ex6 = require('./exercises/Ex6');

//Render the questions
var template = _.template(require('./template'));
var questions = require('./data');
_.forEach(questions, function(el,i){
	$('#main').append(template({'num': i+1, 'title': el}));
});

//Attach the function to the button
var inputs = $('input');
_.forEach(inputs, function(el) {
	var num = parseInt(/[0-9]+/.exec(el.id));
	$(el).click(function() {
		ex['ex'+num]($('#answer_'+num));
	});
});

