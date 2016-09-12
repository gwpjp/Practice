//var $ = require ('jquery');
import prettify from '../prettify';

export default function ex2(node){
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
  $(node).html(prettify(total));
}


