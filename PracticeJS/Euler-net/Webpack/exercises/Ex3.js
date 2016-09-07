//var $ = require ('jquery');

var prettify = require('../prettify');

function ex3(node){
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

  $(node).html(prettify(prime));
};

module.exports = ex3;