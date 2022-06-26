// const str = '1001000001010011110010001001101001111101000010010010000001111101';
export const BASE = 36;

export function getBackBit64(short64: string) {
  const split = short64.split('_');
  const base = parseInt(split[1]);

  const splitted = [
    ...split[0]
      .split('-')
      .map(hx => parseInt(hx, base).toString(2).padStart(16, '0')),
  ];

  return splitted.join('');
}
