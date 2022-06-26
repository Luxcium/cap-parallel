import { BoxedGenerator } from '@luxcium/boxed-list';
import path from 'path';
import { devPaths } from '../../../constants/devPaths';
import { getDirsSync, getFilesAsync } from '../../file-path/tools';
import { immediateZalgo } from '../../utils';
import { replaceStr } from './replaceStr';

const PREFIX = 'TESTING:001::JSON:REDIS';
const STEPS = 1;
const DEBUG = 1;
let COUNT = 0;

function setTheSith() {
  const getShortKey = ({ xDir, name }: { xDir: string; name: string }) =>
    `${xDir}::${name}`;
  const withPrefix = (fInfos: { xDir: string; name: string }) =>
    `${PREFIX}:::${getShortKey(fInfos)}`;

  return async (fInfos: any) => {
    const fullKey = withPrefix(fInfos);
    const jsonPath = '.';
    // const jsonSeter = jsonSet6382(fullKey)(jsonPath);
    const jsonFinfo = `${JSON.stringify(fInfos)}`;

    return (() => {
      try {
        // console.log('inside setTheSith at fInfos');

        void immediateZalgo, jsonFinfo;
        // LOG: MAIN LOGGER //++ !\!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log({ fullKey, jsonPath, fInfos, count: ++COUNT });
      } catch (error) {
        console.error({
          fullKey,
          jsonSeted: error,
          jsonPath,
          jsonFinfo,
        });
      }
    })();
  };
}
main;
main().then(fulfilledResult => fulfilledResult.spark());
async function main() {
  const fulfilled = await workingFunction({ DEBUG });

  const fulfilledResult = fulfilled
    .unSparkedGen()
    .map(users => {
      return users.map(collections => {
        return collections.map(
          fInfos => setTheSith()(fInfos)
          // fInfos
        );
      });
    })
    .map(l1 => {
      return l1
        .map(l2 => {
          return l2.map(l3 => {
            return l3;
          });
        })
        .map(l2 => {
          return l2.spark();
        });
    })
    .map(l1 => {
      return l1.spark();
    });

  return fulfilledResult;
}

async function workingFunction(opts: { DEBUG: number }) {
  const { X004Da, X004Db } = devPaths;
  const shorthenTo = '${X004D}';
  const srtPath = (testString: string) =>
    replaceStr(X004Da, shorthenTo)(replaceStr(X004Db, shorthenTo)(testString));

  opts;
  const userPathsGen = BoxedGenerator.of(
    ...[devPaths.PATH1]
      .flatMap(p => {
        return getDirsSync(p).map(dir => {
          // console.log('getDirsSync:', countx.c3++);

          return {
            fullPath: `${p}/${dir}`,
            shortName: dir,
          };
        });
      })
      .slice(0, STEPS)
  );

  // -------------------------------------------------------------------//!!-----
  // ++ USERS LEVEL ----------------------------------------------------
  const collectionsPathsGen = userPathsGen.map(user => {
    const dirsSync = BoxedGenerator.of(...getDirsSync(user.fullPath));
    // const length = dirsSync.length;

    // -----------------------------------------------------------------//!!-----
    // ++ COLLECTION LEVEL ---------------------------------------------
    const collectionLevelGen = dirsSync.map(dir => {
      const collctn = {
        fullPath: `${user.fullPath}/${dir}`,
        shortName: dir,
      };

      /**
       * for each collections list contained files f
       */
      // ---------------------------------------------------------------//!!-----
      // ++ INNERMOST: FILLES LEVEL ------------------------------------
      const filesPathsGen = BoxedGenerator.of(
        ...getFilesAsync(collctn.fullPath)
      );
      // ---------------------------------------------------------------//!!-----
      const filesInfoGenerator = filesPathsGen.map(f => {
        const pathStr = `${collctn.fullPath}/${f}`;
        const parsed = path.parse(pathStr);
        const dir = srtPath(parsed.dir);
        return {
          user: user.shortName,
          collectionName: collctn.shortName,
          fileName: f,
          ...parsed,
          dir,
          xDir: collctn.shortName
            .split('-')
            .filter(csn => csn !== '')
            .slice(-1)[0],
        };
      });

      return filesInfoGenerator;
    });

    return collectionLevelGen;
  });

  const unSparkedGen = () => {
    return collectionsPathsGen;
  };
  return {
    unSparkedGen,
  };
}
