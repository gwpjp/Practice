// Example 3: Largest prime
import primeCheck from './primeCheck';

export default function ex3() {
  const n = Math.sqrt(600851475143); // This is the highest you have to check.
  let prime = 0;

  for (let i = 1; i < n; i += 2) {
    // If it is prime, then check if it divides our number.
    if (primeCheck(i) && 600851475143 % i === 0) {
      prime = i;
    }
  }

  return prime;
}
