/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//Regexp Golf
var re1 = /ca[rt]/;
var re2 = /pr?op/;
var re3 = /ferr(et|y|ari)/;
var re4 = /ious\b/;
var re5 = /\s[.,;:]/;
var re6 = /\w{7,}/;
var re7 = /\b[a-df-z]+\b/i;

//Quoting Style
var re = /(^|\W)'|'(\W|$)/g;
console.log("a 'fine' friend isn't here".replace(re,'$1"$2'));

//Numbers again
var number = /^(\+|-|)(\d+(\.\d*)?|\.\d+)([eE](\+|-|)\d+)?$/;

["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4",
 "1e+12"].forEach(function(s) {
  if (!number.test(s))
    console.log("Failed to match '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5",
 "."].forEach(function(s) {
  if (number.test(s))
    console.log("Incorrectly accepted '" + s + "'");
});