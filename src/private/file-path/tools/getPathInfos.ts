import path from 'path';

export function getPathInfos(pathStr: string) {
  return {
    dirname: () => path.dirname(pathStr),
    extname: () => path.extname(pathStr),
    isAbsolute: () => path.isAbsolute(pathStr),
    normalized: () => path.normalize(pathStr),
    parsed: () => path.parse(pathStr),
    toNamespacedPath: () => path.toNamespacedPath(pathStr),
    posix: () => path.posix,
    sep: () => path.sep,
    win32: () => path.win32,
    delimiter: () => path.delimiter,
    pBasename: path.basename,
    pFormat: path.format,
    pJoin: path.join,
    pRelative: path.relative,
    pResolve: path.resolve,
  };
}
