import { globalMain } from './global-main';
import { rConnect } from './rConnect';

const dir = '/home/luxcium/Téléchargements/test/';
const grpKey = 'x00998b';
const validExtentions = new Set(['.png', '.jpeg', '.jpg', '.webp']);
const Rc = rConnect();

globalMain(dir, grpKey, validExtentions, Rc);
