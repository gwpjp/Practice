/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//Minimum
var min = function (x,y) {
  if (x < y) {
    return x;
  }
  else {
    return y;
  }
};

// Recursion
var isEven = function(x){
  if (x < 0) {
    return false;
  }else if (x===0 || isEven(x-2)){
    return true;
  }
  else {
    return false;
  }
};

// Bean Counting
var countChar = function (x, chr) {
  var count = 0;
  for (let i = 0; i < x.length; i++){
    if (x.charAt(i) === chr) {
      count++;
    }
  }
  return count;
};

var countBs = function(x) {
  return countChar(x,"B");
};
