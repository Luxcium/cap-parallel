// import { validExts } from '../../constants/validExts';
// import {
//   PathAndStats,
//   PathWithStats,
//   WithExclude,
//   WithPHash,
// } from '../file-path/types';
// import { Bg } from '../file-path/types/Bg';
// import { filterExtensions } from './filterExtensions';
// import { listFiles } from './listFiles';
// import { oldGetPhash } from './oldGetPhash';

// export function getFilesWithPHash(
//   folder: string,
//   withStats: true,
//   validExt?: Set<string>
// ): Bg<Promise<PathAndStats & WithExclude & WithPHash>>;
// export function getFilesWithPHash(
//   folder: string,
//   withStats: false,
//   validExt?: Set<string>
// ): Bg<Promise<PathWithStats & WithExclude & WithPHash>>;
// export function getFilesWithPHash(
//   folder: string,
//   withStats: boolean = false,
//   validExt: Set<string> = validExts
// ): Bg<Promise<(PathWithStats | PathAndStats) & WithExclude & WithPHash>> {
//   if (withStats) {
//     return oldGetPhash(filterExtensions(validExt)(listFiles(folder, true)));
//   }
//   return oldGetPhash(filterExtensions(validExt)(listFiles(folder, false)));
// }
export {};
