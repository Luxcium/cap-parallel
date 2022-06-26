import { BoxedGenerator } from '@luxcium/boxed-list';
import { statSync } from 'fs-extra';
import path from 'path';
import { devPaths } from '../../../constants/devPaths';
import {
  getDirsSync,
  getFilesAsync,
  getListing,
} from '../../file-path/tools';
import { dirListWithFileType } from '../../file-path/utils/dirListWithFileType';
import { immediateZalgo } from '../../utils';
import { redisCreateClient } from '../tools';
import { replaceStr } from './replaceStr';

const SPARK = true;
const PREFIX = '1001:TESTING:1001::JSON:REDIS';
const steps = 1;
const offset = 0;
const STEPS = [offset, offset + steps];
const DEBUG = 4;

process
  .on('uncaughtException', err => {
    console.error(err);
    process.exit(114);
  })
  .on('warning', console.warn)
  .on('error', console.warn)
  .on('message', console.info)
  .on('unhandledRejection', err => {
    console.error(err);
    setImmediate(() => process.exit(16));
  })
  .on('multipleResolves', (type, promise, reason) => {
    console.error(type, promise, reason);
    setImmediate(() => process.exit(33));
  });

const countx = {
  c1: 0,
  c2: 0,
  jsonSeted: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
};
const count = {
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
  l3: 0,
  setJ: 0,
  result: 0,
};
redisCreateClient;

const client = redisCreateClient({ host: '0.0.0.0', port: 6382 });
main;
main()
  .then(fulfilledResult => {
    if (SPARK) {
      if (DEBUG > 2) console.log('fulfilledResult.spark()');
      return fulfilledResult.spark();
    }
    if (DEBUG > 2) console.log("fulfilledResult 'NOT' spark()");
    return fulfilledResult;
  })
  .catch(error => console.error(error));
async function main() {
  await client.connect();
  // console.log(__filename);
  // const server_6382 = RDSServer_6382();
  // const jsonSet6382 = jsonSet.forFullKey(server_6382.tedis);

  const getShortKey = ({ xDir, name }: { xDir: string; name: string }) =>
    `${xDir}::${name}`;
  const withPrefix = (fInfos: { xDir: string; name: string }) =>
    `${PREFIX}:::${getShortKey(fInfos)}`;

  const fulfilled = workingFunction({ DEBUG });

  const fulfilledResult = fulfilled
    .unSparkedGen()
    .map(users => {
      if (DEBUG > 7) console.log('users: count.c3:', count.c3++);
      return users.map(collections => {
        if (DEBUG > 6) console.log('collections: count.c4:', count.c4++);
        //++  setTheSith(withPrefix, jsonSet6382, server_6382)(fInfos)
        return collections.map(async fInfos => {
          if (DEBUG > 5) console.log('fInfos: count.c6:', count.c6++);
          const fullKey = withPrefix(await fInfos);
          const jsonPath = '.';
          // const jsonSeter = jsonSet6382(fullKey)(jsonPath);
          const jsonFinfo = `${JSON.stringify(fInfos)}`;
          if (DEBUG > 5) {
            console.log({
              fullKey,
            });
          }

          if (DEBUG > 4) {
            console.log({
              jsonPath,
            });
          }

          if (DEBUG > 5) console.log({ count, countx });
          if (DEBUG > 6) {
            console.log({
              jsonFinfo,
            });
          }

          immediateZalgo;
          return (async () => {
            try {
              //++ + == == == == == == == == == == == == == == == == -->
              const timeoutScheduled = Date.now();
              const count1 = ++count.c5;
              setTimeout(() => {
                const delay = Date.now() - timeoutScheduled;

                if (count1 % 1000 === 1) {
                  console.log(
                    `BEFORE) ${delay}ms have passed since I was scheduled ${count1}`
                  );
                }
              }, 100);
              count.setJ++;
              const setJ = count.setJ;
              console.log('just before will json set', count.setJ, setJ);
              const jsonSeted = await client.json.set(
                fullKey,
                jsonPath,
                jsonFinfo
              );
              const timeoutScheduled2 = Date.now();

              setTimeout(() => {
                const delay = Date.now() - timeoutScheduled2;
                if (count1 % 1000 === 1) {
                  console.log(
                    `AFTER) ${delay}ms have passed since I was scheduled ${count1}`
                  );
                }
              }, 100);
              countx.jsonSeted++;
              //++ + == == == == == == == == == == == == == == == == -->
              const result = await client.json.get(fullKey);
              count.result++;
              const resCnt = count.result;
              if (DEBUG > 4) console.log('jsonSetted:', resCnt);
              if (DEBUG > 3) {
                console.log('jsonSetted:', {
                  jsonSeted,
                  jsonPath,
                  fullKey: DEBUG > 5 ? fullKey : null,
                  result: DEBUG > 4 ? result : null,
                  resultCount: count.result,
                  countx,
                  count,
                });
              }

              return { fullKey, jsonSeted };
            } catch (error) {
              console.error('error:', error, {
                fullKey,
                jsonSeted: error,
                jsonPath,
                jsonFinfo,
              });
              if (DEBUG > 1) console.error('jsonFinfo:', jsonFinfo);
              // client.quit();
              return setImmediate(() => process.exit(28));
            }
          })();
        });
      });
    })
    .map(l1 => {
      count.c1++;
      if (DEBUG > 2) console.log('L1: count.c1:', count.c1);
      return l1
        .map(l2 => {
          count.c2++;
          if (DEBUG > 2) console.log('L2: count.c2:', count.c2);
          return l2.map(async l3 => {
            count.l3++;
            if (DEBUG > 3) console.log(count.l3, 'l3:', await l3);
            return l3;
          });
        })
        .map(async l2 => {
          // if (DEBUG > 5) console.log('l2.spark()');
          return l2.spark();
        });
    })
    .map(l1 => {
      if (DEBUG > 2) console.log('l1.spark()');
      return l1.spark();
    });
  if (DEBUG > 2) console.log('will fulfilledResult.spark()');

  return fulfilledResult;
}

