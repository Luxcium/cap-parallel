import { immediateZalgo } from '../../utils';
import { getPathWithStats } from '../getPathWithStats';
import { FileType, FileTypes } from '../tools';
import { CurrentPathError, PathAndStats, PathWithStats } from '../types';

export function getChildPaths(
  fullPath: string,
  type: FileType,
  withStats: boolean
) {
  return (): Promise<PathWithStats | PathAndStats | CurrentPathError>[] => {
    try {
      if (type === 'Directory') {
        // if (withStats) return [...getPathWithStats(fullPath, withStats)];
        return [...getPathWithStats(fullPath, withStats)];
      }
      return [
        immediateZalgo<CurrentPathError>({
          dir: '',
          extname: '',
          ext: '',
          fullPath: '',
          fileName: '',
          baseName: '',
          type: FileTypes.Error,
          exclude: true,
        }),
      ];
    } catch (error: any) {
      return [
        immediateZalgo<CurrentPathError>({
          dir: '',
          extname: '',
          fullPath: '',
          fileName: '',
          type: FileTypes.Error,
          ...error,
        }),
      ];
    }
  };
}
