// Example 5: Smallest number divisible by 1,...,20.
export default function ex5() {
  const N = 20;
  let cur = 2;

  for (let temp = 2; temp < N;) {
    if (cur % temp === 0) {
      temp += 1;
    } else {
      temp = 2;
      cur += 1;
    }
  }
  return cur;
}
