import { LongShortPath } from './LongShortPath';

export function getPathsObj(
  folderPath: string,
  shortName: string
): LongShortPath {
  return {
    path: `${folderPath}/${shortName}`,
    name: shortName,
  };
}
