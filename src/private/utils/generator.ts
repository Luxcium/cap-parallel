import { zalgo } from './restrainingZalgo';

zalgo;

export function fromTo(from: number, to: number) {
  // if from is larger decrement
  // if from is smaller increment
  // if from is equal behaviour is unspecified
  let unspecified = false;
  if (from == to) {
    unspecified = true;
    throw new Error('behaviour is unspecified');
  }
  if (from < 0) {
    unspecified = true;
    throw new Error('behaviour is unspecified');
  }
  if (to < 0) {
    unspecified = true;
    throw new Error('behaviour is unspecified');
  }

  if (from > to) {
  }

  return [from, to, unspecified];
}

// export const increment = (value: number, step = 1) => (value += step);
// export const decrement = (value: number, step = 1) => (value -= step);

// export const incrementor = (value: number, step = 1) => {
//   return increment(value, step);
// };
// export const decrementor = (value = 0) => {
//   return;
// };

// export function unamedYet() {
//   return false;
// }
// export const genPhotoPageUrls =
//   pageUrlFn =>
//   (delay = 1) =>
//   (b, a = 1) => ({
//     from: a,
//     to: b,
//     async *[Symbol.asyncIterator]() {
//       // called once, in the beginning of for..of,

//       for (let value = this.from; value <= this.to; value++) {
//         // make a pause between values, wait for something
//         zalgo(delay);
//         yield pageUrlFn(value);
//       }
//     },
//   });

export function fromTo_(from: number, to: number): [1 | -1, number, number] {
  if (from - to < 0) return [-1, from, to];

  return [1, from, to];
}
export const [k, f, t] = fromTo_(10, 100);
