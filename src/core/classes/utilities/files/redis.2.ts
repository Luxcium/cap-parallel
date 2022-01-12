import { stat } from 'fs/promises';
import path from 'path';
import { Tedis } from 'tedis';
import { immediateZalgo } from '..';
import { BoxedAsyncGenerator, BoxedGenerator } from '../..';
import { getNewTedis, getTedisTools } from '../redis';
import { BASE_SRC_PATH5 } from './devePaths';
import { getDirs } from './fs';
import { getDirListing } from './getDirListing';

export const REDIS_PREFIX = 'JSON::GBT_PATH::';

tedisStuff(BASE_SRC_PATH5, getNewTedis(6382));

export async function tedisStuff(path_: string, tedis: Tedis) {
  const dirList = getDirs(path_);
  const {
    json: { get, set, init },
  } = getTedisTools();
  get;
  set;
  init;

  const aGenBox = BoxedGenerator.of(...dirList.slice(0)).map(dirname_ => {
    counts.a1++;
    console.log(counts);
    const [key, pathStr] = [
      `${REDIS_PREFIX}::${dirname_}`,
      `${path_}/${dirname_}`,
    ];
    return [key, pathStr];
  });
  const bGenBox = aGenBox.map(async ([key, pathStr]) => {
    const tSet = set(key);
    const init = await tedis.command('JSON.SET', key, '.', `{}`);

    const dirname = await tSet('.dirname')(fnParse(path.dirname(pathStr)));
    const extname = await tSet('.extname')(fnParse(path.extname(pathStr)));

    const abs = fnParse(path.isAbsolute(pathStr));
    const isAbsolute = await tSet('.isAbsolute')(abs);

    const norml = fnParse(path.normalize(pathStr));
    const normalize = await tSet('.normalize')(norml);

    const parse = await tSet('.parse')(fnParse(path.parse(pathStr)));

    const toNsp = fnParse(path.toNamespacedPath(pathStr));
    const toNamespacedPath = await tSet('.toNamespacedPath')(toNsp);

    const basename = await tSet('.basename')(fnParse(path.basename(pathStr)));

    const delimiter = await tSet('.delimiter')(fnParse(path.delimiter));

    const sep = await tSet('.sep')(fnParse(path.sep));

    console.log({
      init,
      dirname,
      extname,
      isAbsolute,
      normalize,
      parse,
      toNamespacedPath,
      basename,
      delimiter,
      sep,
    });

    const stats = await stat(pathStr);
    const isDirectory = await tSet('.isDirectory')(
      fnParse(stats.isDirectory().toString())
    );
    const isFile = await tSet('.isFile')(fnParse(stats.isFile().toString()));
    const isBlockDevice = await tSet('.isBlockDevice')(
      fnParse(stats.isBlockDevice().toString())
    );
    const isCharacterDevice = await tSet('.isCharacterDevice')(
      fnParse(stats.isCharacterDevice().toString())
    );
    const isFIFO = await tSet('.isFIFO')(fnParse(stats.isFIFO().toString()));
    const isSocket = await tSet('.isSocket')(
      fnParse(stats.isSocket().toString())
    );
    const isSymbolicLink = await tSet('.isSymbolicLink')(
      fnParse(stats.isSymbolicLink().toString())
    );

    console.log({
      isDirectory,
      isFile,
      isBlockDevice,
      isCharacterDevice,
      isFIFO,
      isSocket,
      isSymbolicLink,
    });
    // const fileDetails = await getFilesDetails(path_);
    // fileDetails;
    //  */
    //   return a;
    // });
    // const cGenBox = (await timeoutZalgo(1, bGenBox)).map(async a => {
    counts.c1++;
    console.log(counts);
    // const tedis = getNewTedis();
    // const result = (await tedis.command(...b)) as string;
    // counts.c2++;
    // console.log(counts);
    // console.log(counts);
    // nextTickZalgo();
    // const x = result;
    // return tedis.close();

    // return x;
    // });

    // const dGenBox = (await timeoutZalgo(1, cGenBox)).map(async x => {
    // counts.d1++;
    // console.log(counts);
    // const awaitedX = x;
    // counts.d2++;
    // console.log(counts, awaitedX);
  });

  await Promise.all((await immediateZalgo(bGenBox)).unbox());
  // return;
  return tedis.close();
}
// BoxedAsyncGenerator

