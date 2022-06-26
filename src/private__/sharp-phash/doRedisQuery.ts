import { statSync } from 'fs';
import { notExcluded, notNull } from '../file-path/tools/notExclude';
import {
  Bg,
  Excluded,
  PathWithStats,
  ValidPHash,
} from '../file-path/types';
import { uniqueAddToObj } from '../img-scout/commands/uniqueAddToObj';
import { titleBuilder } from './titleBuilder';
import { Strange } from './types';

export function doRedisQuery(
  R: any,

  key: string
) {
  return (
    bgPaths: Bg<
      PathWithStats & {
        pHashValue: () => Promise<
          | (Excluded<false> & ValidPHash<true>)
          | (Excluded<true> & ValidPHash<false>)
        >;
      }
    >
  ) => {
    return bgPaths.map(paths => {
      const queryResult = async () => {
        const _path = { ...paths, ...(await paths.pHashValue()) };
        if (notNull(_path.pHash) && notExcluded(_path)) {
          const stats = statSync(_path.fullPath);
          const phash_ = _path.pHash;

          return uniqueAddToObj({
            R,
            title: titleBuilder({ ..._path, ...stats, key }),
            phash_,
            radius: '0',
            k: key,
          });
        }
        return null;
      };
      const strange: Strange<true | false> = {
        ...paths,
        queryResult,
      };
      return strange;
    });
  };
}
