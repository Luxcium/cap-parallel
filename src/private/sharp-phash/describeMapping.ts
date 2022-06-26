import { Bg } from '../file-path/types';
import { isArray } from '../utils';

export function describeMapping<T>(fn: <R>(val: T) => R) {
  return (mapable: T[] | Bg<T>) => {
    if (isArray(mapable)) {
      return mapable.map(fn);
    }
    return mapable.map(fn);
  };
}
