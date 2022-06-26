// import {
//   WithBaseName,
//   WithDir,
//   WithExt,
//   WithExtname,
//   WithFileExtname,
//   WithFileName,
//   WithFullPath,
//   WithPathToFile,
//   WithRoot,
// } from '../file-path/types';

// import { withKey } from './with/withKey';

// export function withExt<W extends {} = {}>(base: W, value: string) {
//   return withKey<WithExt & W>('ext', base as WithExt & W, value);
// }

// export function withRoot<B extends {} = {}>(base: B, value: string) {
//   return withKey<WithRoot & B>('root', base as WithRoot & B, value);
// }

// export const toto = withExt({}, 'jpg');
// export const toto2 = withRoot(toto, '/');
// export function withDir<B extends {} = {}>(base: B, value: string) {
//   return withKey<WithDir & B>('dir', base as WithDir & B, value);
// }

// export function withBaseName<B extends {} = {}>(base: B, value: string) {
//   return withKey<WithBaseName & B>('baseName', base as WithBaseName & B, value);
// }
// export function withFileName<B extends {} = {}>(base: B, value: string) {
//   return withKey<WithFileName & B>('fileName', base as WithFileName & B, value);
// }
// export function withPathToFile<B extends {} = {}>(base: B, value: string) {
//   return withKey<WithPathToFile & B>(
//     'pathToFile',
//     base as WithPathToFile & B,
//     value
//   );
// }
// export function withFullPath<B extends {} = {}>(base: B, value: string) {
//   return withKey<WithFullPath & B>('fullPath', base as WithFullPath & B, value);
// }
// export function withFileExtname<B extends {} = {}>(base: B, value: string) {
//   return withKey<WithFileExtname & B>(
//     'fileExtname',
//     base as WithFileExtname & B,
//     value
//   );
// }
// export function withExtname<B extends {} = {}>(base: B, value: string) {
//   return withKey<WithExtname & B>('root', base as WithExtname & B, value);
// }

export {};
