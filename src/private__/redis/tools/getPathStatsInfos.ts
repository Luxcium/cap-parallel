import type { ParsedPath, PlatformPath } from 'path';

import { getPathInfos, getStats } from '../../file-path/tools';
import { dirListWithFileTypeAsync } from '../../file-path/tools/dirListWithFileType/dirListWithFileTypeAsync';
import { DirentWithFileType } from '../../file-path/types';
import { dirListWithFileType } from '../../file-path/utils/dirListWithFileType';
import {
  MyPInfos,
  MyStats,
  RedisJson_DirentInfoGetterFunct,
  RedisJson_PathInfoGetterFunct,
  RedisJson_PathStatsTuple,
  RedisJson_StatsInfoGetterFunct,
} from '../../types';
import { immediateZalgo } from '../../utils';

type PathStatsTuple<T> = RedisJson_PathStatsTuple<T>;

const get_extname: RedisJson_PathInfoGetterFunct<string> = (
  pInfos: MyPInfos
): PathStatsTuple<string> => {
  return [
    '.extname',
    async (): Promise<string> => immediateZalgo(pInfos.extname()),
  ];
};

const get_normalized: RedisJson_PathInfoGetterFunct<string> = (
  pInfos: MyPInfos
): PathStatsTuple<string> => {
  return [
    '.normalized',
    async (): Promise<string> => immediateZalgo(pInfos.normalized()),
  ];
};

const get_toNamespacedPath: RedisJson_PathInfoGetterFunct<string> = (
  pInfos: MyPInfos
): PathStatsTuple<string> => {
  return [
    '.toNamespacedPath',
    async (): Promise<string> => immediateZalgo(pInfos.toNamespacedPath()),
  ];
};

const get_sep: RedisJson_PathInfoGetterFunct<string> = (
  pInfos: MyPInfos
): PathStatsTuple<string> => {
  return ['.sep.', async (): Promise<string> => immediateZalgo(pInfos.sep())];
};

const get_delimiter: RedisJson_PathInfoGetterFunct<string> = (
  pInfos: MyPInfos
): PathStatsTuple<string> => {
  return [
    '.delimiter.',
    async (): Promise<string> => immediateZalgo(pInfos.delimiter()),
  ];
};

const get_dev: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.dev', async (): Promise<number> => stats.dev()];
};

const get_ino: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.ino', async (): Promise<number> => stats.ino()];
};

const get_mode: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.mode', async (): Promise<number> => stats.mode()];
};

const get_nlink: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.nlink', async (): Promise<number> => stats.nlink()];
};

const get_uid: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.uid', async (): Promise<number> => stats.uid()];
};

const get_gid: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.gid', async (): Promise<number> => stats.gid()];
};

const get_rdev: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.rdev', async (): Promise<number> => stats.rdev()];
};

const get_size: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.size', async (): Promise<number> => stats.size()];
};

const get_blksize: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.blksize', async (): Promise<number> => stats.blksize()];
};

const get_blocks: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.blocks', async (): Promise<number> => stats.blocks()];
};

const get_atimeMs: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.atimeMs', async (): Promise<number> => stats.atimeMs()];
};

const get_mtimeMs: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.mtimeMs', async (): Promise<number> => stats.mtimeMs()];
};

const get_ctimeMs: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.ctimeMs', async (): Promise<number> => stats.ctimeMs()];
};

const get_birthtimeMs: RedisJson_StatsInfoGetterFunct<number> = (
  stats: MyStats
): PathStatsTuple<number> => {
  return ['.birthtimeMs', async (): Promise<number> => stats.birthtimeMs()];
};

const get_mtime: RedisJson_StatsInfoGetterFunct<Date> = (
  stats: MyStats
): PathStatsTuple<Date> => {
  return ['.mtime', async (): Promise<Date> => stats.mtime()];
};

