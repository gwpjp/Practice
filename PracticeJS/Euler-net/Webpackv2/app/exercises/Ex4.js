// var $ = require ('jquery');
import prettify from '../prettify';

// Example 4: Largest Palindrome Project
export default function ex4(node) {
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

  $(node).html(prettify(pal));
}
