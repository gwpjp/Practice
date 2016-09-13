//Load lodash functions.  Not actually necessary because of webpack plugin settings.
var _ = require('lodash');
//Load jquery.  Not actually necessary because of webpack plugin settings.
var $ = require('jquery');

//Get the data for the questions
import questions from './data';
import questionTemplate from './template';

//Get the functions
import ex1 from './exercises/Ex1';
import ex2 from './exercises/Ex2';
import ex3 from './exercises/Ex3';
import ex4 from './exercises/Ex4';
import ex5 from './exercises/Ex5';
import ex6 from './exercises/Ex6';

var ex={};
ex.ex1 = ex1;
ex.ex2 = ex2;
ex.ex3 = ex3;
ex.ex4 = ex4;
ex.ex5 = ex5;
ex.ex6 = ex6;

//Render the questions
var template = _.template(questionTemplate);
_.forEach(questions,function(el,i){
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

