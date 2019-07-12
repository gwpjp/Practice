export default function prettify(yourNumber) {
  // Seperates the components of the number
  const n = yourNumber.toString().split('.');
  // Comma-fies the first part
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Combines the two sections
  return n.join('.');
}
