/*jslint browser:true */

"use strict";

var ex1 = function (){
  var sum = 0;

  for (let i = 0; i < 1000; i++) {
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

//Example 4: Largest Palindrome Project
let ex4 = function () {
  let pal = 0;
  let temp = 0;
  let temp2 = 0;

  for (let i = 1; i < 1000; i++) {
    for (let j = 1; j < 1000; j++) {
      temp = i * j;
      temp2 = temp.toString().split('').reverse().join('');
      if (temp == temp2 && temp > pal) {
        pal = temp;
      }
    }
  }

  document.getElementById('answer_4').innerText = ReplaceNumberWithCommas(pal);
};

//Example 5: Smallest number divisible by 1,...,20.
let ex5 = function() {
  let N = 20;
  let done = false;
  let cur = 2;
  let mod = 0;
  let temp = 2;

  while (!done) {
    if (temp > N) {
      done = true;
    } else {
      if (cur % temp == 0) {
        temp++;
      } else {
        temp = 2;
        cur++;
      }
    }
  }
    document.getElementById('answer_5').innerText = ReplaceNumberWithCommas(cur);

};

//Example 6: Sum and squares
let ex6 = function() {
  let N = 100;
  let sumsq = Math.pow(N*(N+1)/2,2);
  let sqsum = 0;
  for (let i = 1; i <= 100; i++) {
    sqsum += Math.pow(i,2);
  }

  document.getElementById('answer_6').innerText = ReplaceNumberWithCommas(sumsq - sqsum);

}

function ReplaceNumberWithCommas(yourNumber) {
    //Seperates the components of the number
    var n= yourNumber.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
}
