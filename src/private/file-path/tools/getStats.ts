import { Stats, statSync } from 'fs';
import { stat } from 'fs/promises';
import { immediateZalgo } from '../../utils';

export function getStats(pathStr: string) {
  let stats: null | Promise<Stats> = null;

  async function _getStats() {
    if (stats === null) stats = stat(pathStr);

    return immediateZalgo(stats);
  }

  return {
    dev: async () => (await _getStats()).dev,
    ino: async () => (await _getStats()).ino,
    mode: async () => (await _getStats()).mode,
    nlink: async () => (await _getStats()).nlink,
    uid: async () => (await _getStats()).uid,
    gid: async () => (await _getStats()).gid,
    rdev: async () => (await _getStats()).rdev,
    size: async () => (await _getStats()).size,
    blksize: async () => (await _getStats()).blksize,
    blocks: async () => (await _getStats()).blocks,
    atimeMs: async () => (await _getStats()).atimeMs,
    mtimeMs: async () => (await _getStats()).mtimeMs,
    ctimeMs: async () => (await _getStats()).ctimeMs,
    birthtimeMs: async () => (await _getStats()).birthtimeMs,
    atime: async () => (await _getStats()).atime,
    mtime: async () => (await _getStats()).mtime,
    ctime: async () => (await _getStats()).ctime,
    birthtime: async () => (await _getStats()).birthtime,
  };
}

export function getStatsSync(pathStr: string) {
  let stats: null | Stats = null;

  function _getStatsSync() {
    if (stats === null) stats = statSync(pathStr);

    return stats;
  }

  return {
    dev: () => _getStatsSync().dev,
    ino: () => _getStatsSync().ino,
    mode: () => _getStatsSync().mode,
    nlink: () => _getStatsSync().nlink,
    uid: () => _getStatsSync().uid,
    gid: () => _getStatsSync().gid,
    rdev: () => _getStatsSync().rdev,
    size: () => _getStatsSync().size,
    blksize: () => _getStatsSync().blksize,
    blocks: () => _getStatsSync().blocks,
    atimeMs: () => _getStatsSync().atimeMs,
    mtimeMs: () => _getStatsSync().mtimeMs,
    ctimeMs: () => _getStatsSync().ctimeMs,
    birthtimeMs: () => _getStatsSync().birthtimeMs,
    atime: () => _getStatsSync().atime,
    mtime: () => _getStatsSync().mtime,
    ctime: () => _getStatsSync().ctime,
    birthtime: () => _getStatsSync().birthtime,
  };
}
