import { DirentWithFileType } from '../../types';
import { getDirListFileTypes } from '../getDirListWithFileType';
import { getRawDirListSync } from '../getRawDirList';

export function dirListWithFileTypeSync(
  folderPath: string,
  debug = false
): DirentWithFileType[] {
  const rawDirList = getRawDirListSync(folderPath);
  return getDirListFileTypes(rawDirList, debug);
}

export function test() {
  console.log(dirListWithFileTypeSync('/', true));
}
test; //(); //();
