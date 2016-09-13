//var $ = require ('jquery');
import prettify from '../prettify';

//Example 6: Sum and squares
export default function ex6(node) {
  let N = 100;
  let sumsq = Math.pow(N*(N+1)/2,2);
  let sqsum = 0;
  for (let i = 1; i <= 100; i++) {
    sqsum += Math.pow(i,2);
  }

  $(node).html(prettify(sumsq - sqsum));

}
