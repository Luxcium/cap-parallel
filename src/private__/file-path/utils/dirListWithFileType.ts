import {
  getDirListFileTypes,
  getRawDirList,
  getRawDirListSync,
} from '../tools';
import { DirentWithFileType } from '../types';

export async function asyncDirListWithFileType(
  folderPath: string
): Promise<DirentWithFileType[]> {
  const rawDirList = await getRawDirList(folderPath);
  return getDirListFileTypes(rawDirList);
}

export function dirListWithFileTypeSync(
  folderPath: string
): DirentWithFileType[] {
  const rawDirList = getRawDirListSync(folderPath);
  return getDirListFileTypes(rawDirList);
}

export function dirListWithFileType(folderPath: string): DirentWithFileType[];
export function dirListWithFileType(
  folderPath: Promise<string>
): Promise<DirentWithFileType[]>;
export function dirListWithFileType(
  folderPath: string | Promise<string>
): DirentWithFileType[] | Promise<DirentWithFileType[]> {
  if (
    typeof folderPath !== 'string' &&
    typeof folderPath === 'object' &&
    folderPath instanceof Promise
  ) {
    return (async () => asyncDirListWithFileType(await folderPath))();
  }

  return dirListWithFileTypeSync(folderPath);
}
