import type { CurrentPath, DirentWithFileType } from '../../types';

export function filterFIFOs(element: CurrentPath): boolean;
export function filterFIFOs(
  element: DirentWithFileType[]
): DirentWithFileType[];
export function filterFIFOs(element: DirentWithFileType): boolean;

export function filterFIFOs(
  element: DirentWithFileType | DirentWithFileType[] | CurrentPath
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) return element.filter(item => item.isFIFO);

  if ('isFIFO' in element) return element.isFIFO;

  return element.type === 'FIFO';
}
