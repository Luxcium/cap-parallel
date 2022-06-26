import { BoxedGenerator } from '@luxcium/boxed-list';
import { getPathWithStats } from '../file-path';
import { newGetPathWithStats } from '../file-path/getPathWithStats';
import type { Bg, PathAndStats, PathWithStats } from '../file-path/types';
import type { FileType } from './types';

export function listFiles(folder: string, withStats?: false): Bg<Promise<PathWithStats>>;
export function listFiles(folder: string, withStats: true): Bg<Promise<PathAndStats>>;
export function listFiles(folder: string, withStats?: boolean): Bg<Promise<PathWithStats>>;
export function listFiles(
  folder: string,
  withStats: boolean = false
): Bg<Promise<PathAndStats> | Promise<PathWithStats>> {
  if (withStats) return BoxedGenerator.of(...getPathWithStats(folder, true));
  return BoxedGenerator.of(...getPathWithStats(folder, false));
}

export function listFilesFromArray<T extends boolean = false>(list: FileType<true>[]): Bg<Promise<PathAndStats>>;
export function listFilesFromArray<T extends boolean>(list: FileType<T>[]) {
  const bgList = list.map(item => listFiles(item.folder, item.withStats));
  return BoxedGenerator.from(...bgList);
}

export function newListFiles(folder: string): Bg<PathWithStats> {
  return BoxedGenerator.of(...newGetPathWithStats(folder)).map(pat => pat);
}
