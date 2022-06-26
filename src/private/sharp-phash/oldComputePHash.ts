import { notExcluded } from '../file-path/tools/notExclude';
import {
  Excluded,
  PathWithStats,
  WithPHash,
} from '../file-path/types';
import { phashNow } from './phashNow';

export async function oldComputePHash<T extends PathWithStats>(
  paths: Promise<T>
) {
  const currentPath = await paths;
  if (notExcluded(currentPath)) {
    const { phash } = phashNow(currentPath);
    const hash = await phash.get();
    if (typeof hash === 'string') {
      const result: Excluded<false> & PathWithStats & WithPHash = {
        pHash: hash,
        ...currentPath,
      };
      return result;
    }
  }
  const result: Excluded<true> & PathWithStats & WithPHash = {
    pHash: null,
    ...currentPath,
    exclude: true,
  };
  return result;
}
