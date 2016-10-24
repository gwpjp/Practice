export default function ex3() {
  const n = Math.sqrt(600851475143); // This is the highest you have to check.
  let primeCheck = 0;
  let prime = 0;
  let m = 0;

  for (let i = 1; i < n; i += 2) {
    primeCheck = 1;
    // First, check to see if 'i' is prime.
    m = Math.sqrt(i);
    if (i % 3 === 0) { // i is definitely not even
      primeCheck = 3;
    } else {
      // i is prime iff it is divisible by 6k-1 or 6k+1
      for (let j = 5; j < m; j += 6) {
        if (i % j === 0 || i % (j + 2) === 0) {
          primeCheck = j;
          if (primeCheck > 1) {
            break;
          }
        }
      }
    }
    /* If it is prime, then its largest divisor is 1,
    so use this to check if it divides our number.*/
    if (primeCheck === 1 && 600851475143 % i === 0) {
      prime = i;
    }
  }

  return prime;
}

