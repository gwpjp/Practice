// Example 7: 10,001st Prime Number
import primeCheck from './primeCheck';

export default function ex7() {
  let n = 0;
  let i = 1;
  while (n < 10001 && i < 1000000) {
    i += 1;
    if (primeCheck(i)) {
      n += 1;
    }
  }
  return i;
}
