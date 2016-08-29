var prettify = require('../prettify');

//Example 6: Sum and squares
function ex6() {
  let N = 100;
  let sumsq = Math.pow(N*(N+1)/2,2);
  let sqsum = 0;
  for (let i = 1; i <= 100; i++) {
    sqsum += Math.pow(i,2);
  }

  document.getElementById('answer_6').innerText = prettify(sumsq - sqsum);

}

module.exports = ex6;