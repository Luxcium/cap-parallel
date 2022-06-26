import { validExts } from '../../constants/validExts';
import { PathWithStats } from '../file-path/types';
import { Bg } from '../file-path/types/Bg';
import { oldFilterExts } from './oldFilterExts';

export function oldFilterExtensions(
  validExt: Set<string> = validExts
): (list: Bg<Promise<PathWithStats>>) => Bg<Promise<PathWithStats>> {
  return <T extends PathWithStats>(list: Bg<Promise<T>>) =>
    oldFilterExts(list, validExt);
}
