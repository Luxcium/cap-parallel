import { isA_Promise } from '../../tools';
import type {
  CurrentPath,
  DirentWithFileType,
  PathAndStats,
  PathWithStats,
} from '../../types';

export function filterFiles(
  element: Promise<PathAndStats | PathWithStats>
): Promise<boolean>;
export function filterFiles(element: CurrentPath): boolean;
export function filterFiles(
  element: DirentWithFileType[]
): DirentWithFileType[];
export function filterFiles(element: DirentWithFileType): boolean;

export function filterFiles(
  element:
    | DirentWithFileType
    | DirentWithFileType[]
    | CurrentPath
    | Promise<PathAndStats | PathWithStats>
): boolean | DirentWithFileType[] | Promise<boolean> {
  if (Array.isArray(element)) return element.filter(item => item.isFile);

  if ('isFile' in element) return element.isFile;

  if (isA_Promise(element)) {
    return (async () => {
      const element_ = await element;
      return element_.type === 'File';
    })();
  }

  return element.type === 'File';
}
