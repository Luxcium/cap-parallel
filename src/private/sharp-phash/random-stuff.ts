import type { Bg } from '../file-path/types';

export const count = { index1: 1 };


export function composer<T, A, R>(fn1: (val: A) => R, fn2: (val: T) => A) {
  return (x: T) => fn1(fn2(x));
}
export function piper<T, A, R>(fn1: (val: T) => A, fn2: (val: A) => R) {
  return (x: T) => fn2(fn1(x));
}

export const le2n: (x: string) => number = composer(
  (n: number) => n * 2,
  (t: string) => t.length
);
export const le4n: (x: string) => number = composer((n: number) => n * 2, le2n);

export const len2: (x: string) => number = piper(
  (t: string) => t.length,
  (n: number) => n * 2
);
export const len4: (x: string) => number = piper(len2, (n: number) => n * 2);

export function listComposer<T, A, R>(fn1: (val: A) => R, fn2: (val: T) => A) {
  return (x: T[]) => x.map(fn2).map(fn1);
}
export function listPiper<T, A, R>(fn1: (val: T) => A, fn2: (val: A) => R) {
  return (x: T[]) => x.map(fn1).map(fn2);
}

export function bgPiper<T, A, R>(fn1: (val: T) => A, fn2: (val: A) => R) {
  return (x: Bg<T>) => x.map(fn1).map(fn2);
}
export function bgComposer<T, A, R>(fn1: (val: A) => R, fn2: (val: T) => A) {
  return (x: Bg<T>) => x.map(fn2).map(fn1);
}
