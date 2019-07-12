export default function timeElapsed(f) {
  const start = new Date().getTime();
  f();
  const end = new Date().getTime();
  console.log(end - start);
}