const counts = {
  a1: 0,
  b1: 0,
  c1: 0,
  // d1: 0,
  // b2: 0,
  // c2: 0,
  // d2: 0,
};
void BoxedGenerator;
void BoxedAsyncGenerator;

export async function getStat(pathStr: string) {
  const dirname = path.dirname(pathStr);
  const extname = path.extname(pathStr);
  const isAbsolute = path.isAbsolute(pathStr);
  const normalize = path.normalize(pathStr);
  const parse = path.parse(pathStr);
  const toNamespacedPath = path.toNamespacedPath(pathStr);
  const basename = path.basename(pathStr);
  const delimiter = path.delimiter;
  const sep = path.sep;
  // + -----------------------------------------------------------------
  const fileDetails = await getDirListing(pathStr);
  // + -----------------------------------------------------------------
  const stats = await stat(pathStr);
  const isDirectory = stats.isDirectory();
  const isFile = stats.isFile();
  const isBlockDevice = stats.isBlockDevice();
  const isCharacterDevice = stats.isCharacterDevice();
  const isFIFO = stats.isFIFO();
  const isSocket = stats.isSocket();
  const isSymbolicLink = stats.isSymbolicLink();

  const {
    fileDetailsLength,
    // fileDetails,
    base,
    // basename,
    blksize,
    blocks,
    // delimiter,
    dev,
    ext,
    // extname,
    gid,
    ino,
    mode,
    name,
    nlink,
    rdev,
    root,
    // sep,
    size,
    uid,
    // isFile,
    // isFIFO,
    // isSocket,
    // isAbsolute,
    // isDirectory,
    // isBlockDevice,
    // isSymbolicLink,
    // isCharacterDevice,
    mtimeMs,
    atimeMs,
    ctimeMs,
    atime,
    birthtimeMs,
    ctime,
    mtime,
    birthtime,
    dir,
    // dirname,
    // normalize,
    // toNamespacedPath,
  } = {
    ...stats,
    isDirectory,
    isFile,
    isBlockDevice,
    isCharacterDevice,
    isFIFO,
    isSocket,
    isSymbolicLink,
    delimiter,
    // posix,
    sep,
    // win32,
    dirname,
    extname,
    isAbsolute,
    normalize,
    ...parse,
    toNamespacedPath,
    basename,
    fileDetailsLength: fileDetails.length,
    fileDetails,
  } as any;
  return {
    isFile,
    isFIFO,
    isSocket,
    isAbsolute,
    isDirectory,
    isBlockDevice,
    isSymbolicLink,
    isCharacterDevice,
    atimeMs,
    birthtimeMs,
    ctimeMs,
    mtimeMs,
    atime,
    birthtime,
    ctime,
    mtime,
    dir,
    dirname,
    normalize,
    toNamespacedPath,
    base,
    basename,
    blksize,
    blocks,
    delimiter,
    dev,
    ext,
    extname,
    gid,
    ino,
    mode,
    name,
    nlink,
    rdev,
    root,
    sep,
    size,
    uid,
    fileDetailsLength,
    fileDetails,
  };
}

function fnParse<T>(txt: T) {
  return `"${txt}"`.replace('\\', '\\\\');
}

// timeoutZalgo(1000, tedis.command('JSON.GET', key, '.'))
// const toJsonRedis = path.dirname(basePath_).toString();
// console.log('toJsonRedis:', `'"${toJsonRedis}"'`);
// const dirname = await tedis.command(
//   'JSON.SET',
//   key,
//   '.dirname',
//   `'"${toJsonRedis}"'`
// );

// const extname = await tedis.command(
//   'JSON.SET',
//   key,
//   '.extname',
//   toJsonRedis
// );
