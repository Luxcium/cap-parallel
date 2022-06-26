import type { DirentWithFileType } from '../../types';
import { dirListWithFileTypeAsync } from './dirListWithFileTypeAsync';
import { dirListWithFileTypeSync } from './dirListWithFileTypeSync';

/**
    dir: folderPath,  \
    fullPath: `${folderPath}/${f.fileName}`,  \
    fileName: f.fileName,  \
    type: FileType.Unknown,
 */
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
    return (async () => dirListWithFileTypeAsync(await folderPath))();
  }

  return dirListWithFileTypeSync(folderPath);
}

export function test() {
  console.log(dirListWithFileType('/'));
}
test; //();
