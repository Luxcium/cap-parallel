import path from 'path';
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
} from '../../file-path/types';
import { FileType } from '../../types/Enums/FileTypeEnum';

/** @deprecated */
export const currentPath = (folder: string) => (f: DirentWithFileType) =>
  getCurrentPath(f, folder);

/*
    dir: folderPath,
    fullPath: `${folderPath}/${f.fileName}`,
    fileName: f.fileName,
    type: FileType.Unknown,
 */
/** @deprecated */
export function getCurrentPath(f: DirentWithFileType, folderPath: string) {
  const extname = path.extname(`${f.fileName}`);
  const ext = extname.toLowerCase();
  const fullPath = `${folderPath}/${f.fileName}`;
  const parsed = path.parse(fullPath);
  const fullPath_: CurrentPath = {
    dir: folderPath,
    extname,
    ext,
    fullPath,
    fileName: f.fileName,
    baseName: parsed.name,
    type: FileType.Unknown,
    exclude: false,
  };

  if (f.isDirectory) {
    fullPath_.type = FileType.Directory;
    return fullPath_ as DirectoryPath;
  }
  if (f.isFile) {
    fullPath_.type = FileType.File;
    return fullPath_ as FilePath;
  }
  if (f.isSymbolicLink) {
    fullPath_.type = FileType.SymbolicLink;
    return fullPath_ as SymbolicLinkPath;
  }
  if (f.isBlockDevice) {
    fullPath_.type = FileType.BlockDevice;
    return fullPath_ as BlockDevicePath;
  }
  if (f.isCharacterDevice) {
    fullPath_.type = FileType.CharacterDevice;
    return fullPath_ as CharacterDevicePath;
  }

  if (f.isFIFO) {
    fullPath_.type = FileType.FIFO;
    return fullPath_ as FIFOPath;
  }

  if (f.isSocket) {
    fullPath_.type = FileType.Socket;
    return fullPath_ as SocketPath;
  }

  return fullPath_ as UnknownTypePath;
}
