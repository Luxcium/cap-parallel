import { BoxedGenerator } from '@luxcium/boxed-list';
import { statSync } from 'fs-extra';
import path from 'path';
import { Tedis } from 'tedis';
import { devPaths } from '../../constants/devPaths';
import {
  getDirsSync,
  getFilesAsync,
  getListing,
} from '../file-path/tools';
import { dirListWithFileType } from '../file-path/utils/dirListWithFileType';
import { jsonGet, jsonSet } from './jsonRedis';
// export const SUBSET = 1000;
// const DEBUG = true;
type SetJsonArgs = {
  prefix: string;
  jsonPath: string;
  keyID: string;
  value: string | number;
  RDSServer: Tedis;
};

export async function setJson(A: SetJsonArgs) {
  //  const prefix_: string = 'test_123b';
  const { prefix, jsonPath, keyID, value, RDSServer } = A;
  const shortKey = `${prefix}::${keyID}`;
  console.log(shortKey);
  const rootJsonPath = '.';
  const initialValue = `{}`;
  let setResult;
  try {
    if (null === (await jsonGet(RDSServer, shortKey, rootJsonPath))) {
      await jsonSet(RDSServer, shortKey, rootJsonPath)(initialValue);
    }

    setResult = await RDSServer.command(
      'JSON.SET',
      shortKey,
      jsonPath,
      `${value ?? '""'}`
    );
  } catch (error) {
    // LOG:
    console.error(error);
    console.log('JSON.SET');
    console.log(shortKey);
    console.log(jsonPath);
    console.log(`"${value ?? '""'}"`);
  }

  const getBackValue = await RDSServer.command('JSON.GET', shortKey, jsonPath);
  const results = {
    result: [setResult, getBackValue],
    redis: {
      command: 'JSON.SET',
      atKey: shortKey,
      atJsonPath: jsonPath,
      sentValue: `${value}`,
      setResult,
      getBackValue,
    },
  };
  // LOG:
  console.log(results);
  return results;
}

function replaceStr(searchValue: string, replaceValue: string) {
  return (testString: string) => testString.replace(searchValue, replaceValue);
}

const pathToShorten = devPaths.X004Da;
const shorthenTo = '${X004D}';
const srtPath = replaceStr(pathToShorten, shorthenTo);

main;
main();
async function main() {
  workingFunction({ DEBUG: true }).then(fulfilled => fulfilled.spark());
}

async function workingFunction(opts: { DEBUG: boolean }) {
  opts;
  console.log(__filename);
  let count = 0;
  let count2 = 0;
  let count3 = 0;

  const userPathsGen = BoxedGenerator.of(
    ...[devPaths.PATH1].flatMap(p =>
      getDirsSync(p).map(dir => ({ fullPath: `${p}/${dir}`, shortName: dir }))
    )
  );

  const collectionsPathsGen = userPathsGen.map(user => {
    const dirsSync = BoxedGenerator.of(...getDirsSync(user.fullPath));
    const length = dirsSync.length;
    ++count;
    count2 += length;

    const collectionLevelGen = dirsSync.map(dir => {
      const collctn = {
        fullPath: `${user.fullPath}/${dir}`,
        shortName: dir,
      };

      const somedirListWithFileTypeSync = [
        ...dirListWithFileType(collctn.fullPath),
      ];

      const listings = getListing(collctn.fullPath);
      const getThisFileType = (f: string) =>
        somedirListWithFileTypeSync.find(item => item.fileName === f);

      /**
       * for each collections list contained files f
       */
      const filesPathsGen = BoxedGenerator.of(
        ...getFilesAsync(collctn.fullPath)
      );

      const filesInfoGenerator = filesPathsGen.map(f => {
        //
        const pathStr = `${collctn.fullPath}/${f}`;
        //
        const stats = statSync(pathStr);
        const dirname = path.dirname(pathStr);
        const parsed = path.parse(pathStr);
        const dir = srtPath(parsed.dir);
        const displaycount = `¹${count} ²${count2} ³${count3++}`;
        //
        const fileInfo = {
          ...stats,
          ...listings.count,
          ...getThisFileType(f as any),
          dirname: srtPath(dirname),
          extname: path.extname(pathStr),
          isAbsolute: path.isAbsolute(pathStr),
          normalized: srtPath(path.normalize(pathStr)),
          ...parsed,
          dir,
          toNamespacedPath: srtPath(path.toNamespacedPath(pathStr)),
          userDirName: user.shortName,
          collectionDirName: collctn.shortName,
          keywords: collctn.shortName
            .split('-')
            .filter(csn => csn !== '')
            .filter(csn => Number.isNaN(csn as unknown as number))
            .filter(csn => csn.length > 1)
            .slice(0, -1)
            .sort()
            .sort((a, b) => b.length - a.length),
          xDir: collctn.shortName
            .split('-')
            .filter(csn => csn !== '')
            .slice(-1)[0],
          fileName: f,
          displaycount,
        };

        if (opts.DEBUG) console.log(`${f}:`, fileInfo);
        return fileInfo;
      });
      // const sparkedStep2a_1 = step2a_1.spark();
      // return sparkedStep2a_1;
      return filesInfoGenerator;
    });
    // ++-----------------------------------------------------------------------

    return collectionLevelGen;
    // return user.full;
  });

  const sparkedStatus = {
    unSparkedGen: false,
    sparkedGen: false,
    inerGen: false,
    inermostGen: false,
  };

  const inerMostSparkedGen = () =>
    collectionsPathsGen.map(iner =>
      iner.map(inermost => {
        sparkedStatus.inermostGen = true;
        return inermost.spark();
      })
    );

  const inerSparkedGen = () =>
    inerMostSparkedGen().map(iner => {
      sparkedStatus.inerGen = true;
      return iner.spark();
    });

  const spark = () => {
    sparkedStatus.sparkedGen = true;
    return inerSparkedGen().spark();
  };
  const unSparkedGen = () => {
    sparkedStatus.unSparkedGen = true;
    return collectionsPathsGen;
  };
  return {
    unSparkedGen,
    inerMostSparkedGen,
    inerSparkedGen,
    spark,
    sparkedStatus,
  };
}

