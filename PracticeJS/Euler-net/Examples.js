/*jslint browser:true */

"use strict";

var ex1 = function (){
  var sum = 0;

  for (let i = 1; i < 1000; i++) {
    if (i%3===0 || i%5===0) {
      sum+=i;
    }
  }

  document.getElementById('answer_1').innerText = ReplaceNumberWithCommas(sum);
};

var ex2 = function(){
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
  document.getElementById('answer_2').innerText = ReplaceNumberWithCommas(total);
};

var ex3 = function (){
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

  document.getElementById('answer_3').innerText = ReplaceNumberWithCommas(prime);
};

function ReplaceNumberWithCommas(yourNumber) {
    //Seperates the components of the number
    var n= yourNumber.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
}
