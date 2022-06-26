import { FileTypes, parsePath } from '../tools';
import {
  BlockDevicePath,
  CharacterDevicePath,
  CurrentPath,
  DirectoryPath,
  DirentWithFileType,
  FIFOPath,
  FilePath,
  SocketPath,
  SymbolicLinkPath,
  UnknownTypePath,
} from '../types';

export function getCurrentPath(f: DirentWithFileType, folderPath: string) {
  const fullPath = `${folderPath}/${f.fileName}`;
  const _fullPath: CurrentPath = {
    type: FileTypes.Unknown,
    ...parsePath(fullPath),
    exclude: false,
  };
  if (f.isDirectory) {
    _fullPath.type = FileTypes.Directory;
    return _fullPath as DirectoryPath;
  }
  if (f.isFile) {
    _fullPath.type = FileTypes.File;
    return _fullPath as FilePath;
  }
  if (f.isSymbolicLink) {
    _fullPath.type = FileTypes.SymbolicLink;
    return _fullPath as SymbolicLinkPath;
  }
  if (f.isBlockDevice) {
    _fullPath.type = FileTypes.BlockDevice;
    return _fullPath as BlockDevicePath;
  }
  if (f.isCharacterDevice) {
    _fullPath.type = FileTypes.CharacterDevice;
    return _fullPath as CharacterDevicePath;
  }

  if (f.isFIFO) {
    _fullPath.type = FileTypes.FIFO;
    return _fullPath as FIFOPath;
  }

  if (f.isSocket) {
    _fullPath.type = FileTypes.Socket;
    return _fullPath as SocketPath;
  }

  return _fullPath as UnknownTypePath;
}