// ++ VERRY IMPORTANT STUFF MUST NOT REMOVE ++++++++++++++++++++++++++++
/*
        .map(j => {
          const getFile = getFilesSync(j.full);
          const somedirListWithFileTypeSync = [
            ...dirListWithFileTypeSync(j.full),
          ];
          const getThisFileType = (f: string) =>
            somedirListWithFileTypeSync.filter(item => item.fileName === f)[0];
          getFile.map(f => {
            const pathStr = `${j.full}/${f}`;
            const dirname = path.dirname(pathStr);
            const stats = statSync(pathStr);
            console.log(`${f}:`, {
              currentCount: count3++,
              userDir: k.short,
              ...stats,
              ...getThisFileType(f),
              fileName: f,
              dirname,
              extname: path.extname(pathStr),
              isAbsolute: path.isAbsolute(pathStr),
              normalized: path.normalize(pathStr),
              ...path.parse(pathStr),
              toNamespacedPath: path.toNamespacedPath(pathStr),
              displaycount,
            });
            return f;
          });
        });
 */
// ++ VERRY IMPORTANT STUFF MUST NOT REMOVE ++++++++++++++++++++++++++++
//  const getAllStatsList: (stats: MyStats) => [string, any][] = (
//   stats: MyStats
// ) => [
//   ['.dev', stats.dev],
//   ['.ino', stats.ino],
//   ['.mode', stats.mode],
//   ['.nlink', stats.nlink],
//   ['.uid', stats.uid],
//   ['.gid', stats.gid],
//   ['.rdev', stats.rdev],
//   ['.size', stats.size],
//   ['.blksize', stats.blksize],
//   ['.blocks', stats.blocks],
//   ['.atimeMs', stats.atimeMs],
//   ['.mtimeMs', stats.mtimeMs],
//   ['.ctimeMs', stats.ctimeMs],
//   ['.birthtimeMs', stats.birthtimeMs],
//   ['.atime', async () => `${await stats.atime()}`],
//   ['.mtime', async () => `${await stats.mtime()}`],
//   ['.ctime', async () => `${await stats.ctime()}`],
//   ['.birthtime', async () => `${await stats.birthtime()}`],
//   // ['.mtime', stats.mtime],
//   // ['.ctime', stats.ctime],
//   // ['.birthtime', stats.birthtime],
// ];

