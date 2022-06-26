import { WithFileType } from '../CurrentPath';

export enum FileType {
  Directory = 'Directory',
  File = 'File',
  BlockDevice = 'BlockDevice',
  CharacterDevice = 'CharacterDevice',
  FIFO = 'FIFO',
  Socket = 'Socket',
  SymbolicLink = 'SymbolicLink',
  Unknown = 'Unknown',

  Error = 'Error',
}

export function isDirectory(item: WithFileType) {
  return item.type === FileType.Directory;
}
export function isFile(item: WithFileType) {
  return item.type === FileType.File;
}
export function isBlockDevice(item: WithFileType) {
  return item.type === FileType.BlockDevice;
}
export function isCharacterDevice(item: WithFileType) {
  return item.type === FileType.CharacterDevice;
}
export function isFIFO(item: WithFileType) {
  return item.type === FileType.FIFO;
}
export function isSocket(item: WithFileType) {
  return item.type === FileType.Socket;
}
export function isSymbolicLink(item: WithFileType) {
  return item.type === FileType.SymbolicLink;
}
export function isUnknown(item: WithFileType) {
  return item.type === FileType.Unknown;
}
