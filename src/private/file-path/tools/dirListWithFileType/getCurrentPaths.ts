import { immediateZalgo } from '../../../utils';
import { CurrentPath } from '../../types';
import { isA_Promise } from '../isA_Promise';
import { currentPath } from './currentPath';
import { dirListWithFileType } from './dirListWithFileType';

export function getCurrentPaths(
  folderPath: string,
  isAsync: false
): CurrentPath[];
export function getCurrentPaths(
  folderPath: string,
  isAsync: true
): Promise<CurrentPath[]>;
export function getCurrentPaths(folderPath: string): CurrentPath[];
export function getCurrentPaths(
  folderPath: Promise<string>
): Promise<CurrentPath[]>;
export function getCurrentPaths(
  folderPath: string | Promise<string>,
  isAsync: boolean = false
): CurrentPath[] | Promise<CurrentPath[]> {
  if (isA_Promise(folderPath)) {
    return (async () => {
      return (await dirListWithFileType(folderPath)).map(
        currentPath(await folderPath)
      );
    })();
  }

  if (isAsync) {
    const folderPath_ = immediateZalgo(folderPath);
    return (async () =>
      (await dirListWithFileType(folderPath_)).map(
        currentPath(await folderPath_)
      ))();
  }

  return dirListWithFileType(folderPath).map(currentPath(folderPath));
}

export async function test() {
  console.log(dirListWithFileType('/').map(currentPath('/')));
}

test; //(); //();
