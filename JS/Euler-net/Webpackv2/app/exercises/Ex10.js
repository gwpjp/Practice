// Summation of Primes
import primeCheck from './primeCheck';

export default function ex10() {
  let sum = 0;
  for (let i = 2; i < 2000000; i += 1) {
    if (primeCheck(i)) {
      sum += i;
    }
  }

  return sum;
}
