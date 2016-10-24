// Get the functions
import ex1 from './exercises/Ex1';
import ex2 from './exercises/Ex2';
import ex3 from './exercises/Ex3';
import ex4 from './exercises/Ex4';
import ex5 from './exercises/Ex5';
import ex6 from './exercises/Ex6';
import prettify from './prettify';

// Get the data for the questions
import questionTemplate from './template';
import questions from './data';

// Load lodash.  Not necessary because of webpack plugin settings.
const _ = require('lodash');
// Load jquery.  Not necessary because of webpack plugin settings.
const $ = require('jquery');
// Global variable used to hold the exercises
const ex = {};

// Place functions in global variable
ex.ex1 = ex1;
ex.ex2 = ex2;
ex.ex3 = ex3;
ex.ex4 = ex4;
ex.ex5 = ex5;
ex.ex6 = ex6;

// Render the questions
const template = _.template(questionTemplate);

_.forEach(questions, (el, i) => {
  $('#main').append(template({ num: i + 1, title: el }));
});

// Attach the function to the button
const inputs = $('input');

_.forEach(inputs, (el) => {
  const num = parseInt(/[0-9]+/.exec(el.id), 10);

  $(el).click(() => {
    const ans = ex[`ex${num}`]($(`#answer_${num}`));
    $(`#answer_${num}`).html(prettify(ans));
  });
});

