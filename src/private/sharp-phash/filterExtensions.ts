import { validExts } from '../../constants/validExts';
import { PathWithStats } from '../file-path/types';
import { Bg } from '../file-path/types/Bg';

export function filterExtensions(
  validExt: Set<string> = validExts
): (list: Bg<PathWithStats>) => Bg<PathWithStats> {
  return <T extends PathWithStats>(list: Bg<T>) => filterExts(list, validExt);
}

export function filterExts<T extends PathWithStats>(
  list: Bg<T>,
  validExt: Set<string> = validExts
): Bg<T> {
  return list.map(i => {
    const { ext } = i;
    return {
      ...i,
      exclude: i.exclude || !validExt.has(ext),
    };
  });
}
