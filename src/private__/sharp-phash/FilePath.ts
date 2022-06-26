import { FileType } from '../file-path/types';

export type FilePath<Bool extends boolean = true | false> = {
  fileName: string;
  extname: string;
  baseName: string;
  fullPath: string;
  dir: string;
  ext: string;
  exclude: Bool;
  type: FileType;
};
