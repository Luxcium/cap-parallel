import { readdir, stat } from 'fs/promises';
import path from 'path';
import { createClient } from 'redis';
import { BASE_SRC_PATH1, devPaths } from '../../../constants/devPaths';
import { redisConnectionString } from '../tools';
import { replaceStr } from './replaceStr';

type RedisClientType = ReturnType<typeof createClient>;
type WriterTool = (
  redisClient: RedisClientType,
  filePath: string
) => Promise<'OK' | null>;

export function getSpiderFolder(
  redisClient: RedisClientType,
  writerTool: WriterTool
) {
  return async function spiderFolder(folderPath: string) {
    const dirEntries = await readdir(folderPath, {
      withFileTypes: true,
    });

    for (const dirEntry of dirEntries) {
      if (dirEntry.isDirectory()) {
        await spiderFolder(`${folderPath}/${dirEntry.name}`);
      } else if (dirEntry.isFile()) {
        const filePath = `${folderPath}/${dirEntry.name}`;
        await writerTool(redisClient, filePath);
      }
    }
  };
}

export const WriterTool: WriterTool = async (
  redisClient: RedisClientType,
  filePath: string
) => {
  const { X004Da, X004Db } = devPaths;
  const shorthenTo = '${X004D}';
  const srtPath = (testString: string) =>
    replaceStr(X004Db, shorthenTo)(replaceStr(X004Da, shorthenTo)(testString));
  const pathStr = filePath;
  const stats = await stat(filePath);
  const dirname = srtPath(path.dirname(pathStr));
  const shortFilePath = srtPath(filePath);
  const parsed = path.parse(pathStr);

  const displaycount = `¹${'dummy'} ²${'dummy'} ³${'dummy'}`;
  const infosAboutFile = {
    ...stats,
    dirname,
    extname: path.extname(pathStr),
    isAbsolute: path.isAbsolute(pathStr),
    normalized: srtPath(path.normalize(pathStr)),
    ...parsed,
    dir: srtPath(parsed.dir),
    displaycount,
  };
  // console.log(shortFilePath);
  console.log(infosAboutFile);

  const result = await redisClient.json.set(
    `file:${shortFilePath}`,
    '$',
    infosAboutFile as any as string
  );

  return result;
};

async function runApplication(port: number, _path: string) {
  try {
    const client = createClient(redisConnectionString({ port }));
    await client.connect();

    const spiderFolder = getSpiderFolder(client, WriterTool);
    await spiderFolder(_path);
    await client.disconnect();
  } catch (error) {
    console.error(error);
  }
}

const PATH = BASE_SRC_PATH1;
const PORT = 6382;
runApplication(PORT, PATH);

// ---------------------------------------------------------------------//!!-----
// ++ Modified from: redis-json-directory-spider -----------------------
// https://github.com/simonprickett/redis-json-directory-spider/LICENSE
// + Copyright © 2022 Simon Prickett [MIT or MIT Like]
