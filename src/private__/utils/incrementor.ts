export const increment = (value: number, step = 1) => (value += step);
export const decrement = (value: number, step = 1) => (value -= step);

export function incrementor(value: number, step = 1, _k: 1 | -1 = 1) {
  const val = { v: value, s: step || _k };
  return (step_ = val.s) => {
    val.s = step_;
    return {
      val,
      increment() {
        this.val.v += _k * val.s;
        return this.val.v;
      },
    }.increment();
  };
}

export function decrementor(value: number, step = 1, _k: 1 | -1 = 1) {
  return incrementor(value, step * _k * -1, (_k * -1) as 1 | -1);
}

export function unamed(a: number, b: number) {
  const k = b - a >= 0 ? 1 : -1;
  return incrementor(a, k);
}

const tester = unamed(10, 100);
console.log(tester());
console.log(tester());
console.log(tester());
console.log(tester());
