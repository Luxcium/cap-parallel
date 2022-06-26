import fs from 'fs';
import { getListing } from './fsTools';

const localPAth =
  '/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users/marcuscarrandi/';

(async function () {
  console.log(getListing(localPAth));
})();

const path_ = '/tmp/blue/' + '1654566738095'; // Date.now();
// const existingPath = '/tmp/blue/Random-images-copie (_)/IMG_3784.jpg';
// const newPath = path_ + '/IMG_3784.jpg'; /tmp/blue/Random-images-copie (_)/IMG_0460.JPG

fs.mkdirSync(path_, { recursive: true });

linkSync(
  '/tmp/blue/Random-images-copie (_)/IMG_0460.JPG',
  path_ + '/IMG_0460.JPG'
);

function linkSync(existingPath: string, newPath: string) {
  if (!fs.existsSync(newPath)) {
    fs.linkSync(existingPath, newPath); //tmp/blue/1654566738095
  }
}
