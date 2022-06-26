import { SplitPath } from '../types';
import { getGroup, getHSize, getPath, getSize } from '../utils';
import { getExt, getFile } from '../utils/getSplit';

export function getSplit(qPath: string): SplitPath {
  return {
    dir: getPath(qPath),
    group: getGroup(qPath),
    hSize: getHSize(qPath),
    size: getSize(qPath),
    file: getFile(qPath),
    ext: getExt(qPath),
    fullPath: `${getPath(qPath)}/${getFile(qPath)}.${getExt(qPath)}`,
  };
}
