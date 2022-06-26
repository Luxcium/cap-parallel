import type { PlatformPath } from 'path';
import { ParsedPath } from 'path';
import { Tedis } from 'tedis';
import { devPaths } from '../../constants/devPaths';

import { fsTools } from '../file-path/tools';
import { DirentWithFileType } from '../file-path/types';
import { dirListWithFileType } from '../file-path/utils/dirListWithFileType';
import { MyPInfos, MyStats, RedisJson_InfoGetterFunct } from '../types';
import { immediateZalgo } from '../utils';
import { getPathStatsInfos } from './tools';
import { tedis_jsonGet, tedis_jsonSet } from './tools/tedis_json';

const CLOSE = 'close';
const PREFIX = 'TESTING:JSON:REDIS';
const JSON_ROOT = '.';
const redisKey = 'test001';
const jsonPath = JSON_ROOT;
const value = '{"pommes":[1,2,3,4,5]}';

const testJsonRedis = tedis_jsonSet(PREFIX);
const test_rootJsonRedis = testJsonRedis(jsonPath);
const rootJsonRedis = test_rootJsonRedis(new Tedis({ port: 6382 }));
const atTest001 = rootJsonRedis(redisKey);

const setValue =
  (val: string) =>
  (close: 'close' | boolean = false) =>
    atTest001(val, close);

(async () => console.log(await setValue(value)(CLOSE)))();

const testJsonRedis_getter = tedis_jsonGet(PREFIX);
const rootTestJsonRedis_getter = testJsonRedis_getter(jsonPath);
const nameit = rootTestJsonRedis_getter(new Tedis({ port: 6382 }));
const getValue = (close: 'close' | boolean = false) => nameit(redisKey, close);

