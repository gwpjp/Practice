// Example 1: Multiples of 3 and 5
export default function ex1() {
  let sum = 0;

  for (let i = 0; i < 1000; i += 1) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }

  return sum;
}

