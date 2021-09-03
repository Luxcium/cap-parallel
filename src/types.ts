/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import type { MessagePort, Worker } from 'worker_threads';

/** Partial interface for `worker_threads` module */
export interface Worker_Threads<W> {
  isMainThread: boolean;
  parentPort: MessagePort | null;
  Worker: typeof Worker;
  workerData: W;
}
export type WorkerData<V> = { value: V; index: number; array: readonly V[] };
// export type WorkerMapper_<U, R> = (workerData: WorkerData<U>) => R;

// export type ThreadMapper<T, R> = (workerData: WorkerData<T>) => R;

// // export type WorkerMapper = <R>() => Mapper<TVal> &
// //   (<T>(value: T, index?: number, array?: readonly T[]) => Promise<R>);

// export type WorkerMapper = <T>() => <U>() => Mapper<T, Promise<U>>; // /* Mapper<TVal,R> & */
// // (value: T, index?: number, array?: readonly T[]) => Promise<U>;

// export type WT = <T>() => <U>() => Mapper<T, U>; //(
// //   value: T,
// //   index?: number,
// //   array?: readonly T[]
// // ) => Promise<U>;
export type PromiseMapper2<T, U> = (
  value: T,
  index?: number,
  array?: readonly T[]
) => Promise<U>;
export type MapperPromise<T, U> = Mapper<T, Promise<U>>;
export type Mapper<T, U> = (
  value: T,
  index?: number,
  array?: readonly T[]
) => U;

export type WT_D<T> = Worker_Threads<WorkerData<T>>;

export interface iParallelMappingOptions<T, U> {
  filename: string;
  workerThreads: WT_D<T>;
  list: T[];
  mappingFn: Mapper<T, U>;
  limit?: number;
}
export interface iParallelMapping {
  <T, U>(parallelMappingOptions: iParallelMappingOptions<T, U>): [
    () => Promise<U[]>,
    () => void
  ];
}

export type ParallelProcessMapperFactory = <T, R>(
  mappingFn: Mapper<T, R>
) => (
  list: T[],
  limit?: number | undefined
) => (
  filename: string
) => [() => Promise<PromiseSettledResult<R>[]>, () => void];
