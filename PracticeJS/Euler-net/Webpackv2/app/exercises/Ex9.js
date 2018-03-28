// Special Pythagorean Triplet
export default function ex8() {
  let prod = 1;
  for (let a = 1; a < 1000; a += 1) {
    for (let b = a; b < 1000; b += 1) {
      const sq = (a ** 2) + (b ** 2);
      const c = parseInt(Math.sqrt(sq), 10);
      if ((a + b + c) === 1000 && sq === c ** 2) {
        prod = a * b * c;
      }
    }
  }
  return prod;
}
