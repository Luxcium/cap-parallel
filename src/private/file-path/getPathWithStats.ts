import { stat } from 'fs/promises';
import { immediateZalgo } from '../utils';
import { FileTypes } from './tools';
import type { GetStats, PathAndStats, PathWithStats } from './types';
import { dirListWithFileType } from './utils/dirListWithFileType';
import { getChildPaths } from './utils/getChildPaths';
import { getCurrentPath } from './utils/getCurrentPath';

const humanSize = require('human-size');

const getStats = async (currentPath: {
  fileName: string;
  dir: string;
  fullPath: string;
  extname: string;
  baseName: string;
  ext: string;
  exclude: boolean;
  type: FileTypes;
}): Promise<GetStats & { ext: string; exclude: boolean; hSize?: string }> => {
  try {
    const stats = { ...(await stat(currentPath.fullPath)) };
    const hSize = humanSize(stats.size, 4);
    return {
      ...currentPath,
      ...stats,
      hSize,
      exclude: false,
    };
  } catch (error: any) {
    return immediateZalgo<GetStats>({
      dir: '',
      fullPath: '',
      baseName: '',
      fileName: '',
      extname: '',
      ext: '',
      hSize: '',
      type: FileTypes.Error,
      ...error,
      exclude: true,
    });
  }
};
export function getPathWithStats(
  folderPath: string,
  withStats: false
): Promise<PathWithStats>[];

export function getPathWithStats(
  folderPath: string,
  withStats: true
): Promise<PathAndStats>[];
export function getPathWithStats(
  folderPath: string,
  withStats: boolean
): Promise<PathWithStats | PathAndStats>[];
export function getPathWithStats(folderPath: string): Promise<PathWithStats>[];
export function getPathWithStats(
  folderPath: string,
  withStats: boolean = false
): Promise<PathWithStats | PathAndStats>[] {
  const dirList = dirListWithFileType(folderPath);
  const result = dirList.map(async f => {
    const currentPath = {
      ...getCurrentPath(f, folderPath),
    };
    const { fullPath, type } = currentPath;
    const getChild = () => getChildPaths(fullPath, type, withStats)();

    if (withStats) {
      const stats = await getStats(currentPath);
      return {
        ...currentPath,
        ...stats,
        getChild,
        /*
         dirs: dirs.length,
      files: files.length,
      all: dirs.length + files.length,
      isLeaf: dirs.length === 0,
      isNode: dirs.length > 0,
      isEmptyLeaf: dirs.length === 0 && files.length === 0,
      isEmptyNode: dirs.length > 0 && files.length === 0,
    },
         */
        getStats: () => getStats(currentPath),
      };
    }
    return {
      ...currentPath,
      getChild,
      getStats: () => getStats(currentPath),
    };
  });

  return result;
}

export function newGetPathWithStats(folderPath: string): PathWithStats[] {
  const dirList = dirListWithFileType(folderPath);
  const result = dirList.map(f => {
    const currentPath = {
      ...getCurrentPath(f, folderPath),
    };
    const { fullPath, type } = currentPath;
    const getChild = getChildPaths(fullPath, type, false);

    return {
      ...currentPath,
      getChild,
      getStats: () => getStats(currentPath),
    };
  });

  return result;
}