// export function toManageItAll(RDSServer: Tedis, prefix: string) {
//   {
//     return function mappingFnct(key: string) {
//       const RDSServerStage2 = RDSServerJsonSetter(RDSServer)(prefix)(key);
//       getAllStatsList(getStats(key).eachStats).map(
//         async ([jPath, getValue]: [string, any]) => {
//           const value = await getValue();
//           if (value === 'null' || value === null) {
//             return RDSServerStage2(jPath)('null');
//           }
//           if (value === 'true' || value === true) {
//             return RDSServerStage2(jPath)('true');
//           }
//           if (value === 'false' || value === false) {
//             return RDSServerStage2(jPath)('false');
//           }
//           if (typeof value === 'number') {
//             return RDSServerStage2(jPath)(`${value}`);
//           }
//           return RDSServerStage2(jPath)(`"${value}"`);
//         }
//       );
//     };
//   }
// }

// export async function getRawDirList(pathSrc: string) {
//   const dirListing: Dirent[] = await readdir(pathSrc, {
//     withFileTypes: true,
//   });
//   return dirListing;
// }

// export function getStats(pathStr: string) {
//   let stats: null | Promise<Stats> = null;

//   async function _getStats() {
//     if (stats === null) {
//       try {
//         stats = stat(pathStr);
//       } catch (error) {
//         stats = stat('/');
//         console.error('DUMMY STATS FOR PATH', pathStr);
//       }
//     }
//     return immediateZalgo(stats);
//   }

//   return {
//     allStats: async () => await _getStats(),
//     eachStats: {
//       dev: async () => (await _getStats()).dev,
//       ino: async () => (await _getStats()).ino,
//       mode: async () => (await _getStats()).mode,
//       nlink: async () => (await _getStats()).nlink,
//       uid: async () => (await _getStats()).uid,
//       gid: async () => (await _getStats()).gid,
//       rdev: async () => (await _getStats()).rdev,
//       size: async () => (await _getStats()).size,
//       blksize: async () => (await _getStats()).blksize,
//       blocks: async () => (await _getStats()).blocks,
//       atimeMs: async () => (await _getStats()).atimeMs,
//       mtimeMs: async () => (await _getStats()).mtimeMs,
//       ctimeMs: async () => (await _getStats()).ctimeMs,
//       birthtimeMs: async () => (await _getStats()).birthtimeMs,
//       atime: async () => (await _getStats()).atime,
//       mtime: async () => (await _getStats()).mtime,
//       ctime: async () => (await _getStats()).ctime,
//       birthtime: async () => (await _getStats()).birthtime,
//     },
//   };
// }

// type MyStats2 = {
//   dev: () => Promise<number>;
//   ino: () => Promise<number>;
//   mode: () => Promise<number>;
//   nlink: () => Promise<number>;
//   uid: () => Promise<number>;
//   gid: () => Promise<number>;
//   rdev: () => Promise<number>;
//   size: () => Promise<number>;
//   blksize: () => Promise<number>;
//   blocks: () => Promise<number>;
//   atimeMs: () => Promise<number>;
//   mtimeMs: () => Promise<number>;
//   ctimeMs: () => Promise<number>;
//   birthtimeMs: () => Promise<number>;
//   atime: () => Promise<Date>;
//   mtime: () => Promise<Date>;
//   ctime: () => Promise<Date>;
//   birthtime: () => Promise<Date>;
// };

// main2;
// // main2();
// async function main2() {
//   // RDSServer_
//   const [server_6382, serverStop]: [Tedis, () => void] = RDSServer_6382();
//   server_6382;
//   serverStop;
//   const stage2Mapper: (key__: string) => void = toManageItAll(
//     server_6382,
//     prefix_
//   );

//   [
//     devPaths.PATH1,
//     devPaths.PATH2,
//     // devPaths.PATH3,
//     devPaths.PATH4,
//     devPaths.PATH5,
//     devPaths.PATH6a,
//     devPaths.PATH6b,
//   ]
//     .flatMap(p => getDirsSync(p))
//     .map(k => stage2Mapper(k));
// }

//   02:32:15

// export const RDSServerJsonSetter =
//   (RDSServer: Tedis) =>
//   (prefix: string) =>
//   (keyID: string) =>
//   (jsonPath: string) =>
//   (value: string | number) =>
//     setJson({ jsonPath, prefix, keyID, value, RDSServer: RDSServer });

// ++-------------------------------------------------------------------
// const step1b = step1a
//   .map(collectionDir => {
//   console.log({ ...collectionDir, userDir: user.shortName });
//   count3;
//   return collectionDir;
// });
// ++-------------------------------------------------------------------

// ++-------------------------------------------------------------------
/**
 * for each user list contained collections full(path) and short(name)
 */
// const step1a = dirsSync.map(dir => ({
//   fullPath: `${user.fullPath}/${dir}`,
//   shortName: dir,
// }));
// ++-------------------------------------------------------------------
