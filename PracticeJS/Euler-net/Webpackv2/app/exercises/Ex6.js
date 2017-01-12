// Example 6: Sum and squares
export default function ex6() {
  const N = 100;
  const sumsq = ((N / 2) * (N + 1)) ** 2;
  let sqsum = 0;
  for (let i = 1; i <= 100; i += 1) {
    sqsum += i ** 2;
  }

  return sumsq - sqsum;
}
