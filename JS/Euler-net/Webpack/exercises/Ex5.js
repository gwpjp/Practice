//var $ = require ('jquery');
import prettify from '../prettify';

//Example 5: Smallest number divisible by 1,...,20.
export default function ex5(node) {
  let N = 20;
  let done = false;
  let cur = 2;
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

  $(node).html(prettify(cur));

}
