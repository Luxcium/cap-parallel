import * as fs from 'fs/promises';
import type { Sharp } from 'sharp';
import sharp from 'sharp';

const path =
  '/run/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users/jahn11/abs-olutley-cute-gay-tube-x081127832/x_5fb5baddf1a2e.jpeg';

const wmrk_path = '/home/luxcium/Images/wmrk.png';
const will_5fb5baddf1a2e = fs.readFile(path);
const will_wmrk = fs.readFile(wmrk_path);

will_5fb5baddf1a2e.then(async function (input) {
  const sharpInput: Sharp = sharp(input);

  const metadata = await sharpInput.metadata();
  const { width, height } = metadata;

  const w = width || 1;
  const h = height || 1;
  let r = w < h ? w : h;
  r;

  if (width && height) console.log('Width:', width, w);

  if (height) console.log('Height:', height, h);

  sharpInput
    .flatten({ background: '#ff6600' })
    .composite([{ input: await will_wmrk, gravity: 'southeast' }])
    .sharpen()
    .withMetadata()
    .png() // { quality: 90 }
    .toBuffer()
    .then(async function (outputBuffer) {
      const file = './output.png';
      fs.writeFile(file, outputBuffer);
      // outputBuffer contains upside down, 300px wide, alpha channel flattened
      // onto orange background, composited with overlay.png with SE gravity,
      // sharpened, with metadata, 90% quality WebP image data. Phew!
    })
    .catch(console.error);
});
