import { IMGSCOUT } from '../tools';

export async function syncPhash(
  R: any,
  k: string,
  failSilently: boolean = true
) {
  try {
    await R.sendCommand([IMGSCOUT.SYNC, k]);
    return true;
  } catch (error) {
    if (!failSilently) console.log(error);
  }
  return false;
}
