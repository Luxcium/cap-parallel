import { statSync } from 'fs';
import { notExcluded, notNull } from '../file-path/tools/notExclude';
import {
  Bg,
  WithBaseName,
  WithDir,
  WithExclude,
  WithExtname,
  WithFullPath,
  WithPHash,
} from '../file-path/types';
import { uniqueAddToObj } from '../img-scout/commands/uniqueAddToObj';
import { QueryResultItem, QueryResultObject } from '../img-scout/types';
import { immediateZalgo } from '../utils';
import { titleBuilder } from './titleBuilder';
import { OldStrange } from './types';

export function oldDoRedisQuery(
  R: any,

  key: string
) {
  return (
    bgPaths: Bg<
      Promise<
        WithDir &
          WithFullPath &
          WithBaseName &
          WithExtname &
          WithExclude &
          WithPHash
      >
    >
  ): Bg<Promise<OldStrange>> => {
    return bgPaths.map(async awtPaths => {
      const paths = await awtPaths;
      let getQueryResult = (): any => null;
      let queryResult: Array<QueryResultItem | QueryResultObject> | null = null;

      if (notNull(paths.pHash) && notExcluded(paths)) {
        const stats = statSync(paths.fullPath);
        const phash_ = paths.pHash;
        queryResult = await uniqueAddToObj({
          R,
          title: titleBuilder({ ...paths, ...stats, key }),
          phash_,
          radius: '0',
          k: key,
        });
        getQueryResult = () => queryResult;
      }
      const strange: OldStrange = {
        queryResult,
        ...paths,
        getQueryResult,
      };
      return immediateZalgo(strange);
    });
  };
}
