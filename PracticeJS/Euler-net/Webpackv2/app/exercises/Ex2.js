export default function ex2() {
  let pre = 1;
  let cur = 2;
  let temp = 0;
  let total = 0;

  while (cur < 4000000) {
    if (cur % 2 === 0) {
      total += cur;
    }
    temp = cur;
    cur += pre;
    pre = temp;
  }

  return total;
}