function workingFunction(opts: { DEBUG: number }) {
  const pathToShorten = devPaths.X004Da;
  const shorthenTo = '${X004D}';
  const srtPath = replaceStr(pathToShorten, shorthenTo);
  countx.c1++;
  if (DEBUG > 1) console.log('workingFunction:', countx.c1);
  let count = 0;
  let count2 = 0;
  let count3 = 0;

  const userPathsGen = BoxedGenerator.of(
    ...[devPaths.PATH1]
      .flatMap(p => {
        countx.c2++;
        if (DEBUG > 2) console.log('userPathsGen:', countx.c2);

        return getDirsSync(p).map(dir => {
          return {
            fullPath: `${p}/${dir}`,
            shortName: dir,
          };
        });
      })
      .slice(...STEPS)
  );

  const collectionsPathsGen = userPathsGen.map(user => {
    const dirsSync = BoxedGenerator.of(...getDirsSync(user.fullPath));
    const length = dirsSync.length;
    ++count;
    count2 += length;
    if (DEBUG > 4) {
      console.log(
        'collectionsPathsGen:',
        countx.c4++,
        'dirsSync.length',
        length
      );
    }

    const collectionLevelGen = dirsSync.map(dir => {
      if (DEBUG > 4) console.log('collectionLevelGen:', countx.c5++);

      const collctn = {
        fullPath: `${user.fullPath}/${dir}`,
        shortName: dir,
      };

      const somedirListWithFileTypeSync = [
        ...dirListWithFileType(collctn.fullPath),
      ];

      const listings = getListing(collctn.fullPath); // getListings
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
        const fileInfo = immediateZalgo({
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
        });

        if (opts.DEBUG > 1) {
          (async () => console.log(`${f}:`, await fileInfo))();
        }

        return fileInfo;
      });

      return filesInfoGenerator;
    });

    return collectionLevelGen;
    // return user.full;
  });

  const sparkedStatus = {
    unSparkedGen: false,
    sparkedGen: false,
    inerGen: false,
    inermostGen: false,
  };

  // const inerMostSparkedGen = () =>
  //   collectionsPathsGen.map(iner =>
  //     iner.map(inermost => {
  //       sparkedStatus.inermostGen = true;
  //       return inermost.spark();
  //     })
  //   );

  // const inerSparkedGen = () =>
  //   inerMostSparkedGen().map(iner => {
  //     sparkedStatus.inerGen = true;
  //     return iner.spark();
  //   });

  // const spark = () => {
  //   sparkedStatus.sparkedGen = true;
  //   return inerSparkedGen().spark();
  // };
  const unSparkedGen = () => {
    sparkedStatus.unSparkedGen = true;
    return collectionsPathsGen;
  };
  return {
    unSparkedGen,
    // inerMostSparkedGen,
    // inerSparkedGen,
    // spark,
    // sparkedStatus,
  };
}

/*
          docker run -d -p 6382:6379 --name=Redis_JSON_6382 -l=redis redislabs/rejson:latest redis-server --save 60 1 --loglevel debug --loadmodule /usr/lib/redis/modules/rejson.so --loadmodule /usr/lib/redis/modules/redisearch.so

// ++ (c) Simon Prickett 2022 mit
import { readdir, readFile } from 'fs/promises';
import { createClient } from 'redis';

async function spiderFolder(folderPath, redisClient) {
  const dirEntries = await readdir(folderPath, {
    withFileTypes: true
  });

  for (const dirEntry of dirEntries) {
    if (dirEntry.isDirectory()) {
      await spiderFolder(`${folderPath}/${dirEntry.name}`, redisClient);
    } else if (dirEntry.isFile()) {
      const filePath = `${folderPath}/${dirEntry.name}`;
      const fileContents = await readFile(filePath);
      await redisClient.json.set(`file:${filePath}`, '$', JSON.parse(fileContents));
      console.log(filePath);
      console.log(fileContents.toString());
    }
  }
};

async function runApplication() {
  try {
    const client = createClient();
    await client.connect(); // localhost:6379

    await spiderFolder('data', client);

    await client.disconnect();
  } catch (e) {
    console.error(e);
  }
};

runApplication();
[17:16]
$ node spider.js
data/folder1/file1.json
{ "name": "file1.json" }
data/folder1/file2.json
{ "name": "file2.json" }
data/folder2/file3.json
{ "name": "file3.json" }
data/folder2/file4.json
{ "name": "file4.json" }
data/folder3/file5.json
{ "name": "file5.json" }
data/folder3/file6.json
{ "name": "file6.json" }
spider $ redis-cli
127.0.0.1:6379> keys file:*
1) "file:data/folder2/file3.json"
2) "file:data/folder1/file2.json"
3) "file:data/folder3/file6.json"
4) "file:data/folder1/file1.json"
5) "file:data/folder3/file5.json"
6) "file:data/folder2/file4.json"
127.0.0.1:6379> json.get file:data/folder1/file2.json $
"{\"name\":\"file2.json\"}"
 */
