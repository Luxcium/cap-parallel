import { BoxedGenerator } from '@luxcium/boxed-list';
import path from 'path';
import { getDirsSync, getFilesAsync } from '../../file-path/tools';
import { getUserPathsGen } from './getUserPathsGen';
import { srtPath } from './srtPath';
import { withPrefix } from './withPrefix';

const PREFIX = 'TESTING:001::JSON:REDIS';
const STEPS = 100_000;
let COUNT = 0;

main();
function main() {
  // -------------------------------------------------------------------//!!-----
  // → UserList (u1 or l1) Level 1
  // → → ColectionList (c2 or l2) Level 2
  // → → → FilesList (f3) Level 3
  // → → → → sFnct(f) --> only console.log for now should redis.json.set
  // ++ MAGIC MOMENT IS HERE -------------------------------------------
  return workingFunction()
    .unSparkedGen()
    .map(u1 => u1.map(c2 => c2.map(f3 => sFnct()(f3))))
    .map(l1 => l1.map(l2 => l2.spark()))
    .map(l1 => l1.spark())
    .spark();
}

function sFnct() {
  return (fInfos: any) => {
    const fullKey = withPrefix(PREFIX)(fInfos);
    const jsonPath = '.';
    const jsonFinfo = `${JSON.stringify(fInfos)}`;
    try {
      // -------------------------------------------------------------//!!-----
      // LOG: MAIN LOGGER ////////////////////////////////////////++ +
      console.log({ fullKey, jsonPath, fInfos, count: ++COUNT });
    } catch (error) {
      console.error({
        fullKey,
        jsonSeted: error,
        jsonPath,
        jsonFinfo,
      });
    }
  };
}

function workingFunction() {
  // -------------------------------------------------------------------//!!-----
  // ++ USERS PATH GENERATION ------------------------------------------
  const userPathsGen = BoxedGenerator.of(...getUserPathsGen(STEPS));

  // -------------------------------------------------------------------//!!-----
  // ++ USERS LEVEL ----------------------------------------------------
  const collectionsPathsGen = userPathsGen.map(user => {
    const dirsSync = BoxedGenerator.of(...getDirsSync(user.fullPath));

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
