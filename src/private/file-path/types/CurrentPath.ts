import { FileType } from '../tools';
import { IsNotValidPHash, IsValidPHash } from './ValidPHash';
import { WithExclude } from './WithExclude';

export type ParsedWithTypeAndExcludeFlag = ParsedWithType & ParsedWithFlag;
export type ParsedWithType = MyParsedPath & WithType;
export type ParsedWithFlag = MyParsedPath & WithExcludeFlag;
export type CurrentPath = WithFileName &
  WithFileExtname &
  WithBaseName &
  WithFullPath &
  WithExtname &
  WithDir &
  WithExt &
  WithExclude &
  WithFileType;

export type WithRoot = {
  /**
   * The root of the path such as '/' or 'c:\'
   */
  root: string;
};
export type WithDir = {
  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;
};
export type WithBaseName = {
  baseName: string;
};
export type WithFileName = {
  fileName: string;
};
/** @deprecated use {@link WithDir} instead */
export type WithPathToFile = {
  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;
};
export type WithFullPath = {
  fullPath: string;
};
export type WithFileExtname = {
  extname: string;
};

export type WithExtname = {
  extname: string;
};
export type WithExt = {
  ext: string;
};

export type WithExtention = WithExtname & WithExt;

export type WithFileType = {
  type: FileType;
};
export type WithType = {
  type: FileType;
};
export type WithPHash = IsValidPHash | IsNotValidPHash;

export type WithCount = {
  count: number;
};

export type WithIndex = {
  index: number;
};
export type WithExcludeFlag = {
  exclude: boolean;
};
export type MyParsedPath = WithFullPath &
  WithDir &
  WithFileName &
  WithBaseName &
  WithExt &
  WithExtname &
  WithRoot;

export interface ParsedPath {
  /**
   * The root of the path such as '/' or 'c:\'
   */
  root: string;
  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;
  /**
   * The file name including extension (if any) such as 'index.html'
   */
  base: string;
  /**
   * The file extension (if any) such as '.html'
   */
  ext: string;
  /**
   * The file name without extension (if any) such as 'index'
   */
  name: string;
}

export interface ParsedRoot {
  ParsedPath: { root: string };
}
export interface ParsedDir {
  ParsedPath: { dir: string };
}
export interface ParsedBase {
  ParsedPath: { base: string };
}
export interface ParsedExt {
  ParsedPath: { ext: string };
}
export interface ParsedName {
  ParsedPath: { name: string };
}

export interface BaseRoot {
  root: string;
}
export interface BasedDir {
  dir: string;
}
export interface BaseBase {
  base: string;
}
export interface BasedExt {
  ext: string;
}
export interface BaseName {
  name: string;
}
