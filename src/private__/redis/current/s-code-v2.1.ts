import { BoxedGenerator } from '@luxcium/boxed-list';
import { readdir } from 'fs/promises';
import { BASE_SRC_PATH1 } from '../../../constants/devPaths';
import type { RedisClientType } from '../../types';
import { isArray } from '../../utils';
import { redisCreateClient } from '../tools';
import { getFileInfos } from './getFileInfos';
import { getPathsObj } from './getPathsObj';
import { getShortWordList } from './getShortWordList';
import { stageInfos } from './stageInfos';
import { WriterTool } from './WriterTool';

// INFO:~       A or W : are AwaitLists                                         ~
// INFO:~            C : are counters                                           ~
// INFO:~            R : is RedisClient                                         ~

let STEPS: number | undefined;
let smallCount = 0;
let turns = 1000;

export const tooShort = getShortWordList(); // ['in'];
const X4D = '${X4D}';

/** COUNTERS */
const C = { u: 0, c: 0, f: 0, t: { u: 0, c: 0, f: 0 } };

const PATH = BASE_SRC_PATH1;
const PORT = 6382;
const DB_NUMBER = 0;

MAIN(PORT, DB_NUMBER, PATH);

async function MAIN(port: number, dbNumber: number, _path: string) {
  try {
    const R = redisCreateClient({ port, dbNumber });
    await R.connect();
    await Promise.all(
      (
        await getSpiderFolder(R, writerTool)(_path)
      ).flatMap(
        async item => (isArray(item) && (await Promise.all(item))) || item
      )
    ).then(async () => await R.quit());
  } catch (error) {
    console.error('at runApplication:\n\n', error);
  }
}

export function getSpiderFolder(r: RedisClientType, writerTool: WriterTool) {
  /** RedisClient */
  const R = r;
  return async function spiderFolder(folderPath: string) {
    try {
      [(C.u = 1)];
      /** AWAIT_LIST */
      const A = [];
      const users = await readdir(folderPath, {
        withFileTypes: true,
      });

      const boxedUsers = BoxedGenerator.of(...users.slice(0, STEPS));
      boxedUsers
        .map(_user => {
          if (_user.isDirectory()) return stageInfos(folderPath, _user.name);

          return;
        })
        .thenMap();
      // ---------------------------------------------------------------//!!-----
      for (const _user of users.slice(0, STEPS)) {
        try {
          if (_user.isDirectory()) {
            [C.u++, C.t.u++, (C.c = 0)];
            const [user, collections] = await stageInfos(
              folderPath,
              _user.name
            );
            A.push(R.SET(`${X4D}:PATH:USERS:${user.name}`, user.path));
            A.push(R.SADD('${X4D}:SETS:USERS', user.name));
            // ---------------------------------------------------------//!!-----
            for (const _coll of collections) {
              try {
                if (_coll.isDirectory()) {
                  [C.c++, C.t.c++, (C.f = 0)];
                  const [coll, items] = await stageInfos(user.path, _coll.name);
                  A.push(R.SET(`${X4D}:PATH:COLL:${coll.name}`, coll.path));
                  A.push(R.SADD('${X4D}:SETS:COLL:PATHS', coll.path));
                  // ---------------------------------------------------//!!-----
                  for (const _file of items) {
                    try {
                      if (_file.isFile()) {
                        const file = getPathsObj(coll.path, _file.name);
                        const countTotal = `¹${C.t.u} ²${C.t.c}(${C.c}) ³${++C.t
                          .f}(${++C.f})`;
                        A.push(
                          R.SET(`${X4D}:PATH:FILES:${file.name}`, file.path)
                        );
                        const result = writerTool(R, {
                          coll,
                          countTotal,
                          file,
                          user,
                        });
                        A.push(result);
                      }
                    } catch (error) {
                      console.error('at unfolding files:\n\n', error);
                    }
                  }
                }
              } catch (error) {
                console.error('at unfolding collections:\n\n', error);
              }
            }
          }
        } catch (error) {
          console.error('at unfolding users:\n\n', error);
        }
      }

      return Promise.all(A);
    } catch {
      console.error('at Promise.all(returnList) or in that scope');
      return [];
    }
  };
}

export async function writerTool(R: RedisClientType, options: any) {
  /** AWAIT_LIST */
  const W = [];
  const [keywords, fileInfo, o] = await getFileInfos(options);

  try {
    W.push(R.ZINCRBY('${X4D}:SETS:COLLECTIONS:FILECOUNT', 1, o.coll.name));

    if (keywords.length > 0) {
      W.push(
        Promise.allSettled(
          keywords.map((item: any) =>
            R.ZINCRBY('${X4D}:SETS:KEYWORDS:RANKING', 1, item)
          )
        )
      );
    }
  } catch (error) {
    console.error(`in unfolding files elements:`);
    console.error(
      `at R.SADD('${X4D}:SETS:KEYWORDS', ${keywords || ['']}):\n\n`,
      error
    );
    console.error('\n-----------------------------------------------\n');
  }

  const newKey = `${X4D}:INFO:${fileInfo.xDir}:${fileInfo.ext}:${fileInfo.name}`;

  smallCount++;
  if ((turns !== 0 && smallCount % turns === 1) || turns === 1) {
    console.log(fileInfo);
  }

  W.push(R.json.set(`${newKey}`, '$', fileInfo as string));
  return Promise.allSettled(/* Waiting List: */ W /* */);
}
