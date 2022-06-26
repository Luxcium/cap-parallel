import { validExts } from '../../constants/validExts';
import { PathWithStats } from '../file-path/types';
import { Bg } from '../file-path/types/Bg';
import { immediateZalgo } from '../utils';

export function oldFilterExts<T extends PathWithStats>(
  list: Bg<Promise<T>>,
  validExt: Set<string> = validExts
): Bg<Promise<T>> {
  return list.map(async i => {
    const awaited_i = await i;
    const { ext } = awaited_i;
    return immediateZalgo({
      ...awaited_i,
      exclude: awaited_i.exclude || !validExt.has(ext),
    });
  });
}
