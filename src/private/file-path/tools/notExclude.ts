import { IsExcluded, NotExcluded, WithExclude } from '../types/WithExclude';

export function notExcluded(item: WithExclude): item is NotExcluded {
  return !item.exclude;
}

export function isExcluded(item: WithExclude): item is IsExcluded {
  return item.exclude;
}
export function notNull<T>(item: T | null): item is T {
  return item !== null;
}

export function isNull<T>(item: T | null): item is null {
  return item === null;
}

export function notUndefined<T>(item: T | undefined): item is T {
  return item !== undefined;
}

export function isUndefined<T>(item: T | undefined): item is undefined {
  return item === undefined;
}

export function notNullOrUndef<T>(item: T | null | undefined): item is T {
  return notUndefined(item) && notNull(item);
}
