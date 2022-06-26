import { devPaths } from '../../../constants/devPaths';
import { filesTypeList } from '../constants/filesTypes';
import {
  currentPath,
  dirListWithFileType,
  getCurrentPaths,
} from './dirListWithFileType';
import { getDirListFileTypes } from './getDirListWithFileType';
import { getPathInfos } from './getPathInfos';
import { getRawDirList } from './getRawDirList';
import { getStats } from './getStats';

export { FileType as FileTypes } from './FileTypeEnum';
export type { FileType } from './FileTypeEnum';
export {
  getDirs,
  getDirsSync,
  getFiles,
  getFilesAsync,
  getListing,
  getListingAsync,
} from './fsTools';
export { getDirListFileTypes } from './getDirListWithFileType';
export { getPathInfos } from './getPathInfos';
export { getRawDirList, getRawDirListSync } from './getRawDirList';
export { getStats, getStatsSync } from './getStats';
export { isA_Promise } from './isA_Promise';
export { parsePath } from './parsePath';
export const fsTools = {
  devPaths,
  filesTypeList,
  getDirListFileTypes,
  getPathInfos,
  getRawDirList,
  getStats,
  currentPath,
  dirListWithFileType,
  getCurrentPaths,
};
