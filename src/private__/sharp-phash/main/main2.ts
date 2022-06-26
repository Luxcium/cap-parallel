import fs from 'fs';

const phash = require('sharp-phash');

// 'IMGSCOUT.QUERY' 'TEST:/home/luxcium/WSD_250/jpgs_ipn_impt_2022-02-04' 13498924397152224198 50
//  R.sendCommand(['IMGSCOUT.QUERY', k, bigString(await phash_), RADIUS]);
// const currentMs = Date.now() - timeMS;
//   count.totalCount++;
//   count.totalTime += currentMs;
//   timeMS = Date.now();
// index;
// const currentAvg = count.totalTime / count.totalCount;
// currentAvg;
// const diff = `${Math.round(currentMs - currentAvg)}`.padStart(5);
// `${currentMs}ms (${Math.round(currentAvg)} ms)`,
// diff
// console.log(phash_, imgFile.name.toLowerCase().padEnd(35), index);
// }

export function main2() {
  const img1 = fs.readFileSync(
    '/home/luxcium/WSD_250/images/full-14564-for-ian/jpgs/5d65f45e97830.jpeg'
  );
  const img2 = fs.readFileSync(
    '/home/luxcium/WSD_250/images/full-14564-for-ian/jpgs/5d309a40f2014.jpeg'
  );
  const img3 = fs.readFileSync(
    '/home/luxcium/.local/src/parallel-mapping/scripts/assets/Lenna-sepia.jpg'
  );
  const img4 = fs.readFileSync(
    '/home/luxcium/src/parallel-mapping/scripts/assets/xing.jpg'
  );
  // 1110011001111011100110011000110011110001011010100100111100100101
  // deepcode ignore PromiseNotCaughtNode: <$ Testing code will not be used in production $>
  Promise.all([phash(img1), phash(img2), phash(img3), phash(img4)]).then(
    ([hash1, hash2, hash3, hash4]) => {
      // hash returned is 64 characters length string with 0 and 1 only
      // assert(dist(hash1, hash2) < 5);
      // assert(dist(hash2, hash3) < 5);
      // assert(dist(hash3, hash1) < 5);
      // assert(dist(hash3, hash4) < 5);
      // (async () => console.log(await phash(img1)))();
      (async () => console.log(hash1))();
      (async () => console.log(hash2))();
      (async () => console.log(hash4))();
      (async () => console.log(distance(hash1, hash2)))();
      (async () => console.log(distance(hash2, hash3)))();
      (async () => console.log(distance(hash3, hash1)))();
      (async () => console.log(distance(hash3, hash4)))();
    }
  );
}

export function distance(a: string, b: string) {
  let count = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) count++;

  return count;
}
