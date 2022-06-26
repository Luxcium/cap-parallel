import type { FileType } from './Enums/FileTypeEnum';

/** @deprecated */
export type WithIndex = {
  index: number;
};
/** @deprecated */
export type WithTitle = {
  title: string;
};
/** @deprecated */
export type WithRadius = {
  radius: string;
};
/** @deprecated */
export type WithID = {
  id: number;
};

/** @deprecated */
export type WithPhash = {
  pHash: string;
};
/** @deprecated */
export type WithFileName = {
  fileName: string;
};

/** @deprecated */
export type WithPathToFile = {
  dir: string;
};

/** @deprecated */
export type WithFullPath = {
  fullPath: string;
};

/** @deprecated */
export type WithFileType = {
  type: FileType;
};

/** @deprecated */
export type CurrentPath = WithFileName &
  WithPathToFile &
  WithFullPath &
  WithFileType;
/** @deprecated */
export type BlockDevicePath = CurrentPath & {
  readonly type: FileType.BlockDevice;
};
/** @deprecated */
export type CharacterDevicePath = CurrentPath & {
  readonly type: FileType.CharacterDevice;
};
/** @deprecated */
export type DirectoryPath = CurrentPath & {
  readonly type: FileType.Directory;
};
/** @deprecated */
export type FIFOPath = CurrentPath & {
  readonly type: FileType.FIFO;
};
/** @deprecated */
export type FilePath = CurrentPath & {
  readonly type: FileType.File;
};
/** @deprecated */
export type SocketPath = CurrentPath & {
  readonly type: FileType.Socket;
};
/** @deprecated */
export type SymbolicLinkPath = CurrentPath & {
  readonly type: FileType.SymbolicLink;
};

/** @deprecated */
export type UnknownTypePath = CurrentPath & {
  readonly type: FileType.Unknown;
};
