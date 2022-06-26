import type { CurrentPath, DirentWithFileType } from '../../types';

export function filterCharacterDevices(element: CurrentPath): boolean;
export function filterCharacterDevices(
  element: DirentWithFileType[]
): DirentWithFileType[];
export function filterCharacterDevices(element: DirentWithFileType): boolean;

export function filterCharacterDevices(
  element: DirentWithFileType | DirentWithFileType[] | CurrentPath
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isCharacterDevice);
  }

  if ('isCharacterDevice' in element) return element.isCharacterDevice;

  return element.type === 'CharacterDevice';
}
