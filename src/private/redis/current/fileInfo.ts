import { dir } from 'console';
import path, { dirname } from 'path';

const DUMMY = 'dummy';
const collctn = {
  fullPath: DUMMY,
  shortName: DUMMY,
};
const pathStr = DUMMY;
const stats = { DUMMY };
const listings = { count: { DUMMY } };
export function buildFileIfoObject() {
  const result = {
    ...stats,
    ...listings.count,
    //@ts-ignore
    ...getThisFileType(f),
    //@ts-ignore
    dirname: srtPath(dirname),
    extname: path.extname(pathStr),
    isAbsolute: path.isAbsolute(pathStr),
    //@ts-ignore
    normalized: srtPath(path.normalize(pathStr)),
    //@ts-ignore
    ...parsed,
    dir,
    //@ts-ignore
    toNamespacedPath: srtPath(path.toNamespacedPath(pathStr)),
    //@ts-ignore
    userDirName: user.shortName,
    collectionDirName: collctn.shortName,
    keywords: collctn.shortName
      .split('-')
      .filter(csn => csn !== '')
      .filter(csn => Number.isNaN(csn as unknown as number))
      .filter(csn => csn.length > 1)
      .slice(0, -1)
      .sort()
      .sort((a, b) => b.length - a.length),
    xDir: collctn.shortName
      .split('-')
      .filter(csn => csn !== '')
      .slice(-1)[0],
    //@ts-ignore
    fileName: f,
    //@ts-ignore
    displaycount,
  };
  return result;
}
