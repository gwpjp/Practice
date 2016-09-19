
// var $ = require ('jquery');
import prettify from '../prettify';

export default function ex1(node) {
  let sum = 0;

  for (let i = 0; i < 1000; i += 1) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }

  $(node).html(prettify(sum));
}

