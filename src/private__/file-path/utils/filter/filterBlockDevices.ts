import type { CurrentPath, DirentWithFileType } from '../../types';

export function filterBlockDevices(element: CurrentPath): boolean;
export function filterBlockDevices(
  element: DirentWithFileType[]
): DirentWithFileType[];
export function filterBlockDevices(element: DirentWithFileType): boolean;

export function filterBlockDevices(
  element: DirentWithFileType | DirentWithFileType[] | CurrentPath
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) return element.filter(item => item.isBlockDevice);

  if ('isBlockDevice' in element) return element.isBlockDevice;

  return element.type === 'BlockDevice';
}
