import { Dirent, readdirSync } from 'fs';
import { readdir } from 'fs/promises';

export async function getRawDirList(pathSrc: string) {
  const dirListing: Dirent[] = await readdir(pathSrc, {
    withFileTypes: true,
  });
  return dirListing;
}

export function getRawDirListSync(pathSrc: string) {
  const dirListing: Dirent[] = readdirSync(pathSrc, {
    withFileTypes: true,
  });
  return dirListing;
}

export function test_getRawDirListSync() {
  console.log(getRawDirListSync('/'));
}
// test_getRawDirListSync();
