// Example 2: Sums of Fibonacci
export default function ex2() {
  let pre = 1;
  let prepre = 1;
  let total = 0;

  for (let cur = 2; cur < 4000000; cur += prepre) {
    if (cur % 2 === 0) {
      total += cur;
    }
    prepre = pre;
    pre = cur;
  }

  return total;
}
