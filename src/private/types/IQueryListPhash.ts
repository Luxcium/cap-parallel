export interface IQueryListPhash {
  list: [path: S, id: N, radius: S][];
}

export type P<T> = Promise<T>;
export type S = string;
export type N = number;
