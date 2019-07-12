// This checks whether a given userInput is prime
export default function primeCheck(userInput) {
  let bool = true;
  if (userInput % 2 === 0 || userInput % 3 === 0) {
    if (userInput > 3) {
      bool = false;
    }
  } else {
    // userInput is prime iff it is divisible by 6k-1 or 6k+1
    for (let j = 5; j <= Math.sqrt(userInput); j += 6) {
      if (userInput % j === 0 || userInput % (j + 2) === 0) {
        bool = false;
        if (!bool) {
          break;
        }
      }
    }
  }
  return bool;
}
