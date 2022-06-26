import {
  WithBaseName,
  WithDir,
  WithExclude,
  WithExt,
  WithExtname,
  WithFileExtname,
  WithFileType,
  WithFullPath,
  WithPathToFile,
} from '../../file-path/types';
import { FileType } from '../../sharp-phash/types';
import { WithFileName, withKey } from './withKey';

// WithFileName &
//   WithPathToFile &
//   WithFileExtname &
//   WithBaseName &
//   WithFullPath &
//   WithExtname &
//   WithDir &
//   WithExt &
//   WithExclude &
//   WithFileType;

/** @deprecated use {@link withDir} instead */
export function withPathToFile<B extends {} = {}>(base: B, value: string) {
  return withKey<B, WithPathToFile>('dir', base, value);
}

export function withFileName<B extends {} = {}>(base: B, value: string) {
  return withKey<B, WithFileName>('fileName', base, value);
}
export function withFileExtname<B extends {} = {}>(base: B, value: string) {
  return withKey<B, WithFileExtname>('extname', base, value);
}

export function withBaseName<B extends {} = {}>(base: B, value: string) {
  return withKey<B, WithBaseName>('baseName', base, value);
}

export function withFullPath<B extends {} = {}>(base: B, value: string) {
  return withKey<B, WithFullPath>('fullPath', base, value);
}

export function withExtname<B extends {} = {}>(base: B, value: string) {
  return withKey<B, WithExtname>('extname', base, value);
}

export function withDir<B extends {} = {}>(base: B, value: string) {
  return withKey<B, WithDir>('dir', base, value);
}

export function withExt<B extends {} = {}>(base: B, value: string) {
  return withKey<B, WithExt>('ext', base, value);
}

export function withExclude<B extends {} = {}>(base: B, value: boolean) {
  return withKey<B, WithExclude>('exclude', base, value);
}

export function withFileType<B extends {} = {}>(base: B, value: FileType) {
  return withKey<B, WithFileType>('type', base, value);
}
