import path from 'path';
import type { MyParsedPath } from '../types';

export function parsePath(fullPath: string): MyParsedPath {
  const parsed = path.parse(fullPath);
  return {
    fullPath,
    dir: parsed.dir,
    fileName: parsed.base,
    baseName: parsed.name,
    ext: parsed.ext,
    extname: parsed.ext.toLowerCase(),
    root: parsed.root,
  };
}
