import type { CurrentPath, DirentWithFileType } from '../../types';

export function filterDirectories(element: CurrentPath): boolean;
export function filterDirectories(
  element: DirentWithFileType[]
): DirentWithFileType[];
export function filterDirectories(element: DirentWithFileType): boolean;

export function filterDirectories(
  element: DirentWithFileType | DirentWithFileType[] | CurrentPath
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) return element.filter(item => item.isDirectory);

  if ('isDirectory' in element) return element.isDirectory;

  return element.type === 'Directory';
}
