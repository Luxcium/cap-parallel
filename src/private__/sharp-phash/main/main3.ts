import fs from 'fs';
import { CURRENT_PATH } from '../../../constants/radius';
import { redisCreateClient } from '../../redis/tools';

const phash = require('sharp-phash');

export async function main3(
  folder = CURRENT_PATH,
  port = 6383,
  dbNumber = 0,
  host = '0.0.0.0'
) {
  const R = redisCreateClient({ port, dbNumber, host });
  await R.connect();

  const images = await fs.promises.readdir(folder, {
    withFileTypes: true,
  });
  const addPhash = (k: string, phash_: string, title: string) =>
    R.sendCommand(['IMGSCOUT.ADD', k, phash_, title]);
  const getExt = (fileName: string) =>
    fileName.split('.').slice(-1)[0].toLowerCase();

  for (const image of [...images]) {
    if (image.isFile()) {
      const imgPath = `${folder}/${image.name}`;
      const imgExt = getExt(image.name);

      const imgFullPath = {
        imgPath,
        imgExt,
      };

      const isValidExt = ['jpg', 'jpeg', 'png'].includes(imgFullPath.imgExt);

      if (isValidExt) {
        const thisImage = await fs.promises.readFile(imgPath);
        const phash_ = await phash(thisImage);
        console.log(phash_, phash_.length);
        addPhash;
        process.exit(10);
        // // HACK:%----------------------------------------------------------------
        // console.log(`${await addPhash(`TEST:${image.name}`, phash_, imgPath)}`);
        // console.log();
        // console.log(shortBit64(phash_));
        // console.log(imgPath);
        // console.log(phash_);
        // console.log(image.name);
      }
    }
  }
}
