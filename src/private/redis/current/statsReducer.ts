export function statsReducer(stats: any) {
  const {
    size,
    blocks,
    dev,
    mode,
    nlink,
    uid,
    gid,
    rdev,
    blksize,
    ino,
    atime,
    mtime,
    ctime,
    birthtimeMs,
    birthtime,
    ...moreStats
  } = stats;
  return moreStats;
}
