import { stat } from 'fs/promises';
import path from 'path';
import { immediateZalgo } from '../../utils';
import { getKeywords } from './getKeywords';
import { getxDir } from './getxDir';
import { statsReducer } from './statsReducer';

export async function getFileInfos(o: any) {
  const keywords = getKeywords(o.coll.name);
  const uriRoot = '${X004D}';
  const pathStr = o.file.path;
  const parsed = path.parse(pathStr);
  const xDir = getxDir(o.coll.name);

  const stats = await stat(o.file.path);
  const moreStats = statsReducer(stats);

  const { name, ext } = parsed;
  const fileInfo = {
    keywords: keywords,
    coll: o.coll.name,
    userDirName: o.user.name,
    uriRoot: uriRoot,
    xDir: xDir,
    name: name,
    ext: ext.slice(1),
    ...moreStats,
    size: stats.size,
    currentCount: o.countTotal,
  };
  return Promise.all([
    immediateZalgo(keywords),
    immediateZalgo(fileInfo),
    immediateZalgo(o),
  ]);
}
