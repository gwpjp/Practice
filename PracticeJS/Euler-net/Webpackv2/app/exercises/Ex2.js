// var $ = require ('jquery');
import prettify from '../prettify';

export default function ex2(node) {
  let pre = 1;
  let cur = 2;
  let temp = 0;
  let total = 0;

  while (cur < 4000000) {
    if (cur % 2 === 0) {
      total += cur;
    }
    temp = cur;
    cur += pre;
    pre = temp;
  }
  $(node).html(prettify(total));
}
