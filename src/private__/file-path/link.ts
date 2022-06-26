import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';

export const fsLink = fsp.link;
export const fsSymlink = fsp.symlink;
export const link = fs.link;
export const symlink = fs.symlink;

export function linkFile(
  destination: string
): (src: string) => (filename: string) => Promise<void> {
  return source => async filename =>
    fsLink(`${source}${filename}`, `${destination}${filename}`);
}

/*
symlink
fsPromises.link(existingPath, newPath)#
Added in: v10.0.0
existingPath <string> | <Buffer> | <URL>
newPath <string> | <Buffer> | <URL>
Returns: <Promise> Fulfills with undefined upon success.
Creates a new link from the existingPath to the newPath. See the POSIX link(2) documentation for more detail.

fsPromises.symlink(target, path[, type])#
Added in: v10.0.0
target <string> | <Buffer> | <URL>
path <string> | <Buffer> | <URL>
type <string> Default: 'file'
Returns: <Promise> Fulfills with undefined upon success.
Creates a symbolic link.

The type argument is only used on Windows platforms and can be one of 'dir', 'file', or 'junction'. Windows junction points require the destination path to be absolute. When using 'junction', the target argument will automatically be normalized to absolute path.
 */
