import type { CurrentPath, DirentWithFileType } from '../../types';

export function filterSockets(element: CurrentPath): boolean;
export function filterSockets(
  element: DirentWithFileType[]
): DirentWithFileType[];
export function filterSockets(element: DirentWithFileType): boolean;

export function filterSockets(
  element: DirentWithFileType | DirentWithFileType[] | CurrentPath
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) return element.filter(item => item.isSocket);

  if ('isSocket' in element) return element.isSocket;

  return element.type === 'Socket';
}
