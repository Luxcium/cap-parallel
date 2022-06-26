import { FileType } from '../tools';
import { CurrentPath, WithFileType } from './CurrentPath';

export type WithTypeDirectory = {
  type: FileType.Directory;
};

export type WithTypeFile = {
  type: FileType.File;
};

export type WithTypeBlockDevice = {
  type: FileType.BlockDevice;
};

export type WithTypeCharacterDevice = {
  type: FileType.CharacterDevice;
};

export type WithTypeFIFO = {
  type: FileType.FIFO;
};

export type WithTypeSocket = {
  type: FileType.Socket;
};

export type WithTypeSymbolicLink = {
  type: FileType.SymbolicLink;
};

export type WithTypeUnknown = {
  type: FileType.Unknown;
};

export type WithTypeError = {
  type: FileType.Error;
};

export type WithFileType2 = WithFileType &
  (
    | WithTypeDirectory
    | WithTypeFile
    | WithTypeBlockDevice
    | WithTypeCharacterDevice
    | WithTypeFIFO
    | WithTypeSocket
    | WithTypeSymbolicLink
    | WithTypeUnknown
    | WithTypeError
  );
export type CurrentPathError = ErrorTypePath & {
  fileName: '';
  dir: '';
  fullPath: '';
  extname: string;
  ext: string;
  exclude: boolean;
  type: FileType.Error;
};
export type BlockDevicePath = CurrentPath & {
  readonly type: FileType.BlockDevice;
};
export type CharacterDevicePath = CurrentPath & {
  readonly type: FileType.CharacterDevice;
};
export type DirectoryPath = CurrentPath & {
  readonly type: FileType.Directory;
};
export type FIFOPath = CurrentPath & {
  readonly type: FileType.FIFO;
};
export type FilePath = CurrentPath & {
  readonly type: FileType.File;
};
export type SocketPath = CurrentPath & {
  readonly type: FileType.Socket;
};
export type SymbolicLinkPath = CurrentPath & {
  readonly type: FileType.SymbolicLink;
};
export type UnknownTypePath = CurrentPath & {
  readonly type: FileType.Unknown;
};
export type ErrorTypePath = CurrentPath & {
  readonly type: FileType.Error;
};
