"use strict";

//Looping a Triangle
console.log("Looping a Triangle");
var text = "";
for (var i=0; i < 7; i++) {
  text = text + "#";
  console.log(text);
           }

//FizzBuzz
console.log("");
console.log("FizzBuzz");
var text = "";
for (var i=1; i < 100; i++) {
  if (i%3 == 0) {
    if (i%5 == 0){
      text += "FizzBuzz,";
    }
    else {
      text += "Fizz,";
    }
  }
  else if (i%5 == 0){
    text += "Buzz,";
  }
  else {
    text= text + i + ",";
  }
}
console.log(text);

//Chess Board
console.log("");
console.log("Chess Board");
var size = 8;
var text = "";
for (var i=0; i < size; i++) {
  for (var j=0; j < size; j++) {
    if ((i+j)%2 == 0) {
      text += " ";
    }
    else {
      text += "#";
    }
  }
  text += "\n";
}
console.log(text);
