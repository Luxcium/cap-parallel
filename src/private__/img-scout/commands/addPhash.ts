import { IMGSCOUT } from '../tools';

export async function addPhash(
  R: any,
  k: string,
  p: string,
  t: string
): Promise<number> {
  return R.sendCommand([IMGSCOUT.ADD, k, p, t]);
}
