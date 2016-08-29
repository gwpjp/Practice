var prettify = require('../prettify');

//Example 5: Smallest number divisible by 1,...,20.
function ex5() {
  let N = 20;
  let done = false;
  let cur = 2;
  let mod = 0;
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
    document.getElementById('answer_5').innerText = prettify(cur);

}

module.exports = ex5;