(async () => console.log(await getValue('close')))();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export function nameMeLater<T>(pathStatsGetter: RedisJson_InfoGetterFunct<T>) {
  return <U extends string | MyStats | MyPInfos>(p: U) =>
    (RDSServer: Tedis) =>
    (key: string) =>
      (async () => {
        const [jsonPath_, toGetInfo] = pathStatsGetter(p);
        try {
          return await testJsonRedis(jsonPath_)(RDSServer)(key)(
            `${await toGetInfo()}`
          );
        } catch (error) {
          console.error(
            'Silently failling \n',
            error,
            '\n Must Implement Catch clause'
          );
          // throw new Error('Must Implement Catch clause');
          return null;
        }
      })();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const tedis_jsonSet_ = async <R>(
  prefix: string,
  jsonPath: string,
  RDSServer: Tedis,
  key: string,
  value: string | number | Date,
  close: 'close' | boolean = false
): Promise<R> =>
  RDSServer.command('JSON.SET', `${prefix}::${key}`, jsonPath, `${value}`).then(
    (result: R) => {
      close === 'close' || close ? RDSServer.close() : null;
      return result;
    }
  );
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const {
  get_atime,
  get_atimeMs,
  get_birthtime,
  get_birthtimeMs,
  get_blksize,
  get_blocks,
  get_ctime,
  get_ctimeMs,
  get_delimiter,
  get_dev,
  get_dirList,
  get_dirname,
  get_extname,
  get_gid,
  get_ino,
  get_isAbsolute,
  get_mode,
  get_mtime,
  get_mtimeMs,
  get_nlink,
  get_normalized,
  get_parsed,
  get_posix,
  get_rdev,
  get_sep,
  get_size,
  get_toNamespacedPath,
  get_uid,
  get_win32,
  getPathInfos,
  getStats,
} = getPathStatsInfos;
getPathInfos;
getStats;

const statsFor = (pathStr: string) => getStats(pathStr);
const statsForPATH6b = statsFor(devPaths.PATH6b);
statsForPATH6b;
// nameMeLater(get_atime);
get_atime;
get_atimeMs;
get_birthtime;
get_birthtimeMs;
get_blksize;
get_blocks;
get_ctime;
get_ctimeMs;
get_delimiter;
get_dev;
get_dirList;
get_dirname;
get_extname;
get_gid;
get_ino;
get_isAbsolute;
get_mode;
get_mtime;
get_mtimeMs;
get_nlink;
get_normalized;
get_parsed;
get_posix;
get_rdev;
get_sep;
get_size;
get_toNamespacedPath;
get_uid;
get_win32;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// File System

export function getEachStats(path_str: string) {
  const stats = fsTools.getStats(path_str);
  const pInfos = fsTools.getPathInfos(path_str);

  return [
    ['.dirname', async (): Promise<string> => immediateZalgo(pInfos.dirname())],
    ['.extname', async (): Promise<string> => immediateZalgo(pInfos.extname())],
    [
      '.normalized',
      async (): Promise<string> => immediateZalgo(pInfos.normalized()),
    ],
    [
      '.toNamespacedPath',
      async (): Promise<string> => immediateZalgo(pInfos.toNamespacedPath()),
    ],
    ['.sep.', async (): Promise<string> => immediateZalgo(pInfos.sep())],
    [
      '.delimiter.',
      async (): Promise<string> => immediateZalgo(pInfos.delimiter()),
    ],
    ['.dev', async (): Promise<number> => stats.dev()],
    ['.ino', async (): Promise<number> => stats.ino()],
    ['.mode', async (): Promise<number> => stats.mode()],
    ['.nlink', async (): Promise<number> => stats.nlink()],
    ['.uid', async (): Promise<number> => stats.uid()],
    ['.gid', async (): Promise<number> => stats.gid()],
    ['.rdev', async (): Promise<number> => stats.rdev()],
    ['.size', async (): Promise<number> => stats.size()],
    ['.blksize', async (): Promise<number> => stats.blksize()],
    ['.blocks', async (): Promise<number> => stats.blocks()],
    ['.atimeMs', async (): Promise<number> => stats.atimeMs()],
    ['.mtimeMs', async (): Promise<number> => stats.mtimeMs()],
    ['.ctimeMs', async (): Promise<number> => stats.ctimeMs()],
    ['.birthtimeMs', async (): Promise<number> => stats.birthtimeMs()],
    ['.mtime', async (): Promise<Date> => stats.mtime()],
    ['.ctime', async (): Promise<Date> => stats.ctime()],
    ['.atime', async (): Promise<Date> => stats.atime()],
    ['.birthtime', async (): Promise<Date> => stats.birthtime()],
    [
      '.isAbsolute',
      async (): Promise<boolean> => immediateZalgo(pInfos.isAbsolute()),
    ],
    [
      '.parsed',
      async (): Promise<ParsedPath> => immediateZalgo(pInfos.parsed()),
    ],
    [
      '.dirList',
      async (): Promise<DirentWithFileType[]> => dirListWithFileType(path_str),
    ],
    [
      '.posix.',
      async (): Promise<PlatformPath> => immediateZalgo(pInfos.posix()),
    ],
    [
      '.win32.',
      async (): Promise<PlatformPath> => immediateZalgo(pInfos.win32()),
    ],
  ];
}

export function getEachStats2(path_str: string) {
  const stats = fsTools.getStats(path_str);
  const pInfos = fsTools.getPathInfos(path_str);

  const dirname = [
    '.dirname',
    async (): Promise<string> => immediateZalgo(pInfos.dirname()),
  ];
  const extname = [
    '.extname',
    async (): Promise<string> => immediateZalgo(pInfos.extname()),
  ];
  const normalized = [
    '.normalized',
    async (): Promise<string> => immediateZalgo(pInfos.normalized()),
  ];
  const toNamespacedPath = [
    '.toNamespacedPath',
    async (): Promise<string> => immediateZalgo(pInfos.toNamespacedPath()),
  ];
  const sep = [
    '.sep.',
    async (): Promise<string> => immediateZalgo(pInfos.sep()),
  ];
  const delimiter = [
    '.delimiter.',
    async (): Promise<string> => immediateZalgo(pInfos.delimiter()),
  ];
  const dev = ['.dev', async (): Promise<number> => stats.dev()];
  const ino = ['.ino', async (): Promise<number> => stats.ino()];
  const mode = ['.mode', async (): Promise<number> => stats.mode()];
  const nlink = ['.nlink', async (): Promise<number> => stats.nlink()];
  const uid = ['.uid', async (): Promise<number> => stats.uid()];
  const gid = ['.gid', async (): Promise<number> => stats.gid()];
  const rdev = ['.rdev', async (): Promise<number> => stats.rdev()];
  const size = ['.size', async (): Promise<number> => stats.size()];
  const blksize = ['.blksize', async (): Promise<number> => stats.blksize()];
  const blocks = ['.blocks', async (): Promise<number> => stats.blocks()];
  const atimeMs = ['.atimeMs', async (): Promise<number> => stats.atimeMs()];
  const mtimeMs = ['.mtimeMs', async (): Promise<number> => stats.mtimeMs()];
  const ctimeMs = ['.ctimeMs', async (): Promise<number> => stats.ctimeMs()];
  const birthtimeMs = [
    '.birthtimeMs',
    async (): Promise<number> => stats.birthtimeMs(),
  ];
  const mtime = ['.mtime', async (): Promise<Date> => stats.mtime()];
  const ctime = ['.ctime', async (): Promise<Date> => stats.ctime()];
  const atime = ['.atime', async (): Promise<Date> => stats.atime()];
  const birthtime = [
    '.birthtime',
    async (): Promise<Date> => stats.birthtime(),
  ];
  const isAbsolute = [
    '.isAbsolute',
    async (): Promise<boolean> => immediateZalgo(pInfos.isAbsolute()),
  ];
  const parsed = [
    '.parsed',
    async (): Promise<ParsedPath> => immediateZalgo(pInfos.parsed()),
  ];
  const dirList = [
    '.dirList',
    async (): Promise<DirentWithFileType[]> => dirListWithFileType(path_str),
  ];
  const posix = [
    '.posix.',
    async (): Promise<PlatformPath> => immediateZalgo(pInfos.posix()),
  ];
  const win32 = [
    '.win32.',
    async (): Promise<PlatformPath> => immediateZalgo(pInfos.win32()),
  ];
  return {
    dirname,
    extname,
    normalized,
    toNamespacedPath,
    sep,
    delimiter,
    dev,
    ino,
    mode,
    nlink,
    uid,
    gid,
    rdev,
    size,
    blksize,
    blocks,
    atimeMs,
    mtimeMs,
    ctimeMs,
    birthtimeMs,
    mtime,
    ctime,
    atime,
    birthtime,
    isAbsolute,
    parsed,
    dirList,
    posix,
    win32,
  };
}

/*
string
number
Date
boolean
ParsedPath
PlatformPath
DirentWithFileType[]
    pathInfos.dirname
    pathInfos.extname
    pathInfos.isAbsolute
    pathInfos.normalized
    pathInfos.parsed
    pathInfos.toNamespacedPath
    posix: path.PlatformPath;
    sep: string;
    win32: path.PlatformPath;
    delimiter: string;
    pBasename: (p: string, ext?: string | undefined) => string;
    pFormat: (pP: path.FormatInputPathObject) => string;
    pJoin: (...paths: string[]) => string;
    pRelative: (from: string, to: string) => string;
    pResolve: (...pathSegments: string[]) => string;
   */
// getStats;
// getPathInfos;
// getRawDirList; //*
// getDirListWithFileType; //*
// asyncDirListWithFileType;

/*
const PREFIX_JsonRedis = tedis_jsonSet(PREFIX)
const PREFIX_JsonPath = PREFIX_JsonRedis(jsonPath)
activate [...]
key
value
then --> set !

    dirname // : () => string;
    extname // : () => string;
    isAbsolute // : () => boolean;
    normalized // : () => string;
    parsed // : () => path.ParsedPath;
    toNamespacedPath // : () => string;
    posix // : path.PlatformPath;
    sep // : string;
    win32 // : path.PlatformPath;
    delimiter // : string;
    pBasename // : (p // : string, ext? // : string | undefined) => string;
    pFormat // : (pP // : path.FormatInputPathObject) => string;
    pJoin // : (...paths // : string[]) => string;
    pRelative // : (from // : string, to // : string) => string;
    pResolve // : (...pathSegments: string[]) => string;

  name: string;
  isBlockDevice: boolean;
  isCharacterDevice: boolean;
  isDirectory: boolean;
  isFIFO: boolean;
  isFile: boolean;
  isSocket: boolean;
  isSymbolicLink: boolean;
*/

// xR_recette
// xI_Ingredient
// xI_Ingredient
/*
A recipe is a set of instructions that describes how to prepare or make
something, especially a dish of prepared food.
https://en.wikipedia.org/wiki/Recipe

# Modern culinary recipes normally consist of several components
+ The name of the recipe (Origins/History of the dish)
+ Yield: The number of servings that the dish provides.
+ List all ingredients in the order of its use. Describe it in step by step instructions.
+ Listing ingredients by the quantity (Write out abbreviations. Ounces instead of oz).
+ How much time does it take to prepare the dish, plus cooking time for the dish.
+ Necessary equipment used for the dish.
+ Cooking procedures. Temperature and bake time if necessary.
+ Serving procedures (Served while warm/cold).
+ Review of the dish (Would you recommend this dish to a friend?).
+ Nutritional Value: Helps for dietary restrictions. Includes number of calories or grams per serving.
+ Photograph of the dish (Optional).

recipes
procedures

directives
mandates

constituents
intrants
inputs

element
item
nominal

list
listing
deck


additive
constituent
element
factor
fixing
fundamental
innards
inputs
integral
integrant
intrants
making
parcel
part
part
piece


blueprint
formula
likely cause of
means
means/way of achieving
means/way of ensuring
method
MO
modus operandi
plan
prescription
procedure
process
source of
system
technique
way


? Earlier recipes often included much less information, serving more as a reminder of ingredients and proportions for someone who already knew how to prepare the dish.

Recipe writers sometimes also list variations of a traditional dish, to give different tastes of the same recipes.

instruction
Similar words

A to Z
ABC
andragogy
behest
bible
bidding
booklet
charge
classes
coaching
command
commandment
companion
decree
demand
dictate
diktat
direction
directions
directive
discipline
drill
drilling
edict
edification
education
enchiridion
enlightenment
grounding
guidance
guide
handbook
information
injunction
key
lectures
lessons
mandate
manual
order
pedagogy
preparation
priming
pronouncement
recipe
reference manual
requirement
rescript
ruling
say-so
schooling
specification
stipulation
subpoena
summons
teaching
training
tuition
tutelage
tutorials
tutoring
vade mecum
warrant
writ
 */
