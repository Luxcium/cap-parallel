import type { CurrentPath, DirentWithFileType } from '../../types';

export function filterSymbolicLinks(element: CurrentPath): boolean;
export function filterSymbolicLinks(
  element: DirentWithFileType[]
): DirentWithFileType[];
export function filterSymbolicLinks(element: DirentWithFileType): boolean;

export function filterSymbolicLinks(
  element: DirentWithFileType | DirentWithFileType[] | CurrentPath
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isSymbolicLink);
  }

  if ('isSymbolicLink' in element) return element.isSymbolicLink;

  return element.type === 'SymbolicLink';
}
