import { Stats } from 'fs';
/** @deprecated */
export const statsLister = (stats: Stats) => [
  ['.isDirectory', stats.isDirectory],
  ['.isFile', stats.isFile],
  ['.isBlockDevice', stats.isBlockDevice],
  ['.isCharacterDevice', stats.isCharacterDevice],
  ['.isFIFO', stats.isFIFO],
  ['.isSocket', stats.isSocket],
  ['.isSymbolicLink', stats.isSymbolicLink],
];
