// var $ = require ('jquery');
import prettify from '../prettify';

// Example 6: Sum and squares
export default function ex6(node) {
  const N = 100;
  const sumsq = Math.pow((N / 2) * (N + 1), 2);
  let sqsum = 0;
  for (let i = 1; i <= 100; i += 1) {
    sqsum += Math.pow(i, 2);
  }

  $(node).html(prettify(sumsq - sqsum));
}
