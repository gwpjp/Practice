/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = prettify;
function prettify(yourNumber) {
  // Seperates the components of the number
  const n = yourNumber.toString().split('.');
  // Comma-fies the first part
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Combines the two sections
  return n.join('.');
}



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const questions = ['Find the sum of all the multiples of 3 or 5 below 1,000.',
'Find the sum of the even Fibonacci numbers less than 4,000,000.',
'Find the largest prime factor of 600,851,475,143.',
'Find the largest palindrome that is the multiple of two 3-digit numbers.',
'Smallest number divisible by 1,...,20.',
'Difference between the sum of squares and the square of the sum of the numbers 1,...,100',
];

/* harmony default export */ exports["a"] = questions;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = ex1;

// var $ = require ('jquery');


function ex1(node) {
  let sum = 0;

  for (let i = 0; i < 1000; i += 1) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }

  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__["a" /* default */])(sum));
}



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = ex2;
// var $ = require ('jquery');


function ex2(node) {
  let pre = 1;
  let cur = 2;
  let temp = 0;
  let total = 0;

  while (cur < 4000000) {
    if (cur % 2 === 0) {
      total += cur;
    }
    temp = cur;
    cur += pre;
    pre = temp;
  }
  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__["a" /* default */])(total));
}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = ex3;
// var $ = require ('jquery');


function ex3(node) {
  const n = Math.sqrt(600851475143); // This is the highest you have to check.
  let primeCheck = 0;
  let prime = 0;
  let m = 0;

  for (let i = 1; i < n; i += 2) {
    primeCheck = 1;
    // First, check to see if 'i' is prime.
    m = Math.sqrt(i);
    if (i % 3 === 0) { // i is definitely not even
      primeCheck = 3;
    } else {
      // i is prime iff it is divisible by 6k-1 or 6k+1
      for (let j = 5; j < m; j += 6) {
        if (i % j === 0 || i % (j + 2) === 0) {
          primeCheck = j;
          if (primeCheck > 1) {
            break;
          }
        }
      }
    }
    /* If it is prime, then its largest divisor is 1,
    so use this to check if it divides our number.*/
    if (primeCheck === 1 && 600851475143 % i === 0) {
      prime = i;
    }
  }

  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__["a" /* default */])(prime));
}



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = ex4;
// var $ = require ('jquery');


// Example 4: Largest Palindrome Project
function ex4(node) {
  let pal = 0;
  let temp = 0;
  let temp2 = 0;

  for (let i = 1; i < 1000; i += 1) {
    for (let j = 1; j < 1000; j += 1) {
      temp = i * j;
      temp2 = temp.toString().split('').reverse().join('');
      if (temp.toString() === temp2 && temp > pal) {
        pal = temp;
      }
    }
  }

  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__["a" /* default */])(pal));
}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = ex5;
// var $ = require ('jquery');


// Example 5: Smallest number divisible by 1,...,20.
function ex5(node) {
  const N = 20;
  let done = false;
  let cur = 2;
  let temp = 2;

  while (!done) {
    if (temp > N) {
      done = true;
    } else if (cur % temp === 0) {
      temp += 1;
    } else {
      temp = 2;
      cur += 1;
    }
  }
  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__["a" /* default */])(cur));
}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = ex6;
// var $ = require ('jquery');


// Example 6: Sum and squares
function ex6(node) {
  const N = 100;
  const sumsq = Math.pow((N / 2) * (N + 1), 2);
  let sqsum = 0;
  for (let i = 1; i <= 100; i += 1) {
    sqsum += Math.pow(i, 2);
  }

  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__["a" /* default */])(sumsq - sqsum));
}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const questionTemplate = '<p class = "example"><strong>Example #<%= num %></strong>: <%= title %> </p>' +
    '<p>Answer: <span id="answer_<%= num %>"></span></p>' +
    '<input id="b-<%= num %>" type="button" value="Answer the question." />';

/* harmony default export */ exports["a"] = questionTemplate;


/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = _;

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = jQuery;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exercises_Ex1__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__exercises_Ex2__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exercises_Ex3__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__exercises_Ex4__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__exercises_Ex5__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exercises_Ex6__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__template__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data__ = __webpack_require__(1);
// Get the functions







// Get the data for the questions



// Load lodash.  Not necessary because of webpack plugin settings.
const _ = __webpack_require__(9);
// Load jquery.  Not necessary because of webpack plugin settings.
const $ = __webpack_require__(10);
// Global variable used to hold the exercises
const ex = {};

// Place functions in global variable
ex.ex1 = __WEBPACK_IMPORTED_MODULE_0__exercises_Ex1__["a" /* default */];
ex.ex2 = __WEBPACK_IMPORTED_MODULE_1__exercises_Ex2__["a" /* default */];
ex.ex3 = __WEBPACK_IMPORTED_MODULE_2__exercises_Ex3__["a" /* default */];
ex.ex4 = __WEBPACK_IMPORTED_MODULE_3__exercises_Ex4__["a" /* default */];
ex.ex5 = __WEBPACK_IMPORTED_MODULE_4__exercises_Ex5__["a" /* default */];
ex.ex6 = __WEBPACK_IMPORTED_MODULE_5__exercises_Ex6__["a" /* default */];

// Render the questions
const template = _.template(__WEBPACK_IMPORTED_MODULE_6__template__["a" /* default */]);

_.forEach(__WEBPACK_IMPORTED_MODULE_7__data__["a" /* default */], (el, i) => {
  $('#main').append(template({ num: i + 1, title: el }));
});

// Attach the function to the button
const inputs = $('input');

_.forEach(inputs, (el) => {
  const num = parseInt(/[0-9]+/.exec(el.id), 10);

  $(el).click(() => {
    ex[`ex${num}`]($(`#answer_${num}`));
  });
});



/***/ }
/******/ ]);
//# sourceMappingURL=app.559351b3775cc5d0b77c.js.map