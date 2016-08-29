
var prettify = require('../prettify');

function ex1(){
  var sum = 0;

  for (let i = 0; i < 1000; i++) {
    if (i%3===0 || i%5===0) {
      sum+=i;
    }
  }

  document.getElementById('answer_1').innerText = prettify(sum);
}

module.exports = ex1;