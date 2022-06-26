// const str = '1001000001010011110010001001101001111101000010010010000001111101';
export const BASE = 36;

export function shortBit64(bin64: string, base = BASE) {
  var hexa1 = parseInt(bin64.slice(0, 16), 2).toString(base).toUpperCase();
  var hexa2 = parseInt(bin64.slice(16, 32), 2).toString(base).toUpperCase();
  var hexa3 = parseInt(bin64.slice(32, 48), 2).toString(base).toUpperCase();
  var hexa4 = parseInt(bin64.slice(48, 64), 2).toString(base).toUpperCase();
  return `${hexa1}-${hexa2}-${hexa3}-${hexa4}_${base}`;
}