const get_ctime: RedisJson_StatsInfoGetterFunct<Date> = (
  stats: MyStats
): PathStatsTuple<Date> => {
  return ['.ctime', async (): Promise<Date> => stats.ctime()];
};

const get_atime: RedisJson_StatsInfoGetterFunct<Date> = (
  stats: MyStats
): PathStatsTuple<Date> => {
  return ['.atime', async (): Promise<Date> => stats.atime()];
};

const get_birthtime: RedisJson_StatsInfoGetterFunct<Date> = (
  stats: MyStats
): PathStatsTuple<Date> => {
  return ['.birthtime', async (): Promise<Date> => stats.birthtime()];
};

const get_isAbsolute: RedisJson_PathInfoGetterFunct<boolean> = (
  pInfos: MyPInfos
): PathStatsTuple<boolean> => {
  return [
    '.isAbsolute',
    async (): Promise<boolean> => immediateZalgo(pInfos.isAbsolute()),
  ];
};

const get_parsed = (pInfos: MyPInfos): PathStatsTuple<ParsedPath> => {
  return [
    '.parsed',
    async (): Promise<ParsedPath> => immediateZalgo(pInfos.parsed()),
  ];
};

const get_posix: RedisJson_PathInfoGetterFunct<PlatformPath> = (
  pInfos: MyPInfos
): PathStatsTuple<PlatformPath> => {
  return [
    '.posix.',
    async (): Promise<PlatformPath> => immediateZalgo(pInfos.posix()),
  ];
};

const get_win32: RedisJson_PathInfoGetterFunct<PlatformPath> = (
  pInfos: MyPInfos
): PathStatsTuple<PlatformPath> => {
  return [
    '.win32.',
    async (): Promise<PlatformPath> => immediateZalgo(pInfos.win32()),
  ];
};

const get_dirname: RedisJson_PathInfoGetterFunct<string> = (
  pInfos: MyPInfos
): PathStatsTuple<string> => {
  return [
    '.dirname',
    async (): Promise<string> => immediateZalgo(pInfos.dirname()),
  ];
};

const get_dirList: RedisJson_DirentInfoGetterFunct<DirentWithFileType[]> = (
  path_str: string
): PathStatsTuple<DirentWithFileType[]> => {
  return [
    '.dirList',
    async (): Promise<DirentWithFileType[]> => dirListWithFileType(path_str),
  ];
};

// function get_dirname(pInfos: MyPathInfos): [string , (() => Promise<string>)] (string | (() => Promise<string>))

const getPathStatsInfos = {
  get_extname,
  get_normalized,
  get_toNamespacedPath,
  get_sep,
  get_delimiter,
  get_dev,
  get_ino,
  get_mode,
  get_nlink,
  get_uid,
  get_gid,
  get_rdev,
  get_size,
  get_blksize,
  get_blocks,
  get_atimeMs,
  get_mtimeMs,
  get_ctimeMs,
  get_birthtimeMs,
  get_mtime,
  get_ctime,
  get_atime,
  get_birthtime,
  get_isAbsolute,
  get_parsed,
  get_posix,
  get_win32,
  get_dirname,
  get_dirList,
  dirListWithFileTypeAsync,
  getPathInfos,
  getStats,
};
export {
  get_atime,
  get_atimeMs,
  get_birthtime,
  get_birthtimeMs,
  get_blksize,
  get_blocks,
  get_ctime,
  get_ctimeMs,
  get_delimiter,
  get_dev,
  get_dirList,
  get_dirname,
  get_extname,
  get_gid,
  get_ino,
  get_isAbsolute,
  get_mode,
  get_mtime,
  get_mtimeMs,
  get_nlink,
  get_normalized,
  get_parsed,
  get_posix,
  get_rdev,
  get_sep,
  get_size,
  get_toNamespacedPath,
  get_uid,
  get_win32,
  getPathStatsInfos,
  dirListWithFileTypeAsync,
  getPathInfos,
  getStats,
};
