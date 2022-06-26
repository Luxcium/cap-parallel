import { BoxedGenerator } from '@luxcium/boxed-list';
import { filterDirectories } from '../file-path/utils';
import { computePHash } from './computePHash';
import { listFiles } from './listFiles';

let count = 0;
let count1 = 0;
let count2Total = 0;
let count2 = 0;
let childCount = 0;
const step1 = listFiles(
  '/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users'
);
// .map(async e => console.log(e)) .map(async e =>e)
step1
  .map(async pr => (await pr).getChild().map(async e => console.log(await e)))
  .spark();

const step2 = step1.map(async pathWithStats => {
  const preload_001 = filterDirectories(await pathWithStats);
  const awtPathWStats = await pathWithStats;
  count2++;
  BoxedGenerator.of(...awtPathWStats.getChild())
    .map(async (c, i) => {
      // HACK:
      const processed = computePHash(c as any);
      processed;
      process.stdout.write(
        `child item N°${++childCount} ${count2}/${count2Total} (${
          (i || 0) + 1
        })\n${await c}`
      );
      // console.log('child:', await c);
    })
    .spark();
  const step2a = listFiles((await pathWithStats).fullPath);
  const step2b = step2a.map(async (subPathWithStats, j) => {
    const current = (j || 0) + 1;

    console.log('count:', top, current, ++count1);
    console.log('count:', top, current, ++count, await subPathWithStats);
    return subPathWithStats;
  });
  preload_001 ? step2b.spark() : console.log(null);
  return pathWithStats;
});
step2.spark; //();
