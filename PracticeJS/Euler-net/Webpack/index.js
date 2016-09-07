//Load css
require('./style.css');

//Load lodash functions
var _ = {};
_.forEach = require('lodash/forEach');
_.template = require('lodash/template');
//Load jquery.  Not actually necessary because of webpack plugin
var $ = require('jquery');

//Get the data for the questions
var questions = require('./data');

//Get the functions
var ex={};
_.forEach(questions, function(el,i){
	ex['ex'+(i+1)] = require('./exercises/Ex'+(i+1));
});

//Render the questions
var template = _.template(require('./template'));
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

