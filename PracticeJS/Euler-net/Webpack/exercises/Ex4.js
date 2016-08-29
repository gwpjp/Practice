
var prettify = require('../prettify');

//Example 4: Largest Palindrome Project
function ex4() {
  let pal = 0;
  let temp = 0;
  let temp2 = 0;

  for (let i = 1; i < 1000; i++) {
    for (let j = 1; j < 1000; j++) {
      temp = i * j;
      temp2 = temp.toString().split('').reverse().join('');
      if (temp == temp2 && temp > pal) {
        pal = temp;
      }
    }
  }

  document.getElementById('answer_4').innerText = prettify(pal);
};

module.exports = ex4;