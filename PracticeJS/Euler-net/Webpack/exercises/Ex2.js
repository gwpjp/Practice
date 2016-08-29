
var prettify = require('../prettify');

function ex2(){
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
  document.getElementById('answer_2').innerText = prettify(total);
}

module.exports = ex2;

