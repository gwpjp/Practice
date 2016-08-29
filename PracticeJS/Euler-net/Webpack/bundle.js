/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ex={};

	ex.ex1 = __webpack_require__(1);
	ex.ex2 = __webpack_require__(3);
	ex.ex3 = __webpack_require__(4);


	window.onload = function() {

		var inputs = document.getElementsByTagName('input');
		for (let el of inputs) {
			var num = parseInt(/[0-9]+/.exec(el.id));
			el.addEventListener('click',ex['ex'+num]);
		}
		

	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var prettify = __webpack_require__(2);

	function ex1(){
	  var sum = 0;

	  for (let i = 0; i < 1000; i++) {
	    if (i%3===0 || i%5===0) {
	      sum+=i;
	    }
	  }

	  document.getElementById('answer_1').innerText = prettify(sum);
	}

	module.exports = ex1;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function prettify(yourNumber) {
	    //Seperates the components of the number
	    var n= yourNumber.toString().split(".");
	    //Comma-fies the first part
	    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    //Combines the two sections
	    return n.join(".");
	}

	module.exports = prettify;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	var prettify = __webpack_require__(2);

	function ex2(){
	  var pre = 1;
	  var cur = 2;
	  var temp = 0;
	  var total = 0;

	  while(cur < 4000000){
	    if(cur%2 === 0) {
	      total+=cur;
	    }
	    temp = cur;
	    cur+=pre;
	    pre = temp;
	  }
	  document.getElementById('answer_2').innerText = prettify(total);
	}

	module.exports = ex2;



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	var prettify = __webpack_require__(2);

	function ex3(){
	  var n = Math.sqrt(600851475143); //This is the highest you have to check.
	  var primeCheck = 0;
	  var prime = 0;
	  var m = 0;

	  for (let i = 1; i < n; i++) {
	    //First, check to see if 'i' is prime.
	    m = Math.sqrt(n);
	    for (let j = 1; j < m; j++){
	      if (i%j === 0) {
	        primeCheck = j;
	      }
	    }
	    /*If it is prime, then its largest divisor is 1,
	    so use this to check if it divides our number.*/
	    if (primeCheck === 1 && 600851475143%i === 0){
	      prime = i;
	    }
	  }

	  document.getElementById('answer_3').innerText = prettify(prime);
	};

	module.exports = ex3;

/***/ }
/******/ ]);