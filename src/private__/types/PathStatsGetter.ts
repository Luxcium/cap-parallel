import { FormatInputPathObject, ParsedPath, PlatformPath } from 'path';

export type RedisJson_PathStatsTuple<T> = [string, () => Promise<T>];

type PathStatsTuple<T> = RedisJson_PathStatsTuple<T>;

export type RedisJson_InfoGetterFunct<T> = <
  U extends string | MyStats | MyPInfos
>(
  p: U
) => PathStatsTuple<T>;

export type RedisJson_PathInfoGetterFunct<T> = (
  pInfos: MyPInfos
) => PathStatsTuple<T>;

export type RedisJson_StatsInfoGetterFunct<T> = (
  stats: MyStats
) => PathStatsTuple<T>;

export type RedisJson_DirentInfoGetterFunct<T> = (
  path_str: string
) => PathStatsTuple<T>;

export type MyPInfos = {
  dirname: () => string;
  extname: () => string;
  isAbsolute: () => boolean;
  normalized: () => string;
  parsed: () => ParsedPath;
  toNamespacedPath: () => string;
  posix: () => PlatformPath;
  sep: () => string;
  win32: () => PlatformPath;
  delimiter: () => string;
  pBasename: (p: string, ext?: string | undefined) => string;
  pFormat: (pP: FormatInputPathObject) => string;
  pJoin: (...paths: string[]) => string;
  pRelative: (from: string, to: string) => string;
  pResolve: (...pathSegments: string[]) => string;
};

export type MyStats = {
  dev: () => Promise<number>;
  ino: () => Promise<number>;
  mode: () => Promise<number>;
  nlink: () => Promise<number>;
  uid: () => Promise<number>;
  gid: () => Promise<number>;
  rdev: () => Promise<number>;
  size: () => Promise<number>;
  blksize: () => Promise<number>;
  blocks: () => Promise<number>;
  atimeMs: () => Promise<number>;
  mtimeMs: () => Promise<number>;
  ctimeMs: () => Promise<number>;
  birthtimeMs: () => Promise<number>;
  atime: () => Promise<Date>;
  mtime: () => Promise<Date>;
  ctime: () => Promise<Date>;
  birthtime: () => Promise<Date>;
};
