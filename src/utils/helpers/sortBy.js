export default (fn, biggestOnTop) => {
  const cmp = (a, b) => -(a < b) || +(a > b);
  return (a, b) =>
    biggestOnTop === true ? cmp(fn(b), fn(a)) : cmp(fn(a), fn(b));
};